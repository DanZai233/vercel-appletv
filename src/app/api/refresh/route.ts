import { NextResponse } from "next/server";
import { getHomeAnime } from "@/lib/anilist";
import { getNews } from "@/lib/news";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const [home, news] = await Promise.all([getHomeAnime(), getNews(12)]);

  return NextResponse.json({
    ok: true,
    auth: cronSecret ? "secret" : "open",
    refreshedAt: new Date().toISOString(),
    counts: {
      trending: home.trending.length,
      airing: home.airing.length,
      seasonal: home.seasonal.length,
      upcoming: home.upcoming.length,
      news: news.length,
    },
  });
}
