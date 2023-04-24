import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { Movie } from '../../typing';

interface NavItem {
  className?: string;
}

const NavbarItem = ({ className }: NavItem) => {
  const router = useRouter();
  const arrOfRoute = router.route.split('/');
  const baseRoute = '/' + arrOfRoute[1];

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
  { name: 'Anime', url: '/anime' },
  { name: 'Details', url: '/movie/' || '/tv/' },
];
