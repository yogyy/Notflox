import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";

interface NavbarItemProps extends React.ComponentProps<"ul"> {}
export const NavbarItem = ({ className, ...props }: NavbarItemProps) => {
  const router = useRouter();
  const arrOfRoute = router.route.split("/");
  const baseRoute = "/" + arrOfRoute[1];

  return (
    <ul
      className={cn("flex flex-col items-start gap-3 sm:flex-row", className)}
      {...props}
    >
      {links.map((link) => (
        <li key={link.name} className="tracking-wider">
          <Link
            href={link.url}
            className={cn(
              "rounded px-1 font-normal transition-colors hover:text-zinc-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-100",
              router.pathname && baseRoute !== link.url
                ? "text-zinc-100/80"
                : "font-semibold text-zinc-50 hover:text-current",
            )}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const links = [
  { name: "Home", url: "/" },
  { name: "TV", url: "/tv" },
  { name: "Movies", url: "/movie" },
  { name: "Anime", url: "/anime" },
];
