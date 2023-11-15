import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export const wooCommerceClient = new WooCommerceRestApi({
  url: "https://runesdechene.com",
  consumerKey: process.env.NEXT_PUBLIC_WC_CLIENT!,
  consumerSecret: process.env.NEXT_PUBLIC_WC_SECRET!,
  version: "wc/v3",
});
