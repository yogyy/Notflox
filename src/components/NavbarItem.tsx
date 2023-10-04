import * as React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavItem {
  className?: string;
}

const NavbarItem = ({ className }: NavItem) => {
  const router = useRouter();
  const arrOfRoute = router.route.split('/');
  const baseRoute = '/' + arrOfRoute[1];

  return (
    <div className={cn('font-semibold', className)}>
      <ul className="flex gap-3 flex-col sm:flex-row items-start">
        {links.map(link => (
          <li key={link.name}>
            <Link
              href={link.url}
              className={cn(
                'font-bold hover:text-primary/80 transition-colors px-1 focus:outline-none focus-visible:ring-2 rounded',
                router.pathname && baseRoute !== link.url
                  ? 'text-white focus-visible:ring-primary'
                  : 'text-primary focus-visible:ring-white'
              )}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavbarItem;

const links = [
  { name: 'Home', url: '/' },
  { name: 'TV', url: '/tv' },
  { name: 'Movies', url: '/movie' },
  { name: 'Anime', url: '/anime' },
];
