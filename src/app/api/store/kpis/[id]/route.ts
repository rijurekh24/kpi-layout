import KPIS from "@/datas/kpis.json";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const kpi = KPIS.find((k) => k.id === id);

  if (!kpi) {
    return NextResponse.json(
      { error: `KPI with id '${id}' not found.` },
      { status: 404 }
    );
  }

  return NextResponse.json(kpi);
}
