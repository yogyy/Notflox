import MyCombobox from '@/components/input';
import React from 'react';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Anime, Movie } from '../../typing';
import { API_KEY } from '@/utils/request';
import Image from 'next/image';
import { getSession, useSession } from 'next-auth/react';
import Link from 'next/link';
import Navbar from '@/components/navbar';

async function fetchPopularAnime() {
  const res = await axios.get(
    `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&sort_by=popularity.desc&first_air_date_year=2023&with_genres=16&with_original_language=ja`
  );
  const dataAnime = await res.data.results;
  return dataAnime;
}
const Test = () => {
  const { data: session } = useSession();
  const {
    data: animecoy,
    isError,
    isLoading,
    isFetching,
    isFetched,
  } = useQuery(['animek'], fetchPopularAnime);

  return (
    <div className="">
      <div className="pb-20">
        <Navbar />
      </div>
      <p></p>

      <div className="w-full flex justify-center">
        <Link href="/test">test</Link>
        <div className="">
          <p>sesi</p>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      </div>
      <div className="bg-red-500"></div>
      <div className="">
        {session ? (
          <div className="">
            {isLoading ? (
              <div className="flex flex-col gap-2 ml-3">
                <div className="w-16 bg-zinc-500 h-4 animate-pulse"></div>
                <div className="w-1/3 bg-zinc-500 h-4 animate-pulse"></div>
              </div>
            ) : (
              <div className="">
                {animecoy?.map((movie: Movie) => (
                  <div key={movie.id} className="">
                    <div className="">
                      <div className="relative w-20 h-auto aspect-[9/14]">
                        <Image
                          src={`http://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                          className="object-cover rounded"
                          fill
                          sizes="100%"
                          alt={`Thumbnail ${movie.name}`}
                          draggable={false}
                        />
                      </div>
                      <h1>{movie.name}</h1>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <p>you must login to see the content</p>
        )}
      </div>

      {isError && (
        <div>
          <p>error coek</p>
        </div>
      )}
    </div>
  );
};

export default Test;

// export const getServerSideProps: GetServerSideProps = async ctx => {
//   const session = await getSession(ctx);
//   if (!session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       session,
//     },
//   };
// };
