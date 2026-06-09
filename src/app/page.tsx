import {
  CalendarDays,
  Flame,
  RadioTower,
  Search,
  Sparkles,
} from "lucide-react";
import { AnimePosterCard } from "@/components/anime-poster-card";
import { AnimeRail } from "@/components/anime-rail";
import { HeroCarousel } from "@/components/hero-carousel";
import { NewsGrid } from "@/components/news-grid";
import { getHomeAnime, searchAnime } from "@/lib/anilist";
import { COPY, getLocale } from "@/lib/i18n";
import { getNews } from "@/lib/news";

export const dynamic = "force-dynamic";

type HomeProps = {
  searchParams: Promise<{ q?: string; lang?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const locale = getLocale(params.lang);
  const t = COPY[locale];
  const query = params.q?.trim() ?? "";
  const [home, news, results] = await Promise.all([
    getHomeAnime(),
    getNews(12),
    query ? searchAnime(query) : Promise.resolve([]),
  ]);

  return (
    <main className="min-h-screen bg-[#07090d] text-white">
      <HeroCarousel
        items={home.trending.length ? home.trending : [home.hero]}
        locale={locale}
        query={query}
      />

      <div className="relative z-10 -mt-4 space-y-12 pb-20 pt-8">
        {query ? (
          <section className="space-y-4 px-5 sm:px-8 lg:px-12">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-cyan-200">
                <Search className="h-4 w-4" />
                Search
              </div>
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                {t.searchResults(query)}
              </h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 sm:gap-5">
              {results.map((anime) => (
                <AnimePosterCard anime={anime} key={anime.id} locale={locale} />
              ))}
              {!results.length ? (
                <div className="rounded-lg border border-white/10 bg-[#11141a] p-6 text-white/60">
                  {t.noSearchResults}
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        <AnimeRail
          icon={Flame}
          items={home.trending}
          kicker="Trending"
          locale={locale}
          title={t.trending}
        />
        <AnimeRail
          icon={RadioTower}
          items={home.airing}
          kicker="On Air"
          locale={locale}
          title={t.airing}
        />
        <AnimeRail
          icon={Sparkles}
          items={home.seasonal}
          kicker="Season"
          locale={locale}
          title={t.seasonal}
        />
        <AnimeRail
          icon={CalendarDays}
          items={home.upcoming}
          kicker="Coming"
          locale={locale}
          title={t.upcoming}
        />
        <NewsGrid items={news} openLabel={t.openSource} title={t.news} />
      </div>
    </main>
  );
}
