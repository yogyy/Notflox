import React, { ButtonHTMLAttributes, ComponentProps } from 'react';
import { PlayIcon } from '../icons/play';
import clsx from 'clsx';

interface ButtonProps extends ComponentProps<'button'> {
  onClick: () => void;
  title: string;
  className?: string;
}

const ButtonTrailer: React.FC<ButtonProps> = ({ className, ...rest }) => {
  return (
    <button
      {...rest}
      className={clsx(
        'flex items-center group justify-center md:justify-between px-3 py-1.5 w-full',
        'text-gray-300 border rounded shadow-sm bg-black/25 outline-none transition-colors duration-300',
        'hover:font-semibold hover:shadow-red-600 hover:border-red-600 hover:bg-[#121212]/20',
        'focus:font-semibold focus:shadow-red-600 focus:border-red-600 focus:bg-[#121212]/20',
        className
      )}
    >
      <span className="hidden md:block">Trailer&nbsp;</span>
      <PlayIcon className="w-5" />
    </button>
  );
};

export default ButtonTrailer;
