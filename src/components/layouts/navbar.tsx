import * as React from 'react';
import AccountMenu from '../AccountMenu';
import { Netflix } from '../icons';
import NavbarItem from '../navbar-item';
import Search from '../search';
import Notifications from '../notification';
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
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [showBackground, setShowBackground] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 100) {
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
    <nav
      className={cn(
        'flex justify-center w-full bg-ireng sm:bg-transparent sm:-mt-16 transition duration-300',
        showBackground ? 'sm:bg-ireng/90 sm:backdrop-blur-sm' : ''
      )}>
      <div
        className={cn(
          'h-16 flex flex-row items-center justify-between px-5 w-full min-w-fit max-w-7xl mx-auto'
        )}>
        <div className="flex items-center justify-center">
          <Sheet>
            <SheetTrigger className="block sm:hidden px-2 py-1 hover:bg-primary/10 rounded-md">
              <Bars3BottomLeftIcon className="w-7 text-red-500" />
              <span className="sr-only">open drawer</span>
            </SheetTrigger>
            <SheetContent side="top" className="bg-zinc-900/90 w-full">
              <SheetHeader>
                <SheetTitle className="mb-4">
                  <Netflix className="h-4" />
                </SheetTitle>
                <SheetDescription asChild>
                  <NavbarItem className="flex flex-col items-start gap-3" />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <Link
            href="/"
            className="flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus:py-1"
            title="beranda Notflox">
            <Netflix className="h-4 mt-1 lg:h-7 w-fit hidden sm:block" />
          </Link>
          <NavbarItem className="flex-row hidden ml-4 sm:gap-3 md:gap-7 sm:flex" />
        </div>
        <div className="relative flex items-center gap-2 md:gap-4">
          <Search />
          <Notifications />
          <AccountMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
