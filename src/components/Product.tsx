"use client";

import {Button, Group, rem, Select, Stack, Text} from "@mantine/core";
import {useState} from "react";
import styled from "styled-components";
import {v4} from "uuid";
import {useStore} from "zustand";
import {batchStore} from "../store/batch";
import {getVariantName} from "@inventory-assistant/shopify/shopify-utils";

const createVariantKeys = (product: any) => {
  const obj: any = {};
  product.options.forEach((option: any) => {
    obj[getVariantName(option)] = null;
  });

  return obj;
}
export const Product: React.FC<{ product: any; debug?: boolean }> = ({
  product,
  debug,
}) => {
  const store = useStore(batchStore);

  const [quantity, setQuantity] = useState(0);
  const [options, setOptions] = useState<any>(createVariantKeys(product));
  const relevantVariation: any =  product.variants.find((variant: any) => {
    const keys = Object.keys(options);
    for (const key of keys) {
      if (variant[key] !== options[key]) {
        return false;
      }
    }

    return true;
  }) ?? null;

  const inStock = relevantVariation?.inventory_quantity ?? 0;
  const image = product.images.length > 0 ? product.images[0] : null;

  return (
    <View>
      {!!image ? (
        <Image src={image.src} alt={"Produit " + product.id} />
      ) : (
        <ImagePlaceholder />
      )}
      <Title>{product.title}</Title>
      <Stack gap={4} mt={20}>
        {product.options.map((option: any) => (
          <Select
            key={option.id}
            placeholder={option.name}
            data={option.values}
            value={options[getVariantName(option)] ?? null}
            clearable
            onChange={(value) => {
              setOptions({
                ...options,
                [getVariantName(option)]: value,
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
              variantId: relevantVariation!.id,
              inventoryItemId: relevantVariation!.inventory_item_id,
              name: product.title,
              quantity,
              options,
            });

            setOptions(createVariantKeys(product));
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
