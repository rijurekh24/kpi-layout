import STORYBOARDS from "@/datas/story.json";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const storyboard = STORYBOARDS.find((s) => s.id === id);

  if (!storyboard) {
    return NextResponse.json(
      { error: `Storyboard with id '${id}' not found.` },
      { status: 404 }
    );
  }

  return NextResponse.json(storyboard);
}
