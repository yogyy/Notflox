import useCurrentUser from '@/hooks/useCurrentUser';
import {
  BellIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import * as React from 'react';
import AccountMenu from './AccountMenu';
import { Netflix } from './icons';

import NavbarItem from './NavbarItem';
import MobileMenu from './MobileMenu';
import Image from 'next/image';
import Search from './netflix1/Search';
import Drawer from './netflix1/Drawer';

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showAccountMenu, setShowAccountMenu] = React.useState(false);
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const [showBackground, setShowBackground] = React.useState(false);

  const { data: currentUser } = useCurrentUser();

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleAccountMenu = React.useCallback(() => {
    setShowAccountMenu(current => !current);
  }, []);

  const toggleMobileMenu = React.useCallback(() => {
    setShowMobileMenu(current => !current);
  }, []);

  return (
    <nav className="w-full fixed z-20">
      <div
        className={`px-4 py-2 md:py-6 flex flex-row items-center transition duration-500 ${
          showBackground ? 'bg-zinc-900/90' : ''
        }`}
      >
        <div className="flex items-center">
          <Drawer />
          <Netflix className="h-4 lg:h-7" />
        </div>
        <NavbarItem className="flex-row ml-8 gap-7 hidden lg:flex" />
        <div className="flex flex-row ml-auto gap-3 md:gap-5 items-center">
          <div className="hidden md:block">
            <Search />
          </div>
          <button className="text-gray-200 hover:text-gray-300 cursor-pointer transition ">
            <BellIcon className="w-6 m-1" />
          </button>
          <button
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative focus:outline-blue-500 p-1"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <Image
                width={40}
                height={40}
                src={
                  currentUser?.image
                    ? currentUser.image
                    : '/images/default-slate.png'
                }
                alt={`${currentUser?.name}`}
                priority
              />
            </div>
            <ChevronDownIcon
              className={`w-4 text-white fill-white transition ${
                showAccountMenu ? 'rotate-180' : 'rotate-0'
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
