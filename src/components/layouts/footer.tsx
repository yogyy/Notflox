import Link from "next/link";
import { Github } from "../icons";

const date = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer className="bg-ireng transition-colors">
      <hr className="border-gray-700 pt-4 sm:mx-auto md:mb-6" />
      <div className="relative mx-auto max-w-7xl p-2.5 md:p-4">
        <div className="flex flex-row items-center justify-between gap-6 text-gray-400">
          <span className="flex items-center gap-3 text-sm font-medium">
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
            <Github className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </footer>
  );
};
