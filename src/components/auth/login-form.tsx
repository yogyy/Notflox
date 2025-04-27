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
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "./form-error";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { loginState, providerState } from "~/atoms/auth-atoms";
import { useAtomValue } from "jotai";
import { Spinner } from "../icons";
import { cn } from "@/lib/utils";
import { Social } from "./social-auth";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";
  const [error, setError] = useState<string | undefined>("");
  const authState = useAtomValue(loginState);
  const providerLogin = useAtomValue(providerState);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const login = async (values: z.infer<typeof LoginSchema>) => {
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
    }
  };

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    login(values)
      .then((data) => {
        form.reset();
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
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {!authState && (
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="min-h-14 rounded-sm border-zinc-600 text-zinc-100"
                        {...field}
                        disabled={form.formState.isSubmitted || !authState}
                        placeholder="username"
                        type="text"
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
                  <FormControl>
                    <Input
                      {...field}
                      className={cn(
                        "min-h-14 rounded-sm border-zinc-600 text-zinc-100 focus:border-zinc-100",
                        form.getFieldState("email").invalid &&
                          "border-destructive",
                      )}
                      autoComplete="off"
                      disabled={form.formState.isSubmitted || !authState}
                      placeholder="Email"
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
                  <FormControl>
                    <Input
                      {...field}
                      className={cn(
                        "min-h-14 rounded-sm border-zinc-600 text-zinc-100 focus:border-zinc-100",
                        form.getFieldState("password").invalid &&
                          "border-destructive",
                      )}
                      autoComplete="off"
                      disabled={form.formState.isSubmitted || !authState}
                      placeholder="Password"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error || urlError} />
          {!authState && (
            <FormError message="registration currently disabled" />
          )}
          <Button
            data-umami-event="Signin button"
            disabled={
              form.formState.isSubmitted || !authState || providerLogin !== null
            }
            type="submit"
            className={cn(
              "min-h-10 w-full rounded-sm font-medium tracking-wide focus-visible:bg-primary/90",
              form.formState.isSubmitted && "opacity-70",
            )}
          >
            {form.formState.isSubmitted ? (
              <Spinner className="h-5 w-5 animate-spin text-white" />
            ) : (
              <span>{authState ? "Sign In" : "Sign Up"}</span>
            )}
          </Button>
        </form>
      </Form>
      <Social disabled={form.formState.isSubmitted} />
    </div>
  );
};
