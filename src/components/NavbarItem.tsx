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
  const baseRoute = '/' + arrOfRoute[1];

  return (
    <div className={clsx('font-semibold', className)}>
      {links.map(link => (
        <Link
          href={link.url}
          key={link.name}
          className={`${
            router.pathname && baseRoute !== link.url
              ? 'text-white focus-visible:ring-red-600'
              : 'text-primary font-bold focus-visible:ring-white'
          } cursor-pointer hover:text-primary/60 transition-colors px-1 focus:outline-none focus-visible:ring-2  rounded`}
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
  { name: 'Tv Show', url: '/tv' },
  { name: 'Movies', url: '/movie' },
  { name: 'Anime', url: '/anime' },
];
