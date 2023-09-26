import * as React from 'react';
import AccountMenu from './AccountMenu';
import { Netflix } from './icons';
import NavbarItem from './NavbarItem';
import Search from './netflix1/Search';
import Notifications from './notification';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/UI/sheet';
import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline';

const TOP_OFFSET = 100;

const Navbar = () => {
  const [showBackground, setShowBackground] = React.useState(false);

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

  return (
    <nav className="-mt-16">
      <div
        className={`h-16 flex flex-row items-center transition duration-500 px-5 ${
          showBackground ? 'bg-zinc-900/90' : ''
        }`}>
        <div className="flex items-center justify-center">
          <Sheet>
            <SheetTrigger className="block sm:hidden">
              <Bars3BottomLeftIcon className="w-5 text-red-500" />
            </SheetTrigger>
            <SheetContent side="left" className="bg-zinc-900/90">
              <SheetHeader>
                <SheetTitle className="mb-4">
                  <Netflix className="h-4" />
                </SheetTitle>
                <SheetDescription>
                  <NavbarItem className="flex flex-col items-start gap-3" />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <Link
            href="/"
            className="flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus:py-1"
            title="beranda Notflox">
            <Netflix className="h-4 mt-1 lg:h-7 w-fit" />
          </Link>
          <NavbarItem className="flex-row hidden ml-4 sm:gap-3 md:gap-7 sm:flex" />
        </div>
        <div className="relative flex flex-row items-center gap-3 ml-auto md:gap-5">
          <div className="">
            <Search />
          </div>
          <Notifications />
          <AccountMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
