export default function AnimeLoading() {
  return (
    <main className="min-h-screen bg-[#07090d] px-5 py-8 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-center justify-between">
          <div className="h-10 w-24 animate-pulse rounded-md bg-white/10" />
          <div className="h-8 w-28 animate-pulse rounded-md bg-white/10" />
        </div>
        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          <div className="aspect-[2/3] max-w-[300px] animate-pulse rounded-lg bg-white/10" />
          <div className="space-y-5">
            <div className="h-8 w-40 animate-pulse rounded-md bg-white/10" />
            <div className="h-16 max-w-2xl animate-pulse rounded-md bg-white/10" />
            <div className="h-32 max-w-4xl animate-pulse rounded-md bg-white/10" />
            <div className="grid gap-3 sm:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  className="h-20 animate-pulse rounded-lg bg-white/10"
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-14 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              className="h-44 animate-pulse rounded-lg bg-white/10"
              key={index}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
