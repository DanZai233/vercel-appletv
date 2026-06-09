"use client";

import { RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#07090d] px-5 text-white">
      <div className="max-w-md text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-rose-200">
          Data Source Error
        </p>
        <h1 className="text-3xl font-semibold">数据源暂时不稳定</h1>
        <p className="mt-3 text-sm leading-6 text-white/60">
          外部接口可能限流或短暂不可用，刷新后通常会恢复。
        </p>
        {error.digest ? (
          <p className="mt-3 font-mono text-xs text-white/35">
            {error.digest}
          </p>
        ) : null}
        <button
          className="mt-6 inline-flex h-10 items-center gap-2 rounded-md bg-white px-4 text-sm font-semibold text-black transition hover:bg-cyan-100"
          onClick={reset}
          type="button"
        >
          <RotateCcw className="h-4 w-4" />
          重新加载
        </button>
      </div>
    </main>
  );
}
