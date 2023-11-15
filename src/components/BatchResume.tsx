"use client";

import { Button, Stack, Text, Title } from "@mantine/core";
import styled from "styled-components";
import { useStore } from "zustand";
import { batchStore } from "../store/batch";

export const BatchResume: React.FC = () => {
  const store = useStore(batchStore);
  return (
    <View>
      <Title>Liste des éditions</Title>
      {store.orders.length > 0 && (
        <Stack gap={4} mt={20}>
          {store.orders.map((order) => (
            <Text key={order.id} size="lg">
              {order.quantity} {order.name}
            </Text>
          ))}
        </Stack>
      )}
      <Stack gap={4} mt={20}>
        <Button
          size="lg"
          onClick={() => {
            store.clear();
          }}
        >
          Terminer
        </Button>
        <Button
          size="lg"
          color="gray"
          onClick={() => {
            store.clear();
          }}
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
