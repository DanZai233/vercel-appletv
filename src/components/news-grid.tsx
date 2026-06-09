/* eslint-disable @next/next/no-img-element */

import { ExternalLink, Rss } from "lucide-react";
import type { NewsItem } from "@/lib/news";
import { formatNewsDate } from "@/lib/display";

type NewsGridProps = {
  items: NewsItem[];
  title: string;
  openLabel: string;
};

export function NewsGrid({ items, title, openLabel }: NewsGridProps) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="space-y-4 px-5 sm:px-8 lg:px-12">
      <div>
        <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-amber-200">
          <Rss className="h-4 w-4" />
          News Feeds
        </div>
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">
          {title}
        </h2>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {items.slice(0, 8).map((item) => (
          <a
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="group overflow-hidden rounded-lg border border-white/10 bg-[#11141a] outline-none transition duration-300 hover:-translate-y-0.5 hover:border-white/30 focus-visible:-translate-y-0.5 focus-visible:border-white/60"
            key={item.id}
          >
            {item.image ? (
              <img
                src={item.image}
                alt=""
                className="h-36 w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="h-36 w-full bg-[linear-gradient(135deg,#1d2939,#1f1f2e_48%,#3a2b21)]" />
            )}
            <div className="space-y-3 p-4">
              <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.12em] text-white/45">
                <span>{item.source}</span>
                <span>{formatNewsDate(item.publishedAt)}</span>
              </div>
              <h3 className="line-clamp-2 min-h-[2.75rem] text-sm font-semibold leading-snug text-white">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 text-xs font-medium text-cyan-200">
                {openLabel}
                <ExternalLink className="h-3.5 w-3.5" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
