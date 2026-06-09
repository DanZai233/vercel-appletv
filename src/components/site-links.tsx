import { GitFork, UserRound } from "lucide-react";
import { SITE } from "@/lib/site";

export function SiteLinks() {
  return (
    <div className="flex items-center gap-2">
      <a
        aria-label="GitHub repository"
        className="inline-flex h-9 items-center gap-2 rounded-md border border-white/15 bg-white/10 px-2.5 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/16"
        href={SITE.repositoryUrl}
        rel="noreferrer"
        target="_blank"
      >
        <GitFork className="h-4 w-4" />
        <span className="hidden lg:inline">GitHub</span>
      </a>
      <a
        aria-label={`Author ${SITE.authorName}`}
        className="inline-flex h-9 items-center gap-2 rounded-md border border-white/15 bg-white/10 px-2.5 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/16"
        href={SITE.authorUrl}
        rel="noreferrer"
        target="_blank"
      >
        <UserRound className="h-4 w-4" />
        <span className="hidden xl:inline">{SITE.authorName}</span>
      </a>
    </div>
  );
}
