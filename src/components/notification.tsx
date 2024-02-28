import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { BellIcon } from "./icons/general";

const notif = atomWithStorage<boolean>("notif", false);

export const Notifications = () => {
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useAtom(notif);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        onClick={() => setClicked(true)}
        className="group relative inline-flex items-center rounded-full text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
      >
        <span className="sr-only">notification</span>
        <BellIcon />
        <div
          className={
            !clicked
              ? "absolute right-1 top-1 h-[7px] w-[7px] animate-pulse rounded-full bg-red-700"
              : ""
          }
        />
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={10} className="p-0">
        <button className="sr-only" onClick={() => setOpen(!open)}>
          close popover
        </button>
        <div className="rounded-md bg-ireng p-4 shadow shadow-white/60">
          <span className="flex items-center">
            <span className="text-sm font-medium text-gray-200">
              Greetings!
            </span>
          </span>
          <span className="block text-sm text-gray-400">
            Welcome to Notflox, enjoy surfing~
          </span>
        </div>
      </PopoverContent>
    </Popover>
  );
};
