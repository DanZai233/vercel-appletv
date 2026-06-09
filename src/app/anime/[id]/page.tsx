import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  ExternalLink,
  LinkIcon,
  Play,
  RadioTower,
  ShieldCheck,
  Star,
  UsersRound,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type {
  AnimeCharacter,
  MoegirlPage,
  SourceLink,
  StreamingEpisode,
} from "@/lib/anilist";
import { SiteLinks } from "@/components/site-links";
import { SiteMark } from "@/components/site-mark";
import { getAnimeById } from "@/lib/anilist";
import {
  formatAiringTime,
  formatFormat,
  formatSeason,
  formatStatus,
} from "@/lib/display";
import {
  COPY,
  getLocale,
  LOCALES,
  titleForLocale,
  titleRows,
  withLocale,
} from "@/lib/i18n";

export const dynamic = "force-dynamic";

type AnimeDetailProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ lang?: string }>;
};

export async function generateMetadata({
  params,
}: AnimeDetailProps): Promise<Metadata> {
  const { id } = await params;
  const anime = await getAnimeById(Number(id));

  if (!anime) {
    return {
      title: "番剧未找到 | AniDeck",
    };
  }

  return {
    title: `${anime.title} | AniDeck`,
    description: anime.description,
    openGraph: {
      title: anime.title,
      description: anime.description,
      images: [anime.bannerImage ?? anime.coverImage],
    },
  };
}

