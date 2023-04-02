import { NextPageContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import useCurrentUser from '@/hooks/useCurrentUser';
import Image from 'next/image';
import MovieList from '@/components/MovieList';
import useFavorites from '@/hooks/useFavorites';
import * as React from 'react';

const images = [
  '/images/default-blue.png',
  '/images/default-red.png',
  '/images/default-slate.png',
  '/images/default-green.png',
];

interface UserCardProps {
  name: string;
  imeg: string;
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
    props: {},
  };
}

const UserCard: React.FC<UserCardProps> = ({ name, imeg }) => {
  const imgSrc = images[Math.floor(Math.random() * 4)];
  // const imgSrc = '/images/default-slate.png';
  const { data: favorites = [] } = useFavorites();

  return (
    <React.Fragment>
      <div className="group flex-row w-44 mx-auto">
        <div className="relative w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
          <Image
            fill
            draggable={false}
            className="w-max h-max object-contain"
            src={imeg ? imeg : imgSrc}
            alt="profile"
          />
        </div>
        <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
          {name}
        </div>
      </div>
      <MovieList data={favorites} title="my fav" />
    </React.Fragment>
  );
};

const App = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();

  const selectProfile = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who&#39;s watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={() => selectProfile()}>
            <UserCard name={currentUser?.name} imeg={currentUser?.image} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
