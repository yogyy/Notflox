import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";

interface NavbarItemProps extends React.ComponentProps<"div"> {}
export const NavbarItem = ({ className, ...props }: NavbarItemProps) => {
  const router = useRouter();
  const arrOfRoute = router.route.split("/");
  const baseRoute = "/" + arrOfRoute[1];

  return (
    <div className={cn("font-semibold", className)} {...props}>
      <ul className="flex flex-col items-start gap-3 sm:flex-row">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.url}
              className={cn(
                "rounded px-1 font-bold transition-colors hover:text-primary/80 focus:outline-none focus-visible:ring-2",
                router.pathname && baseRoute !== link.url
                  ? "text-white focus-visible:ring-primary"
                  : "text-primary focus-visible:ring-white",
              )}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const links = [
  { name: "Home", url: "/" },
  { name: "TV", url: "/tv" },
  { name: "Movies", url: "/movie" },
  { name: "Anime", url: "/anime" },
];
