import { SVGProps, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAtomValue } from "jotai";
import { nonUser } from "~/atoms/jotaiAtoms";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const AccountMenu = () => {
  const { data: session } = authClient.useSession();
  const { push } = useRouter();
  const [open, setOpen] = useState(false);
  const defaultPict = useAtomValue(nonUser);

  async function logOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          push("/auth"); // redirect to login page
        },
      },
    });
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger className="relative flex items-center gap-1 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-opacity-75">
          <Avatar className="h-8 w-8 rounded-md">
            <AvatarImage
              src={session?.user?.image ? session?.user.image : defaultPict}
              alt={session?.user?.name || "user"}
            />
            <AvatarFallback className="bg-black">
              {session ? session?.user.name.slice(0, 3) : "lex"}
            </AvatarFallback>
          </Avatar>
          <CaretIcon
            className={cn(
              open ? "rotate-180" : "",
              "transition-transform duration-300",
            )}
          />
        </TooltipTrigger>
        <TooltipContent
          sideOffset={10}
          align="end"
          className="flex w-60 flex-col gap-1 rounded-sm border border-muted/20 bg-ireng/90"
        >
          <div className="group rounded-md">
            <button
              onClick={() => push("/profiles")}
              type="button"
              className={` flex w-full items-center gap-2 px-2 py-2 text-sm`}
            >
              <Image
                width={32}
                height={32}
                className="rounded-md"
                unoptimized
                src={session?.user?.image ? session?.user.image : defaultPict}
                alt={session?.user?.name || "Anonymous User"}
              />
              <p className="text-start text-sm text-white group-hover/item:underline group-hover:underline">
                {session?.user?.name || "Profile"}
              </p>
            </button>
          </div>
          <div className="-mx-1 border-t border-muted/20"></div>
          <div className="group rounded-md">
            <button
              type="button"
              onClick={logOut}
              className="flex w-full items-center justify-center gap-2 px-2 py-1 text-sm text-white group-hover:underline"
            >
              Logout
            </button>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

function CaretIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 15 15"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M4.182 6.182a.45.45 0 0 1 .636 0L7.5 8.864l2.682-2.682a.45.45 0 0 1 .636.636l-3 3a.45.45 0 0 1-.636 0l-3-3a.45.45 0 0 1 0-.636"
        clipRule="evenodd"
      />
    </svg>
  );
}
