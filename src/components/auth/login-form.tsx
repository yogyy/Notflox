import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "./form-error";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { loginState } from "~/atoms/auth-atoms";
import { useAtomValue } from "jotai";
import { Spinner } from "../icons";
import { cn } from "@/lib/utils";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";
  const [error, setError] = useState<string | undefined>("");
  const [disabled, setDisabled] = useState(false);
  const authState = useAtomValue(loginState);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = async (values: z.infer<typeof LoginSchema>) => {
    setDisabled(true);
    try {
      setError("");
      return await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      throw error;
    } finally {
      setDisabled((prev) => !prev);
    }
  };

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    login(values)
      .then((data) => {
        if (data?.status === 200) {
          router
            .push("/profiles")
            .then(() => toast.success("Sign In Success."));
        }
        if (data?.error) {
          setError(data.error);
          toast.error("error", { description: data.error });
        }
      })
      .catch(() => setError("Something went wrong"));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {!authState && (
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className="border-zinc-600 text-zinc-100"
                      {...field}
                      disabled={disabled || !authState}
                      placeholder="lex"
                      type="username"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="border-zinc-600 text-zinc-100"
                    {...field}
                    disabled={disabled || !authState}
                    placeholder="lex@kryptonite.stn"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="border-zinc-600 text-zinc-100"
                    {...field}
                    disabled={disabled || !authState}
                    placeholder="********"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error || urlError} />
        {!authState && <FormError message="registration currently disabled" />}
        <Button
          data-umami-event="Signin button"
          disabled={disabled || !authState}
          type="submit"
          className={cn(
            "w-full focus-visible:bg-primary/90",
            disabled && "opacity-70",
          )}
        >
          {disabled && <Spinner className="h-5 w-5 animate-spin text-white" />}
          <span className={cn(disabled && "hidden")}>
            {authState ? "Login" : "Register"}
          </span>
        </Button>
      </form>
    </Form>
  );
};
