import clsx from 'clsx';
import Link from 'next/link';
import { Netflix } from './icons';

export default function Footer() {
  return (
    <footer className="bg-base-100 transition-colors">
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="pb-4 max-w-[1300px] mx-auto ml-0 sm:ml-4 relative">
        <div className="">
          <div className="mb-4 flex flex-col justify-center sm:flex-row sm:justify-between">
            <Netflix />
          </div>
        </div>
        <div className="flex flex-col-reverse justify-center gap-6 md:flex-row md:justify-between">
          <span className="text-sm font-semibold sm:text-center gap-3 flex ml-2 text-gray-400">
            © 2023 yogyy.
            <Link
              className="hover:text-gray-600 dark:hover:text-gray-200"
              href="https://github.com/yogyy/Netflix-Movie-App"
              target="_blank"
            >
              Github
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

const links = [
  {
    href: 'https://github.com/yogyy',
    alt: 'github',
  },
  {
    href: 'https://facebook.com/iogiy',
    alt: 'facebook',
  },
  {
    href: 'https://www.linkedin.com/in/yogyy/',
    alt: 'linkedin',
  },
  {
    href: 'https://twitter.com/yogyxx',
    alt: 'twitter',
  },
];
