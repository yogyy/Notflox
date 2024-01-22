import Link from "next/link";
import { Netflix } from "../icons";

export const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="bg-ireng transition-colors">
      <hr className="border-gray-700 pt-4 sm:mx-auto md:mb-6" />
      <div className="relative mx-auto max-w-7xl p-2.5 md:p-4">
        <div className="mb-4 flex flex-col justify-center sm:flex-row sm:justify-between">
          <Netflix className="-ml-2" />
        </div>
        <div className="flex flex-row items-center justify-between gap-6 text-gray-400">
          <span className="flex gap-3 text-sm font-semibold">
            © {date} yogyy.
          </span>
          <Link
            className="font-semibold hover:text-gray-600 dark:hover:text-gray-200"
            href="https://github.com/yogyy/Netflix-Movie-App"
            title="source code"
            target="_blank"
          >
            Github
          </Link>
        </div>
      </div>
    </footer>
  );
};
