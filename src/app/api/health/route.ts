import { NextResponse } from "next/server";
import { getHomeAnime } from "@/lib/anilist";
import { getNews } from "@/lib/news";

export const dynamic = "force-dynamic";

type CheckResult = {
  latencyMs: number;
  ok: boolean;
  reason?: string;
};

export async function GET() {
  const startedAt = Date.now();
  const [anime, news] = await Promise.all([
    check("anime", async () => {
      const home = await getHomeAnime();
      if (!home.trending.length) {
        throw new Error("No trending anime returned");
      }
    }),
    check("news", async () => {
      const items = await getNews(1);
      if (!items.length) {
        throw new Error("No news items returned");
      }
    }),
  ]);
  const ok = anime.ok && news.ok;

  return NextResponse.json(
    {
      ok,
      checkedAt: new Date().toISOString(),
      latencyMs: Date.now() - startedAt,
      cronSecretConfigured: Boolean(process.env.CRON_SECRET),
      checks: {
        anime,
        news,
      },
    },
    { status: ok ? 200 : 503 },
  );
}

async function check(
  _name: string,
  run: () => Promise<void>,
): Promise<CheckResult> {
  const startedAt = Date.now();

  try {
    await run();
    return {
      ok: true,
      latencyMs: Date.now() - startedAt,
    };
  } catch (error) {
    return {
      ok: false,
      latencyMs: Date.now() - startedAt,
      reason: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
