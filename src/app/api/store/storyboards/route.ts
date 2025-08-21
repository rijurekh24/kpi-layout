import STORYBOARDS from "@/datas/story.json";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchString = searchParams.get("searchString")?.toLowerCase() || "";

  const filtered = STORYBOARDS.filter((s) =>
    (s.title || "").toLowerCase().includes(searchString)
  );

  return NextResponse.json(filtered);
}
