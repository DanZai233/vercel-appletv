import { Calendar, Star } from "lucide-react";
import Link from "next/link";
import type { AnimeCard } from "@/lib/anilist";
import { formatSeason, formatStatus } from "@/lib/display";
import type { Locale } from "@/lib/i18n";
import { titleForLocale, withLocale } from "@/lib/i18n";

type AnimePosterCardProps = {
  anime: AnimeCard;
  locale: Locale;
  priority?: boolean;
};

export function AnimePosterCard({ anime, locale }: AnimePosterCardProps) {
  return (
    <Link
      href={withLocale(`/anime/${anime.id}`, locale)}
      className="group block w-[150px] shrink-0 outline-none sm:w-[170px] lg:w-[190px]"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-[0_18px_50px_rgba(0,0,0,0.35)] transition duration-300 group-hover:-translate-y-1 group-hover:border-white/35 group-focus-visible:-translate-y-1 group-focus-visible:border-white/60">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={anime.coverImage}
          alt={titleForLocale(anime, locale)}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 bg-black/70 p-2 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
          <div className="flex items-center gap-1 text-[11px] text-white/85">
            <Star className="h-3 w-3 text-amber-300" />
            <span>{anime.averageScore ? `${anime.averageScore}%` : "暂无评分"}</span>
          </div>
        </div>
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="line-clamp-2 min-h-[2.75rem] text-sm font-semibold leading-snug text-white">
          {titleForLocale(anime, locale)}
        </h3>
        <p className="truncate text-xs text-white/45">
          {anime.titleJa ?? anime.romajiTitle}
        </p>
        <div className="flex items-center gap-2 text-xs text-white/55">
          <Calendar className="h-3.5 w-3.5" />
          <span>{formatSeason(anime.season, anime.seasonYear)}</span>
        </div>
        <p className="truncate text-xs text-white/45">{formatStatus(anime.status)}</p>
      </div>
    </Link>
  );
}
