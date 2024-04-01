import {MainPage} from "../../components/MainPage";
import {shopifyClient} from "@inventory-assistant/shopify/client";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const Page: React.FC = async () => {
  const request = await shopifyClient.get("products");
  if (request.ok === false) {
    throw new Error("Failed to fetch products");
  }

  const data = await request.json();
  return <MainPage products={data.products}/>;
};

export default Page;
