import { NextResponse } from "next/server";
import { getAnimeById } from "@/lib/anilist";

export const dynamic = "force-dynamic";

type AnimeRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: AnimeRouteContext) {
  const { id } = await context.params;
  const anime = await getAnimeById(Number(id));

  if (!anime) {
    return NextResponse.json({ error: "Anime not found" }, { status: 404 });
  }

  return NextResponse.json(anime);
}
