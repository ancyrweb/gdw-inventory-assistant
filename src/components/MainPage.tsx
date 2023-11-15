"use client";

import styled from "styled-components";
import { useStore } from "zustand";
import { batchStore } from "../store/batch";
import { BatchResume } from "./BatchResume";
import { ProductList } from "./ProductList";

export const MainPage: React.FC<{ products: any[] }> = ({ products }) => {
  const store = useStore(batchStore);

  return (
    <View isRightMenuOpen={store.orders.length > 0}>
      <ProductList products={products} />
      {store.orders.length > 0 && (
        <Menu>
          <BatchResume />
        </Menu>
      )}
    </View>
  );
};

const View = styled.div<{ isRightMenuOpen: boolean }>`
  margin-right: ${({ isRightMenuOpen }) => (isRightMenuOpen ? `400px` : `0px`)};
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
