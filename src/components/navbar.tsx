import * as React from 'react';
import AccountMenu from './AccountMenu';
import { Netflix } from './icons';
import NavbarItem from './NavbarItem';
import Search from './netflix1/Search';
import Drawer from './netflix1/Drawer';
import Notifications from './notification';
import Link from 'next/link';

const TOP_OFFSET = 66;

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
    <nav className="fixed z-20 w-full">
      <div
        className={`pr-4 pl-3 lg:px-4 py-3 lg:py-6 flex flex-row items-center transition duration-500 ${
          showBackground ? 'bg-zinc-900/90' : ''
        }`}
      >
        <div className="flex items-center justify-">
          <Drawer />
          <Link
            href="/"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus:py-1"
            title="beranda Notflox"
          >
            <Netflix className="h-4 lg:h-7" />
          </Link>
        </div>
        <NavbarItem className="flex-row hidden ml-8 gap-7 md:flex" />
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
