import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const notif = atomWithStorage<boolean>("notif", false);

export default function Notifications() {
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useAtom(notif);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        onClick={() => setClicked(true)}
        className="group relative inline-flex items-center rounded-full text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
      >
        <span className="sr-only">notification</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="m-1 w-6 text-gray-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
          />
        </svg>

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
}
