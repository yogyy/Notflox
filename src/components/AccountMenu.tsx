import { signOut } from 'next-auth/react';
import React from 'react';

import useCurrentUser from '@/hooks/useCurrentUser';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data: currentUser } = useCurrentUser();

  if (!visible) {
    return null;
  }

  return (
    <div className="bg-[#121212] focus:outline-white w-56 absolute top-14 right-0 py-3 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <Link
          href="/profiles"
          className="px-3 group/item flex flex-row gap-3 items-center w-full"
        >
          <Image
            width={32}
            height={32}
            className="w-8 rounded-md"
            src={
              currentUser?.image
                ? currentUser.image
                : '/images/default-slate.png'
            }
            alt=""
          />
          <p className="text-white text-sm group-hover/item:underline">
            {currentUser?.name}
          </p>
        </Link>
      </div>
      <hr className="bg-gray-600 border-0 h-px my-2" />
      <button
        onClick={() => signOut()}
        className="py-2 px-3 text-center flex gap-5 text-white text-sm hover:underline"
      >
        <ArrowRightOnRectangleIcon className="w-5" /> Sign out of Netflix
      </button>
    </div>
  );
};

export default AccountMenu;
