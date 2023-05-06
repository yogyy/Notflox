import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import Image from 'next/image';
import * as React from 'react';
import RootLayout from '@/components/layouts/layout';
import { useProfileStore } from '../../atoms/modalAtom';
import 'react-toastify/dist/ReactToastify.css';
interface UserCardProps {
  name: string;
  imeg: string;
}

export const UserCard: React.FC<UserCardProps> = ({ name, imeg }) => {
  const nonsessionProfile = useProfileStore((state: any) => state.imaged);

  return (
    <div className="group flex-row w-44 mx-auto">
      <div className="relative rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer  overflow-hidden">
        <Image
          width={170}
          height={170}
          draggable={false}
          className=""
          src={imeg ? imeg : nonsessionProfile}
          alt="profile"
        />
      </div>
      <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
        {name || 'Anonymous'}
      </div>
      <p></p>
    </div>
  );
};

const App = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const selectProfile = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <RootLayout title={`${session?.user ? session?.user.name : 'Anonymous'}`}>
      <div className="h-screen">
        <div className="flex items-center  justify-center  pt-20">
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-6xl text-white text-center">
              Who&#39;s watching?
            </h1>
            <div className="flex items-center justify-center gap-8 mt-10">
              <div onClick={() => selectProfile()}>
                <UserCard
                  name={session?.user?.name!}
                  imeg={session?.user?.image!}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default App;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getSession(ctx);

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
};
