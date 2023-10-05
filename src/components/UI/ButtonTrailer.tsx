import * as React from 'react';
import { cn } from '@/lib/utils';
import { PlayIcon } from '@heroicons/react/24/outline';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const ButtonTrailer = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center group justify-between px-3 py-1.5 w-full font-semibold',
          'text-gray-300 border rounded shadow-sm bg-black/25 outline-none transition-colors duration-300',
          'hover:text-red-50 hover:shadow-red-600 hover:border-red-600 hover:bg-[#121212]/20',
          'focus:text-red-50 focus:shadow-red-600 focus:border-red-600 focus:bg-[#121212]/20',
          className
        )}
        {...props}>
        Play Trailer
        <PlayIcon
          className={cn(
            'w-5 transition-colors duration-500',
            'group-hover:fill-primary/90 group-focus:fill-primary/90'
          )}
        />
      </button>
    );
  }
);
ButtonTrailer.displayName = 'ButtonTrailer';

export default ButtonTrailer;
