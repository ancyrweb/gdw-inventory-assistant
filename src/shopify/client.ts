import {createAdminApiClient, createAdminRestApiClient} from '@shopify/admin-api-client';

export const shopifyClient = createAdminRestApiClient({
  storeDomain: process.env.SHOPIFY_STORE_URL!,
  apiVersion: '2024-04',
  accessToken: process.env.SHOPIFY_ACCESS_TOKEN!
});


export const gqlShopifyClient = createAdminApiClient({
  storeDomain: process.env.SHOPIFY_STORE_URL!,
  apiVersion: '2024-04',
  accessToken: process.env.SHOPIFY_ACCESS_TOKEN!
});

