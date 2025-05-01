import { cn } from "@/lib/utils";
import { SearchIcon } from "./icons/general";
import { useQueryState } from "nuqs";
import { ChangeEvent, useEffect, useRef } from "react";
import { useRouter } from "next/router";

export const SearchInput = () => {
  const [query, setQuery] = useQueryState("q");
  const { push, pathname } = useRouter();

  const searchRef = useRef<HTMLInputElement>(null);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value, { shallow: true });
  };

  useEffect(() => {
    if (pathname === "/search") {
      searchRef.current?.focus();
    }

    if (query && query.length > 0 && pathname !== "/search") {
      push("/search?q=" + query, undefined, { shallow: true });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, pathname]);

  return (
    <button
      onClick={() => searchRef.current?.focus()}
      className={cn(
        "hover:text-primary-foreground group relative inline-flex items-center justify-start rounded-sm border border-transparent bg-transparent px-1 py-1 text-sm font-medium text-white shadow-sm transition-colors focus-within:border-accent hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        query?.length! >= 1 && "border-accent",
      )}
      aria-label="search by title"
    >
      <SearchIcon className="h-6 w-6" />
      <input
        type="text"
        ref={searchRef}
        placeholder="Title"
        value={query || ""}
        onChange={handleInputChange}
        className={cn(
          "hidden w-full rounded bg-transparent px-3 py-1 outline-none transition duration-300 group-focus-within:block",
          query?.length! >= 1 ? "block" : "hidden",
        )}
      />
    </button>
  );
};
