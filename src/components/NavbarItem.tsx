import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

const NavbarItem = () => {
  const router = useRouter();
  const arrOfRoute = router.route.split('/');
  return (
    <div className="flex-row ml-8 gap-7 hidden lg:flex font-semibold">
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