export default async function AnimeDetail({
  params,
  searchParams,
}: AnimeDetailProps) {
  const { id } = await params;
  const search = await searchParams;
  const locale = getLocale(search?.lang);
  const t = COPY[locale];
  const anime = await getAnimeById(Number(id));

  if (!anime) {
    notFound();
  }

  const groupedEpisodes = groupEpisodes(anime.streamingEpisodes);
  const officialSources = anime.sourceLinks.filter(
    (source) => source.type === "streaming" || source.type === "official",
  );
  const discoverySources = anime.sourceLinks.filter(
    (source) => source.type !== "streaming" && source.type !== "official",
  );
  const rows = titleRows(anime);

  return (
    <main className="min-h-screen overflow-x-clip bg-[#07090d] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        {anime.bannerImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={anime.bannerImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#07090d_0%,rgba(7,9,13,0.9)_42%,rgba(7,9,13,0.54)_100%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-12 pt-5 sm:px-8 sm:pt-6 lg:px-12">
          <div className="mb-10 flex flex-wrap items-start justify-between gap-3 sm:mb-12 sm:items-center">
            <Link
              href={withLocale("/", locale)}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/16"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.back}
            </Link>
            <div className="flex w-full flex-wrap items-center justify-between gap-2 sm:w-auto sm:justify-end sm:gap-3">
              <div className="flex rounded-md border border-white/15 bg-white/10 p-1">
                {LOCALES.map((item) => (
                  <Link
                    className={`rounded px-2 py-1 text-xs font-semibold transition ${
                      item.code === locale
                        ? "bg-white text-black"
                        : "text-white/70 hover:text-white"
                    }`}
                    href={withLocale(`/anime/${anime.id}`, item.code)}
                    key={item.code}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <SiteLinks className="shrink-0" />
              <div className="flex min-w-0 items-center gap-2 text-sm font-semibold">
                <SiteMark />
                <span className="truncate">AniDeck</span>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:items-end">
            <div className="aspect-[2/3] w-full max-w-[240px] justify-self-center overflow-hidden rounded-lg border border-white/15 bg-white/10 shadow-[0_28px_80px_rgba(0,0,0,0.45)] sm:max-w-[300px] lg:justify-self-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={anime.coverImage}
                alt={titleForLocale(anime, locale)}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 max-w-4xl">
              <div className="mb-4 flex flex-wrap gap-2 text-xs font-medium">
                <span className="rounded-md border border-cyan-300/25 bg-cyan-300/10 px-2 py-1 text-cyan-100">
                  {formatFormat(anime.format)}
                </span>
                <span className="rounded-md border border-white/15 bg-white/10 px-2 py-1 text-white/75">
                  {formatStatus(anime.status)}
                </span>
                <span className="rounded-md border border-white/15 bg-white/10 px-2 py-1 text-white/75">
                  {formatSeason(anime.season, anime.seasonYear)}
                </span>
              </div>
              <h1 className="break-words text-3xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                {titleForLocale(anime, locale)}
              </h1>
              <div className="mt-4">
                <div className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-white/45">
                  {t.languageTitle}
                </div>
                <div className="grid gap-2 text-sm sm:grid-cols-3">
                  <TitleChip label={t.titleZh} value={rows.zh ?? t.pending} />
                  <TitleChip label={t.titleJa} value={rows.ja} />
                  <TitleChip label={t.titleEn} value={rows.en} />
                </div>
              </div>
              <p className="mt-5 line-clamp-8 max-w-3xl whitespace-pre-line break-words text-sm leading-7 text-white/72 sm:line-clamp-none sm:text-base">
                {anime.description || t.pending}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {anime.genres.map((genre) => (
                  <span
                    className="rounded-md border border-white/12 bg-white/8 px-2.5 py-1 text-xs text-white/72"
                    key={genre}
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <div className="mt-8 grid gap-3 text-sm text-white/72 sm:grid-cols-4">
                <Metric
                  icon={Star}
                  label={t.score}
                  value={anime.averageScore ? `${anime.averageScore}%` : t.pending}
                />
                <Metric
                  icon={CalendarDays}
                  label={t.episodeCount}
                  value={anime.episodes ? `${anime.episodes}` : t.unknownEpisodes}
                />
                <Metric
                  icon={Clock3}
                  label={t.duration}
                  value={anime.duration ? `${anime.duration} min` : t.unknown}
                />
                <Metric
                  icon={RadioTower}
                  label={t.nextEpisode}
                  value={
                    anime.nextAiringEpisode
                      ? `第 ${anime.nextAiringEpisode.episode} 集`
                      : t.noAiring
                  }
                  detail={
                    anime.nextAiringEpisode
                      ? formatAiringTime(anime.nextAiringEpisode.airingAt)
                      : undefined
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-12">
        <div className="space-y-10">
          <section className="space-y-5">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-fuchsia-200">
                <UsersRound className="h-4 w-4" />
                {t.charactersKicker}
              </div>
              <h2 className="break-words text-2xl font-semibold sm:text-3xl">
                {t.characters}
              </h2>
            </div>
            {anime.characters.length ? (
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {anime.characters.map((character) => (
                  <CharacterCard
                    aniListLabel={t.openAniList}
                    character={character}
                    key={character.id}
                    roleLabels={{
                      BACKGROUND: t.roleBackground,
                      MAIN: t.roleMain,
                      SUPPORTING: t.roleSupporting,
                    }}
                    searchLabel={t.searchMoegirl}
                    voiceLabel={t.voiceActor}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-white/10 bg-[#11141a] p-6 text-white/65">
                {t.noCharacters}
              </div>
            )}
          </section>

          <section className="space-y-5">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-cyan-200">
                <Play className="h-4 w-4" />
                Episodes
              </div>
              <h2 className="break-words text-2xl font-semibold sm:text-3xl">
                {t.episodes}
              </h2>
            </div>

            {groupedEpisodes.length ? (
              <div className="space-y-6">
                {groupedEpisodes.map(([site, episodes]) => (
                  <div className="space-y-3" key={site}>
                    <h3 className="text-sm font-semibold text-white/75">
                      {site}
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {episodes.slice(0, 60).map((episode) => (
                        <EpisodeLink
                          episode={episode}
                          key={episode.url}
                          openLabel={t.openPlayback}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-white/10 bg-[#11141a] p-6 text-white/65">
                {t.noEpisodes}
              </div>
            )}
          </section>
        </div>

        <aside className="min-w-0 space-y-6">
          <section className="space-y-4">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-fuchsia-200">
                <UsersRound className="h-4 w-4" />
                Moegirl
              </div>
              <h2 className="break-words text-2xl font-semibold">{t.moegirlCatalog}</h2>
            </div>
            <MoegirlList
              emptyLabel={t.noMoegirlCharacters}
              openLabel={t.openMoegirl}
              pages={anime.moegirlCharacters}
            />
          </section>

          <section className="space-y-4">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-emerald-200">
                <ShieldCheck className="h-4 w-4" />
                Sources
              </div>
              <h2 className="break-words text-2xl font-semibold">{t.officialSources}</h2>
            </div>
            <SourceList
              officialSearchLabel={t.officialSearch}
              noSourcesLabel={t.noSources}
              sources={officialSources}
            />
          </section>

          <section className="space-y-4">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-amber-200">
                <LinkIcon className="h-4 w-4" />
                Discovery
              </div>
              <h2 className="break-words text-2xl font-semibold">{t.discovery}</h2>
            </div>
            <SourceList
              officialSearchLabel={t.officialSearch}
              noSourcesLabel={t.noSources}
              sources={discoverySources}
            />
          </section>
        </aside>
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
      <div className="line-clamp-2 min-h-10 break-words text-sm leading-5 text-white/80">
        {value}
      </div>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: typeof Star;
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/30 p-3">
      <div className="mb-1 flex items-center gap-2 text-white">
        <Icon className="h-4 w-4 text-cyan-200" />
        {label}
      </div>
      <p className="break-words text-xs leading-5 text-white/55">{value}</p>
      {detail ? <p className="text-xs leading-5 text-white/45">{detail}</p> : null}
    </div>
  );
}

function CharacterCard({
  character,
  aniListLabel,
  roleLabels,
  searchLabel,
  voiceLabel,
}: {
  character: AnimeCharacter;
  aniListLabel: string;
  roleLabels: Record<string, string>;
  searchLabel: string;
  voiceLabel: string;
}) {
  return (
    <article className="overflow-hidden rounded-lg border border-white/10 bg-[#11141a]">
      <div className="flex gap-3 p-3">
        {character.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={character.image}
            alt={character.name}
            className="h-28 w-20 shrink-0 rounded-md object-cover"
            loading="lazy"
          />
        ) : (
          <div className="grid h-28 w-20 shrink-0 place-items-center rounded-md bg-white/8">
            <UsersRound className="h-6 w-6 text-white/45" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap gap-2">
            {character.role ? (
              <span className="rounded-md border border-fuchsia-200/20 bg-fuchsia-200/10 px-2 py-1 text-[11px] font-semibold text-fuchsia-100">
                {roleLabels[character.role] ?? character.role}
              </span>
            ) : null}
          </div>
          <h3 className="truncate text-base font-semibold text-white">
            {character.name}
          </h3>
          {character.nativeName && character.nativeName !== character.name ? (
            <p className="truncate text-sm text-white/55">
              {character.nativeName}
            </p>
          ) : null}
          {character.voiceActor ? (
            <p className="mt-2 truncate text-xs text-white/55">
              {voiceLabel}:{" "}
              <span className="text-white/75">
                {character.voiceActor.nativeName ?? character.voiceActor.name}
              </span>
            </p>
          ) : null}
        </div>
      </div>
      {character.description ? (
        <p className="line-clamp-3 px-3 pb-3 text-xs leading-5 text-white/55">
          {character.description}
        </p>
      ) : null}
      <div className="grid border-t border-white/10 sm:grid-cols-2">
        <a
          href={character.anilistUrl}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-10 items-center justify-between gap-2 border-b border-white/10 px-3 text-xs font-semibold text-cyan-200 transition hover:bg-white/5 sm:border-b-0 sm:border-r"
        >
          <span className="min-w-0 truncate">{aniListLabel}</span>
          <ExternalLink className="h-3.5 w-3.5 shrink-0" />
        </a>
        <a
          href={character.moegirlSearchUrl}
          target="_blank"
          rel="noreferrer"
          title={character.moegirlSearchQuery}
          className="flex min-h-10 items-center justify-between gap-2 px-3 text-xs font-semibold text-fuchsia-200 transition hover:bg-white/5"
        >
          <span className="min-w-0 truncate">{searchLabel}</span>
          <ExternalLink className="h-3.5 w-3.5 shrink-0" />
        </a>
      </div>
    </article>
  );
}

function EpisodeLink({
  episode,
  openLabel,
}: {
  episode: StreamingEpisode;
  openLabel: string;
}) {
  return (
    <a
      href={episode.url}
      target="_blank"
      rel="noreferrer"
      className="group flex min-h-20 items-center gap-3 rounded-lg border border-white/10 bg-[#11141a] p-3 outline-none transition hover:-translate-y-0.5 hover:border-white/30 focus-visible:-translate-y-0.5 focus-visible:border-white/60"
    >
      {episode.thumbnail ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={episode.thumbnail}
          alt=""
          className="h-14 w-20 shrink-0 rounded-md object-cover"
          loading="lazy"
        />
      ) : (
        <span className="grid h-14 w-20 shrink-0 place-items-center rounded-md bg-white/8">
          <Play className="h-5 w-5 text-white/60" />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="line-clamp-2 text-sm font-semibold text-white">
          {episode.title}
        </span>
        <span className="mt-1 flex items-center gap-1 text-xs text-cyan-200">
          {openLabel}
          <ExternalLink className="h-3 w-3 shrink-0" />
        </span>
      </span>
    </a>
  );
}

function MoegirlList({
  pages,
  openLabel,
  emptyLabel,
}: {
  pages: MoegirlPage[];
  openLabel: string;
  emptyLabel: string;
}) {
  if (!pages.length) {
    return (
      <div className="rounded-lg border border-white/10 bg-[#11141a] p-4 text-sm text-white/60">
        {emptyLabel}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {pages.map((page) => (
        <a
          href={page.url}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-12 items-center justify-between gap-3 rounded-lg border border-white/10 bg-[#11141a] px-3 py-2 text-sm font-semibold text-white outline-none transition hover:-translate-y-0.5 hover:border-white/30 focus-visible:-translate-y-0.5 focus-visible:border-white/60"
          key={page.url}
        >
          <span className="min-w-0 flex-1">
            <span className="block truncate">{page.title}</span>
            <span className="text-xs font-normal text-white/45">
              {openLabel}
            </span>
          </span>
          <ExternalLink className="h-4 w-4 shrink-0 text-white/50" />
        </a>
      ))}
    </div>
  );
}

function SourceList({
  sources,
  officialSearchLabel,
  noSourcesLabel,
}: {
  sources: SourceLink[];
  officialSearchLabel: string;
  noSourcesLabel: string;
}) {
  if (!sources.length) {
    return (
      <div className="rounded-lg border border-white/10 bg-[#11141a] p-4 text-sm text-white/60">
        {noSourcesLabel}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {sources.map((source) => (
        <a
          href={source.url}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-12 items-center justify-between gap-3 rounded-lg border border-white/10 bg-[#11141a] px-3 py-2 text-sm font-semibold text-white outline-none transition hover:-translate-y-0.5 hover:border-white/30 focus-visible:-translate-y-0.5 focus-visible:border-white/60"
          key={`${source.site}-${source.url}`}
        >
          <span className="min-w-0 flex-1">
            <span className="block truncate">{source.site}</span>
            <span className="text-xs font-normal text-white/45">
              {source.type === "search" ? officialSearchLabel : source.type}
            </span>
          </span>
          <ExternalLink className="h-4 w-4 shrink-0 text-white/50" />
        </a>
      ))}
    </div>
  );
}

function groupEpisodes(
  episodes: StreamingEpisode[],
): Array<[string, StreamingEpisode[]]> {
  const groups = new Map<string, StreamingEpisode[]>();

  for (const episode of episodes) {
    const list = groups.get(episode.site) ?? [];
    list.push(episode);
    groups.set(episode.site, list);
  }

  return [...groups.entries()];
}
