import { API_KEY } from '@/utils/request';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import * as React from 'react';
import { Movie } from '../../../typing';

const Search = () => {
  const [query, setQuery] = React.useState('');
  const [showInput, setShowInput] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<Movie[]>([]);
  const [debouncedQuery, setDebouncedQuery] = React.useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    if (newQuery === '') {
      setSearchResults([]);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    searchMovies();
  };

  const searchMovies = React.useCallback(async () => {
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    if (query.length >= 3) {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}`
      );
      setSearchResults(response.data.results);
      console.log(response.data.results);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  React.useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [query]);

  React.useEffect(() => {
    if (debouncedQuery) {
      searchMovies(debouncedQuery);
    }
  }, [debouncedQuery]);

  function handleIconClick(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void {
    setShowInput(!showInput);
  }

  return (
    <div className="flex relative">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleInputChange}
          className={showInput ? '' : 'hidden bg-transparent'}
        />
      </form>
      <ul className="absolute top-8 flex flex-col bg-black">
        {searchResults.map(result => (
          <li
            className="w-max"
            key={result.id}
            onClick={() => console.log(result)}
          >
            {result.title}
          </li>
        ))}
      </ul>
      <div
        onClick={handleIconClick}
        className="text-gray-200 ml-4 hover:text-gray-300 cursor-pointer transition focus:bg-red-600"
      >
        <MagnifyingGlassIcon className="w-6" />
      </div>
    </div>
  );
};

export default Search;
