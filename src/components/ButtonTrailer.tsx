import * as React from "react";
import { cn } from "@/lib/utils";

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={cn(
            "w-5 transition-colors duration-500",
            "group-hover:fill-primary/90 group-focus:fill-primary/90",
          )}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          />
        </svg>
      </button>
    );
  },
);
ButtonTrailer.displayName = "ButtonTrailer";
