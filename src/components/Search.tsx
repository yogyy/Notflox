import * as React from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { toast, ToastContainer } from 'react-toastify';
import {
  FilmIcon,
  MagnifyingGlassIcon,
  TvIcon,
} from '@heroicons/react/24/outline';
import { Movie } from '~/typing';
import 'react-toastify/dist/ReactToastify.css';
import { useDebounce } from '@/hooks/useDebounce';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/UI/dialog';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Search = () => {
  const [query, setQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<Movie[]>([]);
  const [open, setOpen] = React.useState(false);
  const { data: session } = useSession();
  const encodedQuery = encodeURIComponent(query);
  const debouncedQuery = useDebounce<string>(encodedQuery, 700);
  const router = useRouter();
  function openModal() {
    setOpen(open => !open);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const searchMovies = async (query: string) => {
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    if (query.length >= 1) {
      try {
        const response = await axios.get(`/api/search/${encodedQuery}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  React.useEffect(() => {
    if (debouncedQuery) {
      searchMovies(debouncedQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (session !== null) {
          setOpen(open => !open);
          setSearchResults([]);
        } else {
          error();
        }
      }
    };

    document.addEventListener('keydown', down);

    return () => document.removeEventListener('keydown', down);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const error = () =>
    toast.warn(`Must Login to access this`, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          disabled={!session}
          onClick={session ? openModal : error}
          className="relative inline-flex items-center justify-start px-2 py-1.5 text-sm font-medium text-white transition-colors bg-transparent border rounded-md shadow-sm focus-visible:outline-none focus-visible:bg-accent/40 disabled:pointer-events-none disabled:opacity-50 border-accent hover:bg-accent/40 hover:text-accent-foreground sm:pr-12 md:w-40 lg:w-52">
          <span className="hidden lg:inline-flex">Search movie...</span>
          <span className="inline-flex lg:hidden">Search...</span>
          <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border-accent bg-transparent px-1 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="inline-flex items-center text-xs">⌘</span>K
          </kbd>
        </DialogTrigger>
        <DialogContent className="p-2 border-none bg-black/90 data-[state=closed]:zoom-out-50">
          <DialogHeader>
            <DialogTitle>
              <div
                className={cn('flex items-center p-3 border-b border-black')}>
                <MagnifyingGlassIcon className="w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search movie.."
                  value={query}
                  onChange={handleInputChange}
                  className={cn(
                    'bg-transparent',
                    'px-3 py-1 transition-all w-full rounded outline-none'
                  )}
                />
              </div>
            </DialogTitle>
            <DialogDescription asChild>
              <div className="h-full overflow-y-auto transition-transform">
                {query.length >= 1 && (
                  <ul className="flex flex-col ">
                    {searchResults.map(result => (
                      <li key={result.id}>
                        <Link
                          onClick={() => {
                            setOpen(!open);
                            setSearchResults([]);
                            // router.push(
                            //   `/${
                            //     result.media_type == 'movie' ? 'movie' : 'tv'
                            //   }/${result.id}`
                            // ); <== using button
                          }}
                          href={`/${
                            result.media_type == 'movie' ? 'movie' : 'tv'
                          }/${result.id}`}
                          className={cn(
                            'w-full px-2 py-2 flex justify-between outline-none',
                            'hover:bg-black/60 transition-colors duration-300',
                            'focus:bg-black/60 group items-center'
                          )}>
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
                            {result.media_type === 'movie' ? (
                              <FilmIcon
                                className="w-4 text-gray-200 transition-colors duration-300 group-hover:text-red-600 group-focus:text-red-600"
                                title="movie"
                              />
                            ) : (
                              <TvIcon
                                className="w-4 text-gray-200 transition-colors duration-300 group-hover:text-red-600 group-focus:text-red-600"
                                title="series"
                              />
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
        {/* <ToastContainer limit={1} /> */}
      </Dialog>
    </>
  );
};

export default Search;
