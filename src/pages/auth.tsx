import Head from 'next/head';
import Link from 'next/link';
import { auth } from '~/auth';
import Image from 'next/image';
import * as React from 'react';
import { Session } from 'next-auth';
import { Netflix } from '@/components/icons';
import { GetServerSidePropsContext } from 'next';
import { Toaster } from '@/components/UI/toaster';
import LoginForm from '@/components/auth/login-form';
import { HeadMetaData } from '@/components/layouts/head-meta';

const Auth = ({ user }: Session) => {
  return (
    <>
      <HeadMetaData />
      <Head>
        <title>Login</title>
      </Head>
      <div className="relative w-full">
        <div className="relative grid h-[100dvh] bg-black md:bg-black/70 place-content-center w-full">
          <Image
            src="/images/auth-background.webp"
            alt="background"
            width={1920}
            height={1080}
            className="absolute object-cover lg:bg-cover w-full h-full z-[-1] hidden md:block"
            priority
          />
          <nav className="absolute top-0 flex w-full px-12 py-5">
            <Link href="/profiles">
              <Netflix className="h-6" />
            </Link>
          </nav>
          <LoginForm />
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default Auth;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await auth(context.req, context.res);

  if (session) {
    return {
      redirect: {
        destination: '/profiles',
        permanent: false,
      },
    };
  }

  return {
    props: { user: session },
  };
}
