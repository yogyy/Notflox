import * as React from "react";
import { cn } from "@/lib/utils";
import { PlayIcon } from "./icons/general";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export const ButtonTrailer = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group inline-flex w-full items-center justify-between px-3 py-1.5 font-semibold",
          "rounded border bg-black/25 text-gray-300 shadow-sm outline-none transition-colors duration-300",
          "hover:border-red-600 hover:bg-[#121212]/20 hover:text-red-50 hover:shadow-red-600",
          "focus:border-red-600 focus:bg-[#121212]/20 focus:text-red-50 focus:shadow-red-600",
          className,
        )}
        {...props}
      >
        Play Trailer
        <PlayIcon />
      </button>
    );
  },
);
ButtonTrailer.displayName = "ButtonTrailer";
