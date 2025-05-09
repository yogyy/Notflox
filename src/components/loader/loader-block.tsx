import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

interface LoaderBlockType extends HTMLAttributes<HTMLDivElement> {}

export const LoaderBlock = ({ className, ...props }: LoaderBlockType) => {
  return (
    <div className={cn("grid place-content-center", className)} {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="loader h-7 w-7 animate-spin text-primary md:h-12 md:w-12"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </div>
  );
};
