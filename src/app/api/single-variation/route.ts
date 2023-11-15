import { NextRequest, NextResponse } from "next/server";
import { wooCommerceClient } from "../../../woocommerce/client";

export const GET = async (request: NextRequest) => {
  const productId = request.nextUrl.searchParams.get("productId");
  const variationId = request.nextUrl.searchParams.get("variationId");

  const result = await wooCommerceClient.get(
    `products/${productId}/variations/${variationId}`
  );

  return NextResponse.json(result.data);
};
