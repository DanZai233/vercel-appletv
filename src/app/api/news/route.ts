import { NextResponse } from "next/server";
import { getNews } from "@/lib/news";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limit = Number(url.searchParams.get("limit") ?? 16);
  const news = await getNews(Number.isFinite(limit) ? limit : 16);

  return NextResponse.json({ news });
}
