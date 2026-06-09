import type { LucideIcon } from "lucide-react";
import type { AnimeCard } from "@/lib/anilist";
import type { Locale } from "@/lib/i18n";
import { AnimePosterCard } from "./anime-poster-card";

type AnimeRailProps = {
  title: string;
  kicker: string;
  icon: LucideIcon;
  items: AnimeCard[];
  locale: Locale;
};

export function AnimeRail({
  title,
  kicker,
  icon: Icon,
  items,
  locale,
}: AnimeRailProps) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-cyan-200">
            <Icon className="h-4 w-4" />
            {kicker}
          </div>
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            {title}
          </h2>
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto px-5 pb-4 sm:gap-5 sm:px-8 lg:px-12">
        {items.map((anime) => (
          <AnimePosterCard anime={anime} key={anime.id} locale={locale} />
        ))}
      </div>
    </section>
  );
}
