import { wooCommerceClient } from "@inventory-assistant/woocommerce/client";
import { MainPage } from "../../components/MainPage";

export const fetchCache = "force-no-store";

const Page: React.FC = async () => {
  const products = await wooCommerceClient.get("products", { per_page: 100 });
  return <MainPage products={products.data} />;
};

export default Page;
