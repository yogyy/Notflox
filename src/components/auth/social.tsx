import { signIn } from "next-auth/react";
import { Github, Google } from "@/components/icons";

import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

export const Social = () => {
  const searchParams = useSearchParams();

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: "/profiles",
    });
  };

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        size="default"
        className="w-full bg-white/10 text-white hover:bg-white/20 focus-visible:bg-white/20"
        variant="ghost"
        onClick={() => onClick("google")}
      >
        <Google className="h-5 w-5" />
      </Button>
      <Button
        size="default"
        className="w-full bg-white/10 text-white hover:bg-white/20 hover:text-current focus-visible:bg-white/20"
        variant="ghost"
        onClick={() => onClick("github")}
      >
        <Github className="h-5 w-5" />
      </Button>
    </div>
  );
};
