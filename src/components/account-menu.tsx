import React from 'react';
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/UI/popover';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { nonUser } from '~/atoms/jotaiAtoms';
import { Avatar, AvatarFallback, AvatarImage } from './UI/avatar';

export default function AccountMenu() {
  const session = useSession();
  const { push } = useRouter();
  const [open, setOpen] = React.useState(false);
  const [userPic] = useAtom(nonUser);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="relative rounded-full bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-opacity-75">
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={session.data?.user?.image ? session.data?.user.image : userPic}
            alt={session.data?.user?.name || 'user'}
          />
          <AvatarFallback>YOU</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={10}
        align="end"
        className="flex flex-col gap-1 shadow-sm w-60 bg-ireng shadow-white/60">
        <button className="sr-only" onClick={() => setOpen(!open)}>
          close popover
        </button>
        <div className="rounded-md group hover:bg-black/70 focus-within:bg-black/70">
          <button
            onClick={() => push('/profiles')}
            type="button"
            className={` flex w-full items-center rounded-md px-2 py-2 text-sm gap-2 outline-none`}>
            <Image
              width={32}
              height={32}
              className="w-8 rounded-full"
              src={
                session.data?.user?.image ? session.data?.user.image : userPic
              }
              alt={session.data?.user?.name || 'Anonymous User'}
            />
            <p className="text-sm text-white group-hover/item:underline text-start">
              {session.data?.user?.name || 'Profile'}
            </p>
          </button>
        </div>
        <div className="px-1 py-1 rounded-md hover:bg-black/70 focus-within:bg-black/70">
          <button
            onClick={() => (session.data !== null ? signOut() : signIn())}
            className={`text-white group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2 outline-none`}>
            <span className="flex justify-center w-8 h-8">
              {session.data !== null ? (
                <ArrowRightOnRectangleIcon className="w-6" />
              ) : (
                <ArrowLeftOnRectangleIcon className="w-6" />
              )}
            </span>
            {session.data !== null ? 'Logout' : 'SignIn'}
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
