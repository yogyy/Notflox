import React from "react";
import { EmailInput, NameInput, PassInput } from ".";
import OAuth from "./o-auth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ButtonAuth } from ".";

type Variant = "login" | "register";
export const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [variant, setVariant] = React.useState<Variant>("login");

  const toggleVariant = React.useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login",
    );
  }, []);
  return (
    <div className="flex h-full flex-col gap-3 rounded-md bg-black/90 px-2 py-16 sm:min-w-[480px] sm:px-16 md:gap-6">
      <div
        className={cn(
          variant === "login"
            ? "flex justify-center gap-2"
            : "grid place-content-center",
        )}
      >
        <h1 className="text-3xl font-semibold text-white">
          {variant === "login" ? "Sign in" : "Create an account"}
        </h1>
        {variant === "register" && (
          <p className="place-self-end text-primary">currently disabled.</p>
        )}
        {variant === "login" && (
          <Popover>
            <PopoverTrigger className="active:opacity-80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
              <span className="sr-only">info</span>
            </PopoverTrigger>
            <PopoverContent
              side="top"
              align="center"
              className="bg-white px-2 py-1.5"
            >
              Demo Account
              <div className="flex flex-col">
                <span>email: lex@kryptonite.stn</span>
                <span>pass: superman</span>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
      <div className="flex flex-col gap-3.5">
        {variant === "register" && (
          <NameInput
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            value={name}
            variant={variant}
          />
        )}
        <EmailInput
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          value={variant === "register" ? "not@available.com" : email}
          variant={variant}
        />
        <PassInput
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          value={variant === "register" ? "" : password}
          variant={variant}
        />
      </div>
      <ButtonAuth email={email} password={password} variant={variant} />
      <OAuth />
      <div className="mt-12 flex flex-col sm:flex-row sm:justify-between">
        <p className="text-neutral-500">
          {variant === "login"
            ? "First time using Notflox?"
            : "Already have an account?"}
        </p>
        <button
          type="button"
          onClick={toggleVariant}
          className="inline-flex cursor-pointer text-white hover:underline"
        >
          {variant === "login" ? "Create an account" : "Login"}.
        </button>
      </div>
    </div>
  );
};
