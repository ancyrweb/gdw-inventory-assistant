"use client";

import { Box, Button, Divider, Stack, Text, Title } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import styled from "styled-components";
import { useStore } from "zustand";
import { Order, batchStore } from "../store/batch";
import { queryClient } from "./QueryProvider";

export const BatchResume: React.FC = () => {
  async function save() {
    saveMutation.mutate({
      orders: store.orders,
    });
  }

  function cancel() {
    store.clear();
  }

  const store = useStore(batchStore);
  const saveMutation = useMutation<
    any,
    Error,
    {
      orders: Order[];
    }
  >({
    onSuccess: () => {
      store.clear();
    },
    mutationFn: async ({ orders }) => {
      let record: Record<
        any,
        {
          productId: number;
          delta: number;
          stockQuantity: number;
        }
      > = {};
      orders.forEach((order) => {
        if (!record[order.variationId]) {
          record[order.variationId] = {
            productId: order.productId,
            delta: order.quantity,
            stockQuantity: 0,
          };
        } else {
          record[order.variationId].delta += order.quantity;
        }
      });

      await Promise.all(
        Object.keys(record).map(async (variationId) => {
          const productId = record[variationId].productId;
          const variationQuery = await axios.get(
            `/api/single-variation?productId=${productId}&variationId=${variationId}`
          );

          record[variationId].stockQuantity =
            variationQuery.data.stock_quantity;
        })
      );

      const batch = Object.entries(record).map(([variationId, value]) => ({
        id: variationId,
        product_id: value.productId,
        stock_quantity: value.stockQuantity + value.delta,
      }));

      await axios.post("/api/batch-update-variations", {
        update: batch,
      });

      batch.forEach((variation) => {
        queryClient.invalidateQueries({
          queryKey: ["product-variations", variation.product_id],
        });
      });
    },
  });

  return (
    <View>
      <Title>Liste des éditions</Title>
      {store.orders.length > 0 && (
        <Stack gap={12} mt={20}>
          {store.orders.map((order, index, array) => {
            const isLast = index === array.length - 1;
            const variationsToString = Object.entries(order.options)
              .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
              .map(([key, value]) => `${key} ${value}`)
              .join(", ");

            return (
              <Box key={order.id}>
                <Text key={order.id} size="lg">
                  <b>
                    {order.quantity > 0 ? `+${order.quantity}` : order.quantity}{" "}
                    {order.name}
                  </b>
                </Text>

                <Text size="md" c="gray">
                  {variationsToString}
                </Text>
                {isLast === false && <Divider mt={12} />}
              </Box>
            );
          })}
        </Stack>
      )}
      <Stack gap={4} mt={20}>
        <Button size="lg" onClick={save} disabled={saveMutation.isPending}>
          Terminer
        </Button>
        <Button
          size="lg"
          color="gray"
          onClick={cancel}
          disabled={saveMutation.isPending}
        >
          Annuler
        </Button>
      </Stack>
    </View>
  );
};

const View = styled.div`
  height: 100dvh;
  overflow: auto;

  display: flex;
  flex-direction: column;

  padding: 40px 20px;
`;
