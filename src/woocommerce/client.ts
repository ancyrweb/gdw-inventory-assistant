import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export const wooCommerceClient = new WooCommerceRestApi({
  url: "https://runesdechene.com",
  consumerKey: process.env.WC_CLIENT!,
  consumerSecret: process.env.WC_SECRET!,
  version: "wc/v3",
});
