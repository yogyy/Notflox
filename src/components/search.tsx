import * as React from "react";
import { toast } from "sonner";
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
import { useDebounce } from "@/hooks/use-debounce";
import { MovieIcon, SearchIcon, SeriesIcon } from "./icons/general";

export const Search = () => {
  const [query, setQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<Movie[]>([]);
  const [open, setOpen] = React.useState(false);
  const encodedQuery = encodeURIComponent(query);
  const debouncedQuery = useDebounce<string>(encodedQuery, 500);
  const { data: session } = useSession();

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
        console.log(error);
        toast.error(`${error.code}`, {
          description: `${error.message}`,
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
          className="hover:text-primary-foreground relative inline-flex items-center justify-start rounded-md border border-accent bg-transparent px-2 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 sm:pr-12 md:w-40 lg:w-52"
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
              <SearchIcon />
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
                              <MovieIcon />
                            ) : (
                              <SeriesIcon />
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
