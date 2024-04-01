"use client";

import styled from "styled-components";
import {useStore} from "zustand";
import {batchStore} from "../store/batch";
import {BatchResume} from "./BatchResume";
import {ProductList} from "./ProductList";
import {useQuery} from "@tanstack/react-query";
import {fetchProducts} from "@inventory-assistant/shopify/fetch-products";
import React from "react";

export const MainPage: React.FC<{ products: any[] }> = ({ products }) => {
  const store = useStore(batchStore);
  const query = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return fetchProducts();
    },
    initialData: products,
  })


  return (
    <View $isRightMenuOpen={store.orders.length > 0}>
      <ProductList products={query.data} />
      {store.orders.length > 0 && (
        <Menu>
          <BatchResume />
        </Menu>
      )}
    </View>
  );
};

const View = styled.div<{ $isRightMenuOpen: boolean }>`
  margin-right: ${({ $isRightMenuOpen }) =>
    $isRightMenuOpen ? `400px` : `0px`};
`;

const Menu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;

  width: 400px;
  background-color: white;

  z-index: 1;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
