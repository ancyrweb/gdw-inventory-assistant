"use server"

import {shopifyClient} from "@inventory-assistant/shopify/client";


export const fetchProducts = async () => {
  const request = await shopifyClient.get("products");
  if (!request.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await request.json();
  return data.products;
}