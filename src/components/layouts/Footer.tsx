import Link from 'next/link';
import { Netflix } from '../icons';

const date = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-ireng transition-colors">
      <hr className="md:mb-6 pt-4 sm:mx-auto border-gray-700" />
      <div className="p-2.5 md:p-4 max-w-7xl mx-auto relative">
        <div className="flex flex-col justify-center mb-4 sm:flex-row sm:justify-between">
          <Netflix />
        </div>
        <div className="flex gap-6 flex-row justify-between text-gray-400 items-center">
          <span className="flex gap-3 text-sm font-semibold">
            © {date} yogyy.
          </span>
          <Link
            className="hover:text-gray-600 dark:hover:text-gray-200 font-semibold"
            href="https://github.com/yogyy/Netflix-Movie-App"
            title="source code"
            target="_blank">
            Github
          </Link>
        </div>
      </div>
    </footer>
  );
}
