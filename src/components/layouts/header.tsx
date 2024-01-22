import * as React from "react";
import AccountMenu from "../account-menu";
import { Netflix } from "../icons";
import NavbarItem from "../navbar-item";
import Notifications from "../notification";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Search } from "../search";

export const Header = () => {
  const [showBackground, setShowBackground] = React.useState(false);

  React.useEffect(() => {
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
            "mx-auto flex h-16 w-full min-w-fit max-w-7xl flex-row items-center justify-between px-5",
          )}
        >
          <div className="flex items-center justify-center">
            <Sheet>
              <SheetTrigger className="block rounded-md px-2 py-1 hover:bg-primary/10 sm:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
                  />
                </svg>
                <span className="sr-only">open drawer</span>
              </SheetTrigger>
              <SheetContent
                side="top"
                className="w-full bg-gradient-to-r from-black to-ireng"
              >
                <SheetHeader>
                  <SheetTitle className="mb-4">
                    <Netflix className="h-4" />
                  </SheetTitle>
                  <SheetDescription asChild>
                    <NavbarItem className="flex flex-col items-start gap-3" />
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
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
            <Search />
            <Notifications />
            <AccountMenu />
          </div>
        </div>
      </nav>
    </header>
  );
};
