const AnimeAiringLoading = () => {
  return (
    <ul className="relative mb-14 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6">
      {[...Array(12)].map((_, index) => (
        <li key={index} aria-label="loading">
          <div className="relative aspect-poster h-auto w-full animate-pulse rounded bg-zinc-800" />
        </li>
      ))}
    </ul>
  );
};

const AnimeWeeklyLoading = () => {
  return (
    <ul className="grid w-auto flex-auto grid-cols-1 gap-3 font-semibold text-gray-400 md:grid-cols-2 xl:grid-cols-1">
      <li className="relative aspect-video h-full max-h-[200px] w-full md:col-span-2 xl:col-span-1">
        <div className="relative z-0 aspect-video max-h-[200px] w-full animate-pulse rounded bg-zinc-800">
          <div className="absolute bottom-0 flex w-full flex-1 items-center justify-start">
            <h2 className="m-3 flex h-5 w-5 items-center justify-center rounded-md border bg-white/80 py-5 pl-5 pr-5 text-sm text-black">
              1
            </h2>
            <span className="relative mr-2 h-4 w-full flex-auto animate-pulse rounded-sm bg-white/80" />
          </div>
        </div>
      </li>
      {[...Array(9)].map((_, index) => (
        <li className="flex items-center gap-1" key={index}>
          <h2 className="m-3 flex h-5 w-5 items-center justify-center rounded-md border p-5 text-sm">
            {index + 2}
          </h2>
          <div className="relative h-[60px] w-[46px] flex-shrink-0 animate-pulse rounded-md bg-zinc-800" />
          <div className="mr-1.5 flex flex-1 flex-col gap-1.5 place-self-start py-1.5">
            <span className="aspect-[27:40] relative ml-1.5 h-4 min-w-full max-w-[150px] animate-pulse rounded-sm bg-zinc-800" />
            <span className="aspect-[27:40] relative ml-1.5 h-4 min-w-[70%] max-w-[180px] animate-pulse rounded-sm bg-zinc-800" />
          </div>
        </li>
      ))}
    </ul>
  );
};

export { AnimeAiringLoading, AnimeWeeklyLoading };
