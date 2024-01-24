import React from "react";
import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";

const thumbnailLoading = cva(
  "rounded-sm bg-zinc-800 animate-pulse md:rounded",
  {
    variants: {
      variant: {
        portrait: "aspect-poster w-[164px]",
        landscape: "aspect-video w-[342px]",
      },
    },
    defaultVariants: {
      variant: "portrait",
    },
  },
);

interface ThumbnailLoading
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof thumbnailLoading> {}

export const SwiperLoading = ({ variant, className }: ThumbnailLoading) => {
  const arr = variant === "portrait" ? [...Array(3)] : [...Array(2)];
  return (
    <div className={cn("relative h-auto space-y-0.5 md:space-y-2")}>
      <div className="mb-1 ml-5 h-4 w-44 animate-pulse bg-zinc-800" />
      <div className="relative">
        <div className="flex grow items-center space-x-2.5 overflow-x-scroll px-2.5 scrollbar-hide md:space-x-3.5">
          {arr.map((_, index) => (
            <div
              key={index}
              className={cn(
                thumbnailLoading({ variant, className }),
                "animate-pulse rounded-sm bg-zinc-800 md:rounded",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
