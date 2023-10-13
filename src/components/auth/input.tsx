import { cn } from '@/lib/utils';
import React from 'react';

type InputType = {
  variant: 'register' | 'login';
} & React.InputHTMLAttributes<HTMLInputElement>;

const EmailInput: React.FC<InputType> = ({ variant, ...props }) => {
  return (
    <div className="relative email">
      <input
        type="email"
        id="email"
        placeholder="email"
        disabled={variant === 'register'}
        className={cn(
          'block rounded-md px-6 pt-[18px] pb-1.5 w-full text-md bg-neutral-700/30 appearance-none',
          'placeholder:text-transparent focus:outline-none focus:ring-0 peer invalid:border-b-1',
          variant === 'register' ? 'text-gray-400' : ''
        )}
        required
        {...props}
      />
      <label
        htmlFor="email"
        className={cn(
          'absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-6 cursor-text',
          'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'
        )}>
        Email
      </label>
    </div>
  );
};

const PassInput: React.FC<InputType> = ({ variant, ...props }) => {
  return (
    <div className="relative pass">
      <input
        type="password"
        id="password"
        placeholder="password"
        disabled={variant === 'register'}
        className={cn(
          'block w-full px-6 pt-[18px] pb-1.5 text-white rounded-md appearance-none text-md bg-neutral-700/30',
          'placeholder:text-transparent focus:outline-none focus:ring-0 peer invalid:border-b-1'
        )}
        required
        {...props}
      />
      <label
        htmlFor="password"
        className={cn(
          'absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-6 cursor-text',
          'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'
        )}>
        Password
      </label>
    </div>
  );
};

const NameInput: React.FC<InputType> = ({ variant, ...props }) => {
  return (
    <div className="relative name">
      <input
        type="text"
        disabled={variant === 'register'}
        id="name"
        className="block w-full px-6 pt-[18px] pb-1.5 text-white rounded-md text-md bg-neutral-700/30 focus:outline-none focus:ring-0 peer invalid:border-b-1"
        required
        {...props}
      />
      <label
        htmlFor="name"
        className={cn(
          'absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-6 cursor-text',
          'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'
        )}>
        Username
      </label>
    </div>
  );
};

export { NameInput, EmailInput, PassInput };
