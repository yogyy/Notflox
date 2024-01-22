import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { nonUser } from "~/atoms/jotaiAtoms";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function AccountMenu() {
  const session = useSession();
  const { push } = useRouter();
  const [open, setOpen] = React.useState(false);
  const [userPic] = useAtom(nonUser);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="relative rounded-full bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-opacity-75">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={session.data?.user?.image ? session.data?.user.image : userPic}
            alt={session.data?.user?.name || "user"}
          />
          <AvatarFallback className="bg-black">YOU</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={10}
        align="end"
        className="flex w-60 flex-col gap-1 bg-ireng shadow-sm shadow-white/60"
      >
        <button className="sr-only" onClick={() => setOpen(!open)}>
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
              src={
                session.data?.user?.image ? session.data?.user.image : userPic
              }
              alt={session.data?.user?.name || "Anonymous User"}
            />
            <p className="text-start text-sm text-white group-hover/item:underline">
              {session.data?.user?.name || "Profile"}
            </p>
          </button>
        </div>
        <div className="rounded-md px-1 py-1 focus-within:bg-black/70 hover:bg-black/70">
          <button
            onClick={() => (session.data !== null ? signOut() : signIn())}
            className={`group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-white outline-none`}
          >
            <span className="flex h-8 w-8 justify-center">
              {session.data !== null ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                  />
                </svg>
              )}
            </span>
            {session.data !== null ? "Logout" : "SignIn"}
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
