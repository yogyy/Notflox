import clsx from 'clsx';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-base-100 transition-colors">
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="pb-4 layout relative ml-5">
        <div className="">
          <div className="mb-4 flex flex-col justify-center sm:flex-row sm:justify-between">
            <span className="self-center mb-4 text-2xl font-semibold whitespace-nowrap dark:text-white">
              yogyy
            </span>
          </div>
        </div>
        <div className="flex flex-col-reverse justify-center place-items-center gap-6 md:flex-row md:justify-between">
          <span className="text-sm font-semibold sm:text-center gap-3 flex text-gray-400">
            © 2023.
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
