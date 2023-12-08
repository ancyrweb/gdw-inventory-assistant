"use client";

import { Button, Group, Select, Stack, Text, rem } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { v4 } from "uuid";
import { useStore } from "zustand";
import { batchStore } from "../store/batch";

export const Product: React.FC<{ product: any; debug?: boolean }> = ({
  product,
  debug,
}) => {
  const store = useStore(batchStore);
  const query = useQuery<Record<string, any>>({
    queryKey: ["product-variations", product.id],
    queryFn: () =>
      axios
        .get(`/api/variations?productId=${product.id}`)
        .then((response) => response.data),
  });

  const [quantity, setQuantity] = useState(0);
  const [options, setOptions] = useState<any>({});
  const relevantVariation =
    query.data?.find((value: any) => {
      for (const attribute of value.attributes) {
        if (attribute.option !== options[attribute.name]) {
          return false;
        }
      }

      return true;
    }) ?? null;
  const inStock = relevantVariation?.stock_quantity ?? 0;
  const image = product.images.length > 0 ? product.images[0] : null;

  return (
    <View>
      {!!image ? (
        <Image src={image.src} alt={image.name} />
      ) : (
        <ImagePlaceholder />
      )}
      <Title>{product.name}</Title>
      <Stack gap={4} mt={20}>
        {product.attributes.map((attribute: any) => (
          <Select
            key={attribute.id}
            placeholder={attribute.name}
            data={attribute.options}
            value={options[attribute.name] ?? null}
            clearable
            onChange={(value) => {
              setOptions({
                ...options,
                [attribute.name]: value,
              });
            }}
          />
        ))}
        <Text mt={4}>
          En stock : {relevantVariation !== null ? inStock : "-"}{" "}
        </Text>
        <Group justify="space-between" mt={8}>
          <Button
            size={"md"}
            onClick={() => setQuantity(quantity - 1)}
            disabled={inStock === 0 || inStock + quantity === 0}
          >
            -
          </Button>
          <Text size={"xl"}>{quantity}</Text>
          <Button
            size={"md"}
            onClick={() => setQuantity(quantity + 1)}
            disabled={relevantVariation === null}
          >
            +
          </Button>
        </Group>
        <Button
          disabled={quantity === 0 || !relevantVariation}
          onClick={() => {
            store.addOrder({
              id: v4(),
              productId: product.id,
              variationId: relevantVariation!.id,
              name: product.name,
              quantity,
              options,
            });

            setOptions({});
            setQuantity(0);
          }}
        >
          {quantity < 0 ? "Retirer du stock" : "Ajouter au stock"}
        </Button>
      </Stack>
    </View>
  );
};

const View = styled.div`
  padding: 20px;
  background-color: #f5f5f5;

  width: 270px;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 10px;
`;

const Image = styled.img`
  display: block;

  width: 200px;
  height: 300px;

  object-fit: cover;
`;
const ImagePlaceholder = styled.img`
  width: 200px;
  height: 300px;

  background-color: #d0d0d0;
`;

const Title = styled.h2`
  font-size: ${rem(16)};
  font-weight: 600;
  text-align: center;

  margin: 0;
  margin-top: 12px;

  height: 70px;
`;
