"use client";

import styled from "styled-components";
import { useStore } from "zustand";
import { batchStore } from "../store/batch";
import { Product } from "./Product";

export const ProductList: React.FC<{ products: any[] }> = ({ products }) => {
  const store = useStore(batchStore);

  return (
    <View>
      {products
        .map((product, index) => (
          <Product key={product.id} product={product} debug={index === 3} />
        ))}
    </View>
  );
};

const View = styled.div`
  padding: 20px;

  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;
