import * as React from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { API_KEY } from '@/utils/request';
import axios from 'axios';
import { Movie } from '../../typing';
import fetcher from '@/pages/api/fetcher';
import useSWR from 'swr';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

function MyCombobox() {
  const [query, setQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<Movie[]>([]);
  const [debouncedQuery, setDebouncedQuery] = React.useState('');

  const { data, error } = useSWR(
    debouncedQuery.trim() === '' ? null : `/api/search/${query}`,
    fetcher
  );

  React.useEffect(() => {
    if (data) {
      console.log(data.data);
      setSearchResults(data.data);
    } else {
      setSearchResults([]);
    }
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  React.useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 700);

    return () => {
      clearTimeout(timerId);
    };
  }, [query]);

  if (error) return <div>Error fetching data</div>;

  return (
    <Combobox value={query}>
      <Combobox.Input
        onChange={handleInputChange}
        className="relative outline-none w-[150px] pt-3 pb-3 pl-10 border-solid border-[#f72727] opacity-[0.8] border transition-all duration-200 ease-in-out"
      />
      <MagnifyingGlassIcon className="w-6 absolute z-10" />
      <Transition
        as={React.Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Combobox.Options>
          {searchResults.map(person => (
            <Combobox.Option
              key={person.id}
              value={person.name || person.title}
            >
              {person.name || person.title} {person.release_date?.slice(0, 4)}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Transition>
    </Combobox>
  );
}

export default MyCombobox;
