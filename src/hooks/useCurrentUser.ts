import fetcher from '@/pages/api/fetcher';
import useSWR from 'swr';

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);

  return { data, error, isLoading, mutate };
};

export default useCurrentUser;
