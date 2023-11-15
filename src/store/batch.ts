import { createStore } from "zustand";

export type Order = {
  id: string;
  variationId: number;
  productId: number;
  name: string;
  quantity: number;
  options: Record<string, string>;
};

type State = {
  orders: Order[];
};
type Action = {
  addOrder: (order: Order) => void;
  clear: () => void;
};

export const batchStore = createStore<State & Action>((set) => ({
  orders: [],
  addOrder: (order) =>
    set((state) => ({
      orders: [...state.orders, order],
    })),
  clear: () => set({ orders: [] }),
}));
