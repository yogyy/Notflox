import Link from 'next/link';
import Image from 'next/image';
import { useAtom } from 'jotai';
import { nonUser } from '~/atoms/jotaiAtoms';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/layouts/navbar';
import { HeadMetaData } from '@/components/layouts/head-meta';

const Profiles = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [userPic] = useAtom(nonUser);
  return (
    <>
      <HeadMetaData title={`${user ? user.name : 'Anonymous'}`} />
      <header className="sticky top-0 z-20">
        <Navbar />
      </header>
      <main className="h-screen bg-gradient-to-b from-ireng to-black">
        <div className="h-[calc(100vh_-_145px)] grid place-content-center">
          <div className="flex flex-col">
            <h1 className="text-3xl text-center text-white md:text-6xl">
              Who&#39;s watching?
            </h1>
            <Link
              href="/"
              className="flex-col w-full px-10 mx-auto mt-10 group">
              <div className="relative flex flex-col items-center justify-center overflow-hidden border-2 border-transparent rounded-md group-hover:cursor-pointer">
                <Image
                  width={170}
                  height={170}
                  draggable={false}
                  className="w-32 md:w-44"
                  src={user?.picture || user?.image || userPic}
                  alt="profile"
                />
                <p className="mt-4 text-[clamp(16px,10vw,_2rem)] text-center text-gray-400 group-hover:text-white">
                  {user?.name || 'Anonymous'}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profiles;
