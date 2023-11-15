import { NextRequest, NextResponse } from "next/server";
import { wooCommerceClient } from "../../../woocommerce/client";

export const POST = async (request: NextRequest) => {
  const json = await request.json();
  const result = await wooCommerceClient.post(
    `atum/product-variations/batch`,
    json
  );
  return NextResponse.json(result.data);
};
