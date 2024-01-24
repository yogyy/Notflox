import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import React from "react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/router";

interface ButtonAuthProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "register" | "login";
  email: string;
  password: string;
}

export const ButtonAuth = ({
  email,
  password,
  variant,
  className,
  ...props
}: ButtonAuthProps) => {
  const [disabled, setDisabled] = React.useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const login = async () => {
    setDisabled((prev) => !prev);
    try {
      const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
        callbackUrl: "/profiles",
      });

      switch (true) {
        case res?.error === null:
          router.push("/profiles");
          break;
        case email === "" && password === "":
          toast({
            variant: "destructive",
            title: "Error",
            description: "Email and password required",
          });
          break;
        default:
          toast({
            variant: "destructive",
            title: "Error",
            description: `${res?.error}`,
          });
          break;
      }
    } catch (error) {
      // Handle errors here, e.g., display an error message or log the error
      console.error("Error in login:", error);
      // You can also show a toast or any other error-handling mechanism.
    } finally {
      setDisabled((prev) => !prev);
    }
  };

  return (
    <button
      disabled={disabled || variant === "register" || email.length === 0}
      type="button"
      className={cn(
        disabled ? "cursor-not-allowed bg-red-900" : "hover:bg-red-700",
        "w-full rounded-md bg-red-600 py-3 text-white  transition-colors",
        className,
      )}
      onClick={login}
      {...props}
    >
      {variant === "login" ? "Sign In" : "Register"}
    </button>
  );
};
