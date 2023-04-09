import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

interface NavItem {
  className?: string;
}

const NavbarItem = ({ className }: NavItem) => {
  const router = useRouter();
  const arrOfRoute = router.route.split('/');
  return (
    <div className={clsx('font-semibold', className)}>
      {links.map(link => (
        <Link
          href={link.url}
          key={link.name}
          className={`${
            router.pathname == link.url
              ? 'text-[#E50914] font-bold'
              : 'text-white '
          } cursor-pointer hover:text-gray-300 transition-colors`}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default NavbarItem;

const links = [
  { name: 'Home', url: '/' },
  { name: 'Series', url: '/series' },
  { name: 'Movies', url: '/movies' },
  { name: 'New & Popular', url: '/asd' },
  { name: 'My List', url: '/my-list' },
  // { name: 'Browse by Languages', url: '/' },
];
