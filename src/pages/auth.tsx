import * as React from 'react';
import { getSession, signIn } from 'next-auth/react';
import { Github, Google, Netflix } from '@/components/icons';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { HeadMetaData } from '@/components/layouts/HeadMetaTag';
import { useToast } from '@/components/UI/use-toast';
import { Toaster } from '@/components/UI/toaster';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';
import { auth } from '~/auth';
import { Session } from 'next-auth';

type Variant = 'login' | 'register';

const Auth = ({ user }: Session) => {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [variant, setVariant] = React.useState<Variant>('login');
  const [disabled, setDisabled] = React.useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const toggleVariant = React.useCallback(() => {
    setVariant(currentVariant =>
      currentVariant === 'login' ? 'register' : 'login'
    );
  }, []);

  const login = async () => {
    const res = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false,
      callbackUrl: '/profiles',
    });

    if (res?.error === null) {
      router.push('/profiles');
    } else if (email === '' && password === '') {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Email and password required',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `${res?.error}`,
      });
    }
  };

  return (
    <>
      <HeadMetaData />
      <Head>
        <title>Login</title>
      </Head>
      <div className="relative w-full">
        <div className="relative grid h-[100dvh] bg-black md:bg-black/70 place-content-center">
          <Image
            src="https://res.cloudinary.com/dpegakmzh/image/upload/v1683377050/Group-3copyhero_wlchnc.webp"
            alt="background"
            width={1920}
            height={1080}
            className="absolute object-cover lg:bg-cover w-full h-full z-[-1] hidden md:block"
            loading="eager"
          />
          <nav className="absolute top-0 flex w-full px-12 py-5">
            <Link href="/profiles">
              <Netflix className="h-6" />
            </Link>
          </nav>
          <div className="h-full px-16 py-16 rounded-md sm:min-w-[480px] flex flex-col gap-3 md:gap-6 bg-black/90">
            <div className="grid place-content-center">
              <h1 className="text-3xl font-semibold text-white">
                {variant === 'login' ? 'Sign in' : 'Create an account'}
              </h1>
              {variant === 'register' && (
                <p className="text-primary place-self-end">
                  currently disabled.
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3.5">
              {variant === 'register' && (
                <div className="relative">
                  <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setName(e.target.value)
                    }
                    value={name}
                    type="text"
                    disabled={variant === 'register'}
                    id="name"
                    className="block w-full px-6 pt-6 pb-1 text-white rounded-md text-md bg-neutral-700/sh-screen focus:outline-none focus:ring-0 peer invalid:border-b-1"
                    required
                  />
                  <label
                    htmlFor="name"
                    className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text">
                    Username
                  </label>
                </div>
              )}
              <div className="relative email">
                <input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  value={variant === 'register' ? 'not@available.com' : email}
                  type="email"
                  id="email"
                  disabled={variant === 'register'}
                  className={`block rounded-md px-6 pt-6 pb-1 w-full text-md bg-neutral-700/30 appearance-none focus:outline-none focus:ring-0 peer invalid:border-b-1 ${
                    variant === 'register' ? 'text-gray-400' : ''
                  } `}
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text">
                  Email
                </label>
              </div>

              <div className="relative pass">
                <input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  value={variant === 'register' ? '' : password}
                  type="password"
                  id="password"
                  disabled={variant === 'register'}
                  className="block w-full px-6 pt-6 pb-1 text-white rounded-md appearance-none text-md bg-neutral-700/30 focus:outline-none focus:ring-0 peer invalid:border-b-1"
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text">
                  Password
                </label>
              </div>
            </div>
            <button
              disabled={
                variant === 'register' || disabled || email.length === 0
              }
              onClick={() => {
                setDisabled(true);
                login();
                setTimeout(() => {
                  setDisabled(false);
                }, 2000);
              }}
              type="button"
              className={cn(
                disabled ? 'cursor-not-allowed bg-red-900' : 'hover:bg-red-700',
                'bg-red-600 text-white rounded-md py-3 w-full  transition-colors'
              )}>
              {variant === 'login' ? 'Sign In' : 'Register'}
            </button>
            <div className="flex flex-row items-center justify-center gap-4 mt-4">
              <button
                type="button"
                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                className="flex items-center justify-center w-10 h-10 transition bg-transparent rounded-full cursor-pointer hover:brightness-50">
                <Google size="30px" />
              </button>
              <button
                type="button"
                onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                className="flex items-center justify-center w-10 h-10 transition bg-transparent rounded-full cursor-pointer hover:brightness-50">
                <Github size="30px" className="stroke-white " />
              </button>
            </div>
            <div className="flex flex-col mt-12 sm:justify-between sm:flex-row">
              <p className="text-neutral-500">
                {variant === 'login'
                  ? 'First time using Notflox?'
                  : 'Already have an account?'}
              </p>
              <button
                type="button"
                onClick={toggleVariant}
                className="inline-flex text-white cursor-pointer hover:underline">
                {variant === 'login' ? 'Create an account' : 'Login'}.
              </button>
            </div>
          </div>
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
