import KPIS from "@/datas/kpis.json";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchString = searchParams.get("searchString")?.toLowerCase() || "";

  const filteredKPIs = KPIS.filter((kpi) =>
    kpi.label.toLowerCase().includes(searchString)
  );

  return NextResponse.json(filteredKPIs);
}
