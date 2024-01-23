import { signIn } from "next-auth/react";
import { Github, Google } from "@/components/icons";

export const OAuth: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  ...props
}) => {
  return (
    <div
      className="mt-4 flex flex-row items-center justify-center gap-4"
      {...props}
    >
      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/profiles" })}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-transparent transition hover:brightness-50"
      >
        <Google size="30px" />
      </button>
      <button
        type="button"
        onClick={() => signIn("github", { callbackUrl: "/profiles" })}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-transparent transition hover:brightness-50"
      >
        <Github size="30px" className="stroke-white " />
      </button>
    </div>
  );
};
