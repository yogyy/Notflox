import * as React from "react";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { Movie } from "~/types/tmdb-type";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useToast } from "./ui/use-toast";
import { useDebounce } from "@/hooks/use-debounce";

export const Search = () => {
  const [query, setQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<Movie[]>([]);
  const [open, setOpen] = React.useState(false);
  const encodedQuery = encodeURIComponent(query);
  const debouncedQuery = useDebounce<string>(encodedQuery, 500);
  const { data: session } = useSession();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const searchMovies = async (title: string) => {
    if (title.trim() === "") {
      setSearchResults([]);
      return;
    }
    if (title.length >= 1) {
      try {
        const response = await axios.get(`/api/search/${title}`);
        setSearchResults(response.data);
      } catch (err) {
        const error = err as AxiosError<Error>;
        toast({
          title: `${error.message}`,
          description: `${error.response?.statusText}`,
          variant: "destructive",
        });
      }
    } else {
      setSearchResults([]);
    }
  };

  React.useEffect(() => {
    searchMovies(debouncedQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          disabled={!session}
          className="hover:text-primary-foreground relative inline-flex items-center justify-start rounded-md border border-accent bg-transparent px-2 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary/40 focus-visible:bg-primary/40 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 sm:pr-12 md:w-40 lg:w-52"
        >
          <span className="hidden lg:inline-flex">Search movie...</span>
          <span className="inline-flex lg:hidden">Search...</span>
          <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border-accent bg-transparent px-1 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="inline-flex items-center text-xs">⌘</span>K
          </kbd>
        </DialogTrigger>
        <DialogContent className="border-none bg-black/90 p-2 data-[state=closed]:zoom-out-75">
          <DialogHeader>
            <DialogTitle className="flex items-center border-b border-accent-foreground p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search movie..."
                value={query}
                onChange={handleInputChange}
                className="w-full rounded bg-transparent px-3 py-1 outline-none transition-all"
              />
            </DialogTitle>
            <DialogDescription asChild>
              <div className="h-full overflow-y-auto transition-transform">
                {query.length >= 1 && (
                  <ul className="flex flex-col ">
                    {searchResults.map((result) => (
                      <li key={result.id}>
                        <Link
                          onClick={() => {
                            setOpen(!open);
                          }}
                          href={`/${
                            result.media_type == "movie" ? "movie" : "tv"
                          }/${result.id}`}
                          className={cn(
                            "flex w-full justify-between px-2 py-2 outline-none",
                            "transition-colors duration-300 hover:bg-black/60",
                            "group items-center focus:bg-black/60",
                          )}
                        >
                          <div className="flex items-start gap-2 font-semibold text-gray-400">
                            <p className="text-start">
                              <span className="transition-colors duration-300 group-hover:text-red-600 group-focus:text-red-600">
                                {result.title || result.name}
                              </span>
                              <span className="ml-1">
                                {result.release_date && (
                                  <>({result.release_date.slice(0, 4)})</>
                                )}
                                {result.first_air_date && (
                                  <>({result.first_air_date.slice(0, 4)})</>
                                )}
                              </span>
                            </p>
                          </div>
                          <span>
                            {result.media_type === "movie" ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 text-gray-200 transition-colors duration-300 group-hover:text-red-600 group-focus:text-red-600"
                                aria-label="movie"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 text-gray-200 transition-colors duration-300 group-hover:text-red-600 group-focus:text-red-600"
                                aria-label="series"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z"
                                />
                              </svg>
                            )}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
