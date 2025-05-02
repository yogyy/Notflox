import { AccountMenu } from "../account-menu";
import { Netflix } from "../icons";
import { NavbarItem } from "../navbar-item";
import { Notifications } from "../notification";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SearchInput } from "../search-input";
import { useEffect, useState } from "react";

export const Header = () => {
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 100) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-20">
      <nav
        className={cn(
          "flex w-full justify-center bg-ireng transition duration-300 sm:-mt-16 sm:bg-transparent",
          showBackground ? "sm:bg-ireng/90 sm:backdrop-blur-sm" : "",
        )}
      >
        <div
          className={cn(
            "mx-auto flex h-16 w-full min-w-fit max-w-7xl flex-row items-center justify-between sm:px-5",
          )}
        >
          <div className="flex items-center justify-center">
            <NavbarItem className="flex scale-90 flex-row sm:hidden" />

            <Link
              href="/"
              className="flex items-center justify-center focus:py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
              title="beranda Notflox"
            >
              <Netflix className="mt-1 hidden h-4 w-fit sm:block lg:h-7" />
            </Link>
            <NavbarItem className="ml-4 hidden flex-row sm:flex sm:gap-3 md:gap-7" />
          </div>
          <div className="relative flex items-center gap-2 md:gap-4">
            <SearchInput />
            <Notifications />
            <AccountMenu />
          </div>
        </div>
      </nav>
    </header>
  );
};
