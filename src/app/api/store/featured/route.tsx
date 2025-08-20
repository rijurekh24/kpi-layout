import FEATURED from "@/datas/featured.json";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(FEATURED);
}
