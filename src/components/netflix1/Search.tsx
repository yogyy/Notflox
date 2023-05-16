import { API_KEY } from '@/utils/request';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import * as React from 'react';
import { Movie } from '../../../typing';
import clsx from 'clsx';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Search = () => {
  const [query, setQuery] = React.useState('');
  const [showInput, setShowInput] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<Movie[]>([]);
  const [debouncedQuery, setDebouncedQuery] = React.useState('');
  const [showResults, setShowResults] = React.useState(false);
  const { data: session } = useSession();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowResults(e.target.value.length >= 3);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const searchMovies = React.useCallback(async (query: string) => {
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    if (query.length >= 3) {
      const response = await axios.get(`/api/search/${query}`);
      setSearchResults(response.data);
      setShowResults(true);
    } else {
      setSearchResults([]);
    }
  }, []);

  React.useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 700);

    return () => {
      clearTimeout(timerId);
    };
  }, [query]);

  React.useEffect(() => {
    if (debouncedQuery) {
      searchMovies(debouncedQuery);
    }
  }, [debouncedQuery, searchMovies]);

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
    <div className="flex items-end">
      <Transition
        show={showInput}
        enter="transition-opacity duration-700"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-350"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <input
          type="search"
          placeholder="Search movie.."
          value={query}
          onChange={handleInputChange}
          onClick={() => setShowResults(true)}
          className={clsx(
            showInput ? ' bg-white/5 block' : 'bg-transparent',
            ' px-2 py-1 transition-all  rounded focus:outline-none'
          )}
        />
      </Transition>
      <button
        onClick={() => {
          session ? setShowInput(!showInput) : error();
        }}
        className="ml-4 text-gray-200 transition rounded-full cursor-pointer hover:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <MagnifyingGlassIcon
          className={`${
            showInput ? 'rotate-90 transition delay-75' : 'transition delay-75'
          } w-6 m-1 `}
        />
      </button>
      <ToastContainer limit={1} />
      <div className="absolute top-10">
        <Transition
          show={showInput}
          enter="transition-opacity duration-700"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-350"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {showInput && (
            <div className={'max-h-40 overflow-y-auto transition-transform'}>
              {query.length >= 3 && (
                <ul className="flex flex-col bg-zinc-900/80">
                  <div className=""></div>
                  {searchResults.map(result => (
                    <li
                      className="w-[245px] py-2 hover:cursor-pointer"
                      key={result.id}
                      onClick={() => {
                        setSearchResults([]);
                      }}
                    >
                      <Link
                        href={{
                          pathname: `/${
                            result.media_type == 'movie' ? 'movie' : 'tv'
                          }/${result.id}`,
                          query: { title: `${result.name || result.title}` },
                        }}
                        // href="#"

                        className="flex justify-between mx-2"
                      >
                        <span>
                          {result.title || result.name}
                          <span className="ml-1.5">
                            {result.release_date && (
                              <>({result.release_date.slice(0, 4)})</>
                            )}
                            {result.first_air_date && (
                              <>({result.first_air_date.slice(0, 4)})</>
                            )}
                          </span>
                        </span>
                        <span className="px-1 bg-gray-800 rounded-md h-fit">
                          {result.media_type}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </Transition>
      </div>
    </div>
  );
};

export default Search;
