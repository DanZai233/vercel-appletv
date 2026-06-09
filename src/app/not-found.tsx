import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#07090d] px-5 text-white">
      <div className="max-w-md text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-cyan-200">
          404
        </p>
        <h1 className="text-3xl font-semibold">番剧没有找到</h1>
        <p className="mt-3 text-sm leading-6 text-white/60">
          可能是条目已下架，或当前数据源暂时不可用。
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex h-10 items-center rounded-md bg-white px-4 text-sm font-semibold text-black transition hover:bg-cyan-100"
        >
          回到首页
        </Link>
      </div>
    </main>
  );
}
