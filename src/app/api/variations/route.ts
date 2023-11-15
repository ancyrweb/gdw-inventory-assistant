import { NextRequest, NextResponse } from "next/server";
import { wooCommerceClient } from "../../../woocommerce/client";

export const GET = async (request: NextRequest) => {
  const result = await wooCommerceClient.get(
    `products/${request.nextUrl.searchParams.get("productId")}/variations`,
    {
      per_page: 100,
    }
  );

  return NextResponse.json(result.data);
};
