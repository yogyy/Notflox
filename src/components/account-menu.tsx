import React from "react";
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
import { LoginIcon, LogoutIcon } from "./icons/general";

export const AccountMenu = () => {
  const { data: session } = useSession();
  const { push } = useRouter();
  const [open, setOpen] = React.useState(false);
  const defaultPict = useAtomValue(nonUser);

  const userPicture = session?.user?.picture
    ? session?.user.picture
    : defaultPict;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="relative rounded-full bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-opacity-75">
        <Avatar className="h-10 w-10">
          <AvatarImage src={userPicture} alt={session?.user?.name || "user"} />
          <AvatarFallback className="bg-black">
            {session ? session?.user.name.slice(0, 3) : "lex"}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={10}
        align="end"
        className="shadow-x flex w-60 flex-col gap-1 bg-ireng"
      >
        <button
          className="sr-only"
          onClick={() => setOpen(!open)}
          type="button"
        >
          close popover
        </button>
        <div className="group rounded-md focus-within:bg-black/70 hover:bg-black/70">
          <button
            onClick={() => push("/profiles")}
            type="button"
            className={` flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm outline-none`}
          >
            <Image
              width={32}
              height={32}
              className="w-8 rounded-full"
              unoptimized
              src={userPicture}
              alt={session?.user?.name || "Anonymous User"}
            />
            <p className="text-start text-sm text-white group-hover/item:underline">
              {session?.user?.name || "Profile"}
            </p>
          </button>
        </div>
        <div className="rounded-md px-1 py-1 focus-within:bg-black/70 hover:bg-black/70">
          <button
            type="button"
            onClick={() => (session !== null ? signOut() : signIn())}
            className={`group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-white outline-none`}
          >
            <span className="flex h-8 w-8 items-center justify-center">
              {session !== null ? <LogoutIcon /> : <LoginIcon />}
            </span>
            {session !== null ? "Logout" : "SignIn"}
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
