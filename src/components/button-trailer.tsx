import * as React from "react";
import { cn } from "@/lib/utils";
import { PlayIcon } from "./icons/general";
import { buttonVariants } from "./ui/button";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export const ButtonTrailer = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "group inline-flex items-center justify-between bg-card font-medium",
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
