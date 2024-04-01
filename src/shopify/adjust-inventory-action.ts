"use server"

import {gqlShopifyClient} from "@inventory-assistant/shopify/client";

type AdjustInventoryPayload = {
  adjustments: Array<{
    inventoryItemId: number;
    delta: number;
  }>
}

const operation = `
  mutation($input: InventoryAdjustQuantitiesInput!) {
    inventoryAdjustQuantities(input: $input) {
      userErrors {
        field
        message
      }
    }
  }
`;


export const adjustInventoryAction = async (payload: AdjustInventoryPayload) => {
  const {data, errors} = await gqlShopifyClient.request(operation, {
    variables: {
      input: {
        changes: payload.adjustments.map(({inventoryItemId, delta}) => ({
          delta: delta,
          inventoryItemId: 'gid://shopify/InventoryItem/' + inventoryItemId,
          locationId: 'gid://shopify/Location/' + process.env.SHOPIFY_STORE_LOCATION
        })),
        name: "available",
        reason: "other"
      }
    },
  });
}