"use client";

import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Flame,
  Play,
  RadioTower,
  Search,
  ShieldCheck,
  Tv,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { AnimeCard } from "@/lib/anilist";
import { formatAiringTime, formatFormat, formatStatus } from "@/lib/display";
import {
  COPY,
  LOCALES,
  type Locale,
  titleForLocale,
  titleRows,
  withLocale,
} from "@/lib/i18n";

type HeroCarouselProps = {
  items: AnimeCard[];
  locale: Locale;
  query: string;
};

const ROTATE_MS = 6200;

export function HeroCarousel({ items, locale, query }: HeroCarouselProps) {
  const t = COPY[locale];
  const slides = useMemo(() => items.slice(0, 6), [items]);
  const [activeIndex, setActiveIndex] = useState(0);
  const safeActiveIndex = slides.length ? activeIndex % slides.length : 0;
  const active = slides[safeActiveIndex];
  const hasMultipleSlides = slides.length > 1;

  useEffect(() => {
    if (!hasMultipleSlides) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [hasMultipleSlides, slides.length]);

  if (!active) {
    return null;
  }

  const heroTitles = titleRows(active);
  const primarySource =
    active.sourceLinks.find((link) => link.type === "streaming") ??
    active.sourceLinks.find((link) => link.type === "search");

  function changeSlide(direction: -1 | 1) {
    setActiveIndex(
      (safeActiveIndex + direction + slides.length) % slides.length,
    );
  }

  return (
    <section className="relative flex min-h-[74vh] items-end overflow-hidden border-b border-white/10">
      <div className="absolute inset-0">
        {slides.map((anime, index) => (
          <div
            aria-hidden={index !== safeActiveIndex}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === safeActiveIndex ? "opacity-100" : "opacity-0"
            }`}
            key={anime.id}
          >
            {anime.bannerImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={anime.bannerImage}
                alt=""
                className="h-full w-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={anime.coverImage}
                alt=""
                className="h-full w-full object-cover blur-sm scale-110"
                loading={index === 0 ? "eager" : "lazy"}
              />
            )}
          </div>
        ))}
      </div>
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
              aria-label={t.searchPlaceholder}
            >
              <Search className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-8 px-5 pb-12 pt-28 sm:px-8 lg:grid-cols-[0.34fr_0.66fr] lg:px-12">
        <Link
          href={withLocale(`/anime/${active.id}`, locale)}
          className="group hidden aspect-[2/3] overflow-hidden rounded-lg border border-white/15 bg-white/10 shadow-[0_28px_80px_rgba(0,0,0,0.45)] transition duration-300 hover:-translate-y-1 hover:border-white/35 lg:block"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={active.coverImage}
            alt={titleForLocale(active, locale)}
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
              {formatFormat(active.format)}
            </span>
            <span className="rounded-md border border-white/15 bg-white/10 px-2 py-1 text-white/75">
              {formatStatus(active.status)}
            </span>
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
            {titleForLocale(active, locale)}
          </h1>
          <div className="mt-4 grid max-w-2xl gap-2 text-sm sm:grid-cols-3">
            <TitleChip label={t.titleZh} value={heroTitles.zh ?? t.pending} />
            <TitleChip label={t.titleJa} value={heroTitles.ja} />
            <TitleChip label={t.titleEn} value={heroTitles.en} />
          </div>
          <p className="mt-5 line-clamp-4 max-w-2xl text-sm leading-7 text-white/72 sm:text-base">
            {active.description || t.pending}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {active.genres.slice(0, 5).map((genre) => (
              <span
                className="rounded-md border border-white/12 bg-white/8 px-2.5 py-1 text-xs text-white/72"
                key={genre}
              >
                {genre}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={withLocale(`/anime/${active.id}`, locale)}
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
            {hasMultipleSlides ? (
              <div className="flex items-center gap-2">
                <button
                  aria-label={t.heroPrevious}
                  className="grid h-10 w-10 place-items-center rounded-md border border-white/15 bg-white/10 text-white transition hover:border-white/35 hover:bg-white/16"
                  onClick={() => changeSlide(-1)}
                  type="button"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  aria-label={t.heroNext}
                  className="grid h-10 w-10 place-items-center rounded-md border border-white/15 bg-white/10 text-white transition hover:border-white/35 hover:bg-white/16"
                  onClick={() => changeSlide(1)}
                  type="button"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
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
                {active.nextAiringEpisode
                  ? `第 ${active.nextAiringEpisode.episode} 集 · ${formatAiringTime(
                      active.nextAiringEpisode.airingAt,
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
                {active.episodes ? `${active.episodes}` : t.unknownEpisodes}
              </p>
            </div>
          </div>
          {hasMultipleSlides ? (
            <div
              aria-label={t.heroCarousel}
              className="mt-7 flex max-w-2xl gap-2"
            >
              {slides.map((anime, index) => (
                <button
                  aria-label={`${t.heroSelect} ${titleForLocale(anime, locale)}`}
                  aria-current={index === safeActiveIndex}
                  className={`h-1.5 flex-1 rounded-full transition ${
                    index === safeActiveIndex
                      ? "bg-white"
                      : "bg-white/25 hover:bg-white/45"
                  }`}
                  key={anime.id}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
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
