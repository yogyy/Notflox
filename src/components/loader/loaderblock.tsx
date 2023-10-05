import { cn } from '@/lib/utils';
import React, { HTMLAttributes } from 'react';

const LoaderBlock: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {
  return (
    <div
      className={cn('grid place-content-center w-screen h-screen', className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="loader animate-spin text-primary w-7 h-7 md:w-12 md:h-12">
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </div>
  );
};

export default LoaderBlock;
