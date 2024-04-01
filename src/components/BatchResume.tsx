"use client";

import {Box, Button, Divider, Stack, Text, Title} from "@mantine/core";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import styled from "styled-components";
import {useStore} from "zustand";
import {batchStore, Order} from "../store/batch";
import {adjustInventoryAction} from "@inventory-assistant/shopify/adjust-inventory-action";

export const BatchResume: React.FC = () => {
  async function save() {
    saveMutation.mutate({
      orders: store.orders,
    });
  }

  function cancel() {
    store.clear();
  }

  const queryClient = useQueryClient();
  const store = useStore(batchStore);
  const saveMutation = useMutation<
    any,
    Error,
    {
      orders: Order[];
    }
  >({
    onSuccess: async () => {
      store.clear();
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    mutationFn: async ({ orders }) => {
      await adjustInventoryAction({
        adjustments: orders.map((order) => ({
          inventoryItemId: order.inventoryItemId,
          delta: order.quantity,
        })),
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
              .map(([key, value]) => value)
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
