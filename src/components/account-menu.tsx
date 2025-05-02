import { SVGProps, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/router";
import { useAtomValue } from "jotai";
import { nonUser } from "~/atoms/jotaiAtoms";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

export const AccountMenu = () => {
  const { data: session } = useSession();
  const { push } = useRouter();
  const [open, setOpen] = useState(false);
  const defaultPict = useAtomValue(nonUser);

  const userPicture = session?.user?.picture
    ? session?.user.picture
    : defaultPict;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="relative flex items-center gap-1 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-opacity-75">
        <Avatar className="h-8 w-8 rounded-md">
          <AvatarImage src={userPicture} alt={session?.user?.name || "user"} />
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
      </PopoverTrigger>
      <PopoverContent
        sideOffset={10}
        align="end"
        className="flex w-60 flex-col gap-1 rounded-sm border border-muted/20 bg-ireng/90"
      >
        <button
          className="sr-only"
          onClick={() => setOpen(!open)}
          type="button"
        >
          close popover
        </button>
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
              src={userPicture}
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
            onClick={() => (session !== null ? signOut() : signIn())}
            className="flex w-full items-center justify-center gap-2 px-2 py-1 text-sm text-white group-hover:underline"
          >
            {session !== null ? "Logout" : "SignIn"}
          </button>
        </div>
      </PopoverContent>
    </Popover>
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
