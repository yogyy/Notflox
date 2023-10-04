import { BellIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/UI/popover';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const notif = atomWithStorage<boolean>('notif', false);

export default function Notifications() {
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useAtom(notif);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        onClick={() => setClicked(true)}
        className="relative inline-flex items-center text-base font-medium rounded-full group hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600">
        <span className="sr-only">notification</span>
        <BellIcon className="w-6 m-1 text-gray-300" />
        <div
          className={
            !clicked
              ? 'w-[7px] h-[7px] bg-red-700 absolute top-1 right-1 rounded-full animate-pulse'
              : ''
          }
        />
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={10} className="p-0">
        <button className="sr-only" onClick={() => setOpen(!open)}>
          close popover
        </button>
        <div className="p-4 rounded-md shadow bg-ireng shadow-white/60">
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
