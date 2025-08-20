import LAYOUT from "@/datas/layout.json";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchString = searchParams.get("searchString")?.toLowerCase() || "";

  const filteredLayouts = LAYOUT.filter((kpi) =>
    kpi.layout.toLowerCase().includes(searchString)
  );
  return NextResponse.json(filteredLayouts);
}
