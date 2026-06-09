import { GitFork, UserRound } from "lucide-react";
import { SITE } from "@/lib/site";

type SiteLinksProps = {
  className?: string;
};

export function SiteLinks({ className }: SiteLinksProps) {
  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <a
        aria-label="GitHub repository"
        className="inline-flex h-9 items-center gap-2 rounded-md border border-white/15 bg-white/10 px-2.5 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/16"
        href={SITE.repositoryUrl}
        rel="noreferrer"
        target="_blank"
      >
        <GitFork className="h-4 w-4" />
        <span className="hidden sm:inline">GitHub</span>
      </a>
      <a
        aria-label={`Author ${SITE.authorName}`}
        className="inline-flex h-9 items-center gap-2 rounded-md border border-white/15 bg-white/10 px-2.5 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/16"
        href={SITE.authorUrl}
        rel="noreferrer"
        target="_blank"
      >
        <UserRound className="h-4 w-4" />
        <span className="hidden md:inline">{SITE.authorName}</span>
      </a>
    </div>
  );
}
