import React from 'react';
import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';

const thumbnailLoading = cva(
  'rounded-sm bg-zinc-800 animate-pulse md:rounded',
  {
    variants: {
      variant: {
        portrait: 'aspect-poster w-[164px]',
        landscape: 'aspect-video w-[342px]',
      },
    },
    defaultVariants: {
      variant: 'portrait',
    },
  }
);

interface ThumbnailLoading<T>
  extends React.HTMLAttributes<T>,
    VariantProps<typeof thumbnailLoading> {}

export default function SwiperLoading({
  variant,
  className,
}: ThumbnailLoading<HTMLDivElement>) {
  const arr = variant === 'portrait' ? [...Array(3)] : [...Array(2)];
  return (
    <div className={cn('h-auto relative space-y-0.5 md:space-y-2')}>
      <div className="h-4 mb-1 ml-5 w-44 animate-pulse bg-zinc-800" />
      <div className="relative">
        <div className="flex grow items-center space-x-2.5 overflow-x-scroll scrollbar-hide md:space-x-3.5 px-2.5">
          {arr.map((_, index) => (
            <div
              key={index}
              className={cn(
                thumbnailLoading({ variant, className }),
                'rounded-sm bg-zinc-800 animate-pulse md:rounded'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
