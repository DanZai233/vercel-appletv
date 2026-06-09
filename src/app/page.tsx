import {
  CalendarDays,
  ExternalLink,
  Flame,
  Play,
  RadioTower,
  Search,
  ShieldCheck,
  Sparkles,
  Tv,
} from "lucide-react";
import Link from "next/link";
import { AnimePosterCard } from "@/components/anime-poster-card";
import { AnimeRail } from "@/components/anime-rail";
import { NewsGrid } from "@/components/news-grid";
import { getHomeAnime, searchAnime } from "@/lib/anilist";
import { formatAiringTime, formatFormat, formatStatus } from "@/lib/display";
import {
  COPY,
  getLocale,
  LOCALES,
  titleForLocale,
  titleRows,
  withLocale,
} from "@/lib/i18n";
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
  const hero = home.hero;
  const heroTitles = titleRows(hero);
  const primarySource =
    hero.sourceLinks.find((link) => link.type === "streaming") ??
    hero.sourceLinks.find((link) => link.type === "search");

  return (
    <main className="min-h-screen bg-[#07090d] text-white">
      <section className="relative flex min-h-[74vh] items-end overflow-hidden border-b border-white/10">
        {hero.bannerImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={hero.bannerImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#07090d_0%,rgba(7,9,13,0.84)_38%,rgba(7,9,13,0.36)_70%,#07090d_100%)]" />
        <div className="absolute inset-x-0 top-0 z-10 border-b border-white/10 bg-black/20 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
            <Link
              href={withLocale("/", locale)}
              className="flex items-center gap-2 font-semibold"
            >
              <span className="grid h-8 w-8 place-items-center rounded-md bg-white text-black">
                <Tv className="h-4 w-4" />
              </span>
              AniDeck
            </Link>
            <div className="hidden rounded-md border border-white/15 bg-white/10 p-1 sm:flex">
              {LOCALES.map((item) => (
                <Link
                  className={`rounded px-2 py-1 text-xs font-semibold transition ${
                    item.code === locale
                      ? "bg-white text-black"
                      : "text-white/70 hover:text-white"
                  }`}
                  href={withLocale("/", item.code, query)}
                  key={item.code}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <form
              action="/"
              className="flex h-10 w-full max-w-md items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 text-sm text-white shadow-sm"
            >
              <Search className="h-4 w-4 shrink-0 text-white/55" />
              <input type="hidden" name="lang" value={locale} />
              <input
                name="q"
                defaultValue={query}
                placeholder={t.searchPlaceholder}
                className="min-w-0 flex-1 bg-transparent text-white placeholder:text-white/45 outline-none"
              />
              <button
                className="grid h-7 w-7 place-items-center rounded-md bg-white text-black transition hover:bg-cyan-100"
                type="submit"
                aria-label="搜索"
              >
                <Search className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-8 px-5 pb-12 pt-28 sm:px-8 lg:grid-cols-[0.34fr_0.66fr] lg:px-12">
          <Link
            href={withLocale(`/anime/${hero.id}`, locale)}
            className="group hidden aspect-[2/3] overflow-hidden rounded-lg border border-white/15 bg-white/10 shadow-[0_28px_80px_rgba(0,0,0,0.45)] transition duration-300 hover:-translate-y-1 hover:border-white/35 lg:block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hero.coverImage}
              alt={titleForLocale(hero, locale)}
              className="h-full w-full object-cover"
            />
          </Link>

          <div className="flex max-w-3xl flex-col justify-end">
            <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-medium">
              <span className="inline-flex items-center gap-1 rounded-md border border-cyan-300/25 bg-cyan-300/10 px-2 py-1 text-cyan-100">
                <Flame className="h-3.5 w-3.5" />
                {t.trendingBadge}
              </span>
              <span className="rounded-md border border-white/15 bg-white/10 px-2 py-1 text-white/75">
                {formatFormat(hero.format)}
              </span>
              <span className="rounded-md border border-white/15 bg-white/10 px-2 py-1 text-white/75">
                {formatStatus(hero.status)}
              </span>
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
              {titleForLocale(hero, locale)}
            </h1>
            <div className="mt-4 grid max-w-2xl gap-2 text-sm sm:grid-cols-3">
              <TitleChip label={t.titleZh} value={heroTitles.zh ?? t.pending} />
              <TitleChip label={t.titleJa} value={heroTitles.ja} />
              <TitleChip label={t.titleEn} value={heroTitles.en} />
            </div>
            <p className="mt-5 line-clamp-4 max-w-2xl text-sm leading-7 text-white/72 sm:text-base">
              {hero.description || t.pending}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {hero.genres.slice(0, 5).map((genre) => (
                <span
                  className="rounded-md border border-white/12 bg-white/8 px-2.5 py-1 text-xs text-white/72"
                  key={genre}
                >
                  {genre}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={withLocale(`/anime/${hero.id}`, locale)}
                className="inline-flex h-11 items-center gap-2 rounded-md bg-white px-4 text-sm font-semibold text-black transition hover:bg-cyan-100"
              >
                <Play className="h-4 w-4 fill-current" />
                {t.details}
              </Link>
              {primarySource ? (
                <a
                  href={primarySource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:border-white/45 hover:bg-white/16"
                >
                  <ExternalLink className="h-4 w-4" />
                  {t.openSource}
                </a>
              ) : null}
            </div>
            <div className="mt-8 grid gap-3 text-sm text-white/72 sm:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                <div className="mb-1 flex items-center gap-2 text-white">
                  <ShieldCheck className="h-4 w-4 text-emerald-300" />
                  {t.sourcePolicy}
                </div>
                <p className="text-xs leading-5 text-white/55">
                  {t.sourcePolicyBody}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                <div className="mb-1 flex items-center gap-2 text-white">
                  <RadioTower className="h-4 w-4 text-rose-300" />
                  {t.nextEpisode}
                </div>
                <p className="text-xs leading-5 text-white/55">
                  {hero.nextAiringEpisode
                    ? `第 ${hero.nextAiringEpisode.episode} 集 · ${formatAiringTime(
                        hero.nextAiringEpisode.airingAt,
                      )}`
                    : t.noAiring}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                <div className="mb-1 flex items-center gap-2 text-white">
                  <CalendarDays className="h-4 w-4 text-amber-300" />
                  {t.episodeCount}
                </div>
                <p className="text-xs leading-5 text-white/55">
                  {hero.episodes ? `${hero.episodes}` : t.unknownEpisodes}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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

function TitleChip({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/25 p-3">
      <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">
        {label}
      </div>
      <div className="line-clamp-2 min-h-10 text-sm leading-5 text-white/80">
        {value}
      </div>
    </div>
  );
}
