import fetcher from '../lib/fetcher';
import { Movie, MovieResponse } from '~/typing';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

const useCustomQuery = (
  queryKey: QueryKey,
  url: string,
  options?: UseQueryOptions<Movie[], Error>
) => {
  return useQuery<Movie[], Error>(
    queryKey,
    async () => await fetcher<MovieResponse>(url).then(res => res.results),
    {
      ...options,
    }
  );
};

export default useCustomQuery;
