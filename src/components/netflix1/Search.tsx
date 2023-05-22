import * as React from 'react';
import axios from 'axios';
import clsx from 'clsx';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Dialog, Transition } from '@headlessui/react';
import { toast, ToastContainer } from 'react-toastify';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Movie } from '../../../typing';
import 'react-toastify/dist/ReactToastify.css';

const Search = () => {
  const [query, setQuery] = React.useState('');
  const [showInput, setShowInput] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<Movie[]>([]);
  const [debouncedQuery, setDebouncedQuery] = React.useState('');
  const [showResults, setShowResults] = React.useState(false);
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);
  function closeModal() {
    setOpen(false);
    setShowInput(false);
  }

  function openModal() {
    setOpen(true);
    setShowInput(true);
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowResults(e.target.value.length >= 3);
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

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (session !== null) {
          openModal();
        } else {
          error();
        }
      }
    };

    document.addEventListener('keydown', down);

    return () => document.removeEventListener('keydown', down);
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
    <div className="relative flex items-end">
      <button
        onClick={session ? openModal : error}
        title="Search Title (⌘ K)"
        className="ml-4 text-gray-200 transition rounded-full cursor-pointer hover:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
      >
        <MagnifyingGlassIcon
          className={`${
            showInput ? 'rotate-90 transition delay-75' : 'transition delay-75'
          } w-6 m-1 `}
        />
      </button>
      <ToastContainer limit={1} />
      <div className="">
        {session && (
          <Dialog
            as="div"
            open={open}
            className="relative z-30"
            onClose={closeModal}
          >
            <div className="fixed inset-0 bg-black bg-opacity-60" />
            <div className="fixed inset-0 overflow-hidden">
              <div className="flex items-start justify-center min-h-full p-4 pt-10 text-center">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded bg-[#121212] text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h2"
                    className="text-lg font-medium leading-6 text-gray-300"
                  >
                    <Transition
                      show={open}
                      as={React.Fragment}
                      enter="transition-opacity duration-75"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition-opacity duration-150"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="flex items-center p-3 border-b">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <input
                          type="search"
                          placeholder="Search movie.."
                          value={query}
                          onChange={handleInputChange}
                          className={clsx(
                            'bg-transparent',
                            'px-3 py-1 transition-all w-full rounded outline-none'
                          )}
                        />
                      </div>
                    </Transition>
                  </Dialog.Title>
                  <Transition
                    show={open}
                    as={React.Fragment}
                    enter="transition-opacity duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="">
                      <div
                        className={
                          'h-full overflow-y-auto transition-transform'
                        }
                      >
                        {query.length >= 3 && (
                          <ul className="flex flex-col ">
                            {searchResults.map(result => (
                              <li
                                key={result.id}
                                onClick={() => {
                                  setSearchResults([]);
                                }}
                              >
                                <Link
                                  onClick={closeModal}
                                  href={{
                                    pathname: `/${
                                      result.media_type == 'movie'
                                        ? 'movie'
                                        : 'tv'
                                    }/${result.id}`,
                                    query: {
                                      title: `${result.name || result.title}`,
                                    },
                                  }}
                                  // href="#"
                                  className={clsx(
                                    'w-full px-2 py-2 flex justify-between outline-none',
                                    'hover:bg-black/50 transition-colors duration-200',
                                    'focus:bg-black/50 group'
                                  )}
                                >
                                  <p>
                                    <span className="transition-colors group-hover:text-red-600 group-focus:text-red-600">
                                      {result.title || result.name}
                                    </span>
                                    <span className="ml-1.5">
                                      {result.release_date && (
                                        <>({result.release_date.slice(0, 4)})</>
                                      )}
                                      {result.first_air_date && (
                                        <>
                                          ({result.first_air_date.slice(0, 4)})
                                        </>
                                      )}
                                    </span>
                                  </p>
                                  <span className="px-1 text-gray-400 rounded-md bg-white/5 h-fit">
                                    {result.media_type}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </Transition>
                </Dialog.Panel>
              </div>
            </div>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default Search;
