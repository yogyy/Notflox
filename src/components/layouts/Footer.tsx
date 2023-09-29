import Link from 'next/link';
import { Netflix } from '../icons';

const date = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-ireng transition-colors">
      <hr className="my-6 sm:mx-auto border-gray-700" />
      <div className="p-4 max-w-[1300px] mx-auto relative">
        <div className="flex flex-col justify-center mb-4 sm:flex-row sm:justify-between">
          <Netflix />
        </div>
        <div className="flex flex-col justify-center gap-6 md:flex-row md:justify-between text-gray-400">
          <span className="flex gap-3 text-sm font-semibold sm:text-center items-center">
            © {date} yogyy.
          </span>
          <Link
            className="hover:text-gray-600 dark:hover:text-gray-200"
            href="https://github.com/yogyy/Netflix-Movie-App"
            target="_blank">
            Github
          </Link>
        </div>
      </div>
    </footer>
  );
}
