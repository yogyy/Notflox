import Link from 'next/link';
import React from 'react';

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-4">
        {links.map(link => (
          <Link
            key={link.name}
            href={link.url}
            className="px-3 text-center text-white hover:underline"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;

const links = [
  { name: 'Home', url: '/' },
  { name: 'Series', url: '/series' },
  { name: 'Films', url: '/tmdb' },
  { name: 'New & Popular', url: '/' },
  { name: 'My List', url: '/' },
  // { name: 'Browse by Languages', url: '/' },
];
