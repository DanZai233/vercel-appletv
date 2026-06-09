export default function Loading() {
  return (
    <main className="min-h-screen bg-[#07090d] px-5 py-8 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="h-8 w-32 animate-pulse rounded-md bg-white/10" />
          <div className="h-10 w-full max-w-xs animate-pulse rounded-md bg-white/10 sm:w-72" />
        </div>
        <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
          <div className="hidden aspect-[2/3] animate-pulse rounded-lg bg-white/10 lg:block" />
          <div className="flex flex-col justify-end space-y-5">
            <div className="h-8 w-36 animate-pulse rounded-md bg-white/10" />
            <div className="h-16 max-w-2xl animate-pulse rounded-md bg-white/10" />
            <div className="h-24 max-w-3xl animate-pulse rounded-md bg-white/10" />
            <div className="grid max-w-2xl gap-3 sm:grid-cols-3">
              <div className="h-20 animate-pulse rounded-lg bg-white/10" />
              <div className="h-20 animate-pulse rounded-lg bg-white/10" />
              <div className="h-20 animate-pulse rounded-lg bg-white/10" />
            </div>
          </div>
        </div>
        <div className="mt-14 flex gap-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              className="h-72 w-44 shrink-0 animate-pulse rounded-lg bg-white/10"
              key={index}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
