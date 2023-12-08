import { wooCommerceClient } from "@inventory-assistant/woocommerce/client";
import { MainPage } from "../../components/MainPage";

const Page: React.FC = async () => {
  const products = await wooCommerceClient.get("products", {
    per_page: 100,
    at: Date.now(),
  });

  return <MainPage products={products.data} />;
};

export default Page;
