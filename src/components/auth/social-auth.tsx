import { Button } from "@/components/ui/button";
import { providerState } from "~/atoms/auth-atoms";
import { useAtom } from "jotai";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "../icons/spinner";
import { Github, Google } from "../icons/logo";

export const Social = ({ disabled }: { disabled: boolean }) => {
  const [provider, setProvider] = useAtom(providerState);
  const socialSignIn = async (provider: "google" | "github") => {
    const data = await authClient.signIn.social({
      provider,
      callbackURL: "/profiles",
      fetchOptions: {
        onSuccess: () => setProvider(null),
      },
    });

    return data;
  };

  return (
    <div className="mt-3 flex w-full items-center gap-x-2">
      <Button
        size="default"
        disabled={disabled || provider !== null}
        className="w-full rounded bg-white/10 text-white hover:bg-white/20 focus-visible:bg-white/20"
        variant="ghost"
        onClick={() => {
          socialSignIn("google");
          setProvider("google");
        }}
        data-umami-event="Google Signin button"
      >
        {provider === "google" ? (
          <Spinner className="h-5 w-5 animate-spin text-white" />
        ) : (
          <Google className="h-5 w-5" />
        )}
      </Button>
      <Button
        size="default"
        disabled={disabled || provider !== null}
        className="w-full rounded bg-white/10 text-white hover:bg-white/20 hover:text-current focus-visible:bg-white/20"
        variant="ghost"
        onClick={() => {
          socialSignIn("github");
          setProvider("github");
        }}
        data-umami-event="Github Signin button"
      >
        {provider === "github" ? (
          <Spinner className="h-5 w-5 animate-spin text-white" />
        ) : (
          <Github className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};
