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

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showAccountMenu, setShowAccountMenu] = React.useState(false);
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const [showBackground, setShowBackground] = React.useState(false);

  const { data: currentUser } = useCurrentUser();

  React.useEffect(() => {
    const handleScroll = () => {
      // console.log(window.scrollY);
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
        className={`px-4 md:px-16 py-2 md:py-6 flex flex-row items-center transition duration-500 ${
          showBackground ? 'bg-zinc-900/90' : ''
        }`}
      >
        <Netflix className="h-4 lg:h-7" />
        <NavbarItem />
        {/* <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <ChevronDownIcon
            className={`w-4 text-white fill-white transition ${
              showMobileMenu ? 'rotate-180' : 'rotate-0'
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div> */}
        <div className="flex flex-row ml-auto gap-3 md:gap-5 items-center">
          <Search />
          <button className="text-gray-200 hover:text-gray-300 cursor-pointer transition ">
            <BellIcon className="w-6 m-1" />
          </button>
          <button
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative focus:outline-blue-500 pr-1"
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
                alt=""
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
