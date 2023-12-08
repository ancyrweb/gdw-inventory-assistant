import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MainPage } from "../../components/MainPage";

const Page: React.FC = async () => {
  const query = useQuery<any>({
    queryKey: ["products"],
    queryFn: () =>
      axios
        .get(`/api/products?at=${Date.now()}`)
        .then((response) => response.data),
  });

  if (query.isLoading && !query.data) {
    return <p>Loading</p>;
  }

  return <MainPage products={query.data ?? []} />;
};

export default Page;
