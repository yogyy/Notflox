import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { LoginSchema } from "@/lib/client/schema";
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
import { useRouter } from "next/router";
import { authState, providerState } from "~/atoms/auth-atoms";
import { useAtomValue } from "jotai";
import { Spinner } from "../icons";
import { cn } from "@/lib/utils";
import { Social } from "./social-auth";
import { authClient } from "@/lib/auth-client";

export const LoginForm = () => {
  const router = useRouter();
  const state = useAtomValue(authState);
  const providerLogin = useAtomValue(providerState);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "", username: "Lex Luthor" },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    if (state === "login") {
      const { data, error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
        fetchOptions: {
          onSuccess: () => {
            router
              .push("/profiles")
              .then(() => toast.success("Welcome To Notflox"));
          },
        },
      });

      if (error) {
        form.setError("root", { message: error.message });
      }
    } else {
      const { error } = await authClient.signUp.email({
        email: values.email,
        password: values.password,
        name: values.username || "",
        fetchOptions: {
          onSuccess: () => {
            router
              .push("/profiles")
              .then(() => toast.success("Welcome To Notflox"));
          },
        },
      });

      if (error) {
        form.setError("root", { message: error.message });
      }
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {state === "register" && (
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="min-h-14 rounded border-zinc-600 text-zinc-100"
                        disabled={form.formState.isSubmitting}
                        placeholder="John Constantine"
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
                        "min-h-14 rounded border-zinc-600 text-zinc-100",
                        form.getFieldState("email").invalid &&
                          "border-destructive",
                      )}
                      autoComplete="off"
                      disabled={form.formState.isSubmitting}
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
                        "min-h-14 rounded border-zinc-600 text-zinc-100",
                        form.getFieldState("password").invalid &&
                          "border-destructive",
                      )}
                      autoComplete="off"
                      disabled={form.formState.isSubmitting}
                      placeholder="Password"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={form.formState.errors.root?.message} />
          {/* {!authState && (
            <FormError message="registration currently disabled" />
          )} */}
          <Button
            data-umami-event="Signin button"
            disabled={form.formState.isSubmitting || providerLogin !== null}
            type="submit"
            className={cn(
              "min-h-10 w-full rounded font-medium tracking-wide focus-visible:bg-primary/90",
              form.formState.isSubmitting && "opacity-70",
            )}
          >
            {form.formState.isSubmitting ? (
              <Spinner className="h-5 w-5 animate-spin text-white" />
            ) : (
              <span>{state === "login" ? "Sign In" : "Sign Up"}</span>
            )}
          </Button>
        </form>
      </Form>
      <Social disabled={form.formState.isSubmitting} />
    </div>
  );
};
