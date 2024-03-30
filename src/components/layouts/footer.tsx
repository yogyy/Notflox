import Link from "next/link";
import { Netflix } from "../icons";

const date = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer className="bg-ireng transition-colors">
      <hr className="border-gray-700 pt-4 sm:mx-auto md:mb-6" />
      <div className="relative mx-auto max-w-7xl p-2.5 md:p-4">
        <div className="mb-4 flex flex-col justify-center sm:flex-row sm:justify-between">
          <Netflix className="-ml-2" />
        </div>
        <div className="flex flex-row items-center justify-between gap-6 text-gray-400">
          <span className="flex gap-3 text-sm font-semibold">
            © {date}{" "}
            <Link href="https://github.com/yogyy" target="_blank">
              yogyy .
            </Link>
          </span>
          <Link
            className="font-semibold transition-colors duration-200 hover:text-gray-600 dark:hover:text-gray-200"
            href="https://github.com/yogyy/Netflix-Movie-App"
            title="source code"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
};
