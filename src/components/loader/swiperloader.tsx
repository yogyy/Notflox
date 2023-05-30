import clsx from 'clsx';

export function SwiperPotraitLoading() {
  return (
    <div className={clsx('h-auto relative space-y-0.5 md:space-y-2')}>
      <div className="h-4 mb-1 ml-5 w-44 animate-pulse bg-zinc-800" />
      <div className="relative">
        <div className="flex items-center space-x-2.5 overflow-x-scroll scrollbar-hide md:space-x-3.5 px-2.5">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="relative aspect-[9/14] w-[92px] lg:w-[164px] h-full rounded-sm bg-zinc-800 animate-pulse md:rounded"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SwiperLanscapeLoading() {
  return (
    <div className={clsx('h-auto relative space-y-0.5 md:space-y-2')}>
      <div className="h-4 mb-1 ml-5 w-44 animate-pulse bg-zinc-800" />
      <div className="relative">
        <div className="flex grow items-center space-x-2.5 overflow-x-scroll scrollbar-hide md:space-x-3.5 px-2.5">
          {[...Array(2)].map((_, index) => (
            <div
              key={index}
              className="relative aspect-video w-[220px] lg:w-[342px] rounded-sm bg-zinc-800 animate-pulse md:rounded"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
