const AnimeWeeklyLoading = () => {
  return (
    <ul className="grid flex-auto w-auto grid-cols-1 gap-3 font-semibold text-gray-400 md:grid-cols-2 xl:grid-cols-1">
      <li className="relative w-full h-full aspect-video max-h-[200px] md:col-span-2 xl:col-span-1">
        <div className="relative z-0 w-full rounded aspect-video max-h-[200px] bg-zinc-800 animate-pulse">
          <div className="absolute bottom-0 flex items-center justify-start flex-1 w-full">
            <h2 className="flex items-center justify-center w-5 h-5 py-5 pl-5 pr-5 m-3 text-sm text-black border rounded-md bg-white/80">
              1
            </h2>
            <span className="relative flex-auto w-full h-4 mr-2 rounded-sm bg-white/80 animate-pulse" />
          </div>
        </div>
      </li>
      {[...Array(9)].map((_, index) => (
        <li className="flex items-center gap-1" key={index}>
          <h2 className="flex items-center justify-center w-5 h-5 p-5 m-3 text-sm border rounded-md">
            {index + 2}
          </h2>
          <div className="relative w-[46px] h-[60px] bg-zinc-800 animate-pulse rounded-md flex-shrink-0" />
          <div className="flex flex-col flex-1 gap-1.5 mr-1.5 place-self-start py-1.5">
            <span className="relative max-w-[150px] min-w-full ml-1.5 h-4 rounded-sm aspect-[27:40] bg-zinc-800 animate-pulse" />
            <span className="relative max-w-[180px] min-w-[70%] ml-1.5 h-4 rounded-sm aspect-[27:40] bg-zinc-800 animate-pulse" />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AnimeWeeklyLoading;
