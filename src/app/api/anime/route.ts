import { NextResponse } from "next/server";
import { getHomeAnime, searchAnime } from "@/lib/anilist";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q")?.trim();

  if (query) {
    const results = await searchAnime(query);
    return NextResponse.json({ query, results });
  }

  const home = await getHomeAnime();
  return NextResponse.json(home);
}
