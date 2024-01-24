import { cn } from "@/lib/utils";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant: "register" | "login";
}

const EmailInput = ({ variant, className, ...props }: InputProps) => {
  return (
    <div className="email relative">
      <input
        type="email"
        id="email"
        placeholder="email"
        disabled={variant === "register"}
        className={cn(
          "text-md block w-full appearance-none rounded-md bg-neutral-700/30 px-6 pb-1.5 pt-[18px]",
          "invalid:border-b-1 peer placeholder:text-transparent focus:outline-none focus:ring-0",
          variant === "register" ? "text-gray-400" : "",
          className,
        )}
        required
        {...props}
      />
      <label
        htmlFor="email"
        className={cn(
          "text-md absolute left-6 top-3 z-10 origin-[0] -translate-y-3 scale-75 transform cursor-text text-zinc-400 duration-150",
          "peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75",
        )}
      >
        Email
      </label>
    </div>
  );
};

const PassInput = ({ variant, className, ...props }: InputProps) => {
  return (
    <div className="pass relative">
      <input
        type="password"
        id="password"
        placeholder="password"
        disabled={variant === "register"}
        className={cn(
          "text-md block w-full appearance-none rounded-md bg-neutral-700/30 px-6 pb-1.5 pt-[18px] text-white",
          "invalid:border-b-1 peer placeholder:text-transparent focus:outline-none focus:ring-0",
          className,
        )}
        required
        {...props}
      />
      <label
        htmlFor="password"
        className={cn(
          "text-md absolute left-6 top-3 z-10 origin-[0] -translate-y-3 scale-75 transform cursor-text text-zinc-400 duration-150",
          "peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75",
        )}
      >
        Password
      </label>
    </div>
  );
};

const NameInput = ({ variant, className, ...props }: InputProps) => {
  return (
    <div className="name relative">
      <input
        type="text"
        disabled={variant === "register"}
        id="name"
        className={cn(
          "text-md invalid:border-b-1 peer block w-full rounded-md bg-neutral-700/30 px-6 pb-1.5 pt-[18px] text-white focus:outline-none focus:ring-0",
          className,
        )}
        required
        {...props}
      />
      <label
        htmlFor="name"
        className={cn(
          "text-md absolute left-6 top-3 z-10 origin-[0] -translate-y-3 scale-75 transform cursor-text text-zinc-400 duration-150",
          "peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75",
        )}
      >
        Username
      </label>
    </div>
  );
};

export { NameInput, EmailInput, PassInput };
