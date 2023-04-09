import * as React from 'react';
import { Billboard } from '@/components/Billboard';
import RootLayout from '@/components/layouts/layout';
import MovieList from '@/components/MovieList';
import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';
import useMovies from '@/hooks/useMovieList';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

export default function Home() {
  const { data: movies = [] } = useMovies();
  const { data: favorites = [] } = useFavorites();

  // React.useEffect(() => {
  //   router.push('/movies');
  // }, [router]);

  return (
    <RootLayout title={'app lama'}>
      <Billboard />
      <div className="pb-40">
        <MovieList title="trending now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </RootLayout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
