import * as React from 'react';
import axios from 'axios';
import { getSession, signIn, signOut } from 'next-auth/react';
import { Github, Google, Netflix } from '@/components/icons';
import Input from '@/components/input';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

const Auth = () => {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [variant, setVariant] = React.useState('login');

  const router = useRouter();

  const toggleVariant = React.useCallback(() => {
    setVariant(currentVariant =>
      currentVariant === 'login' ? 'register' : 'login'
    );
  }, []);

  const login = React.useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/profiles',
      });
    } catch (error) {
      console.log(error);
    }
    router.push('/profiles');
  }, [email, password, router]);

  const register = React.useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password,
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <>
      <Head>
        <title>Login First</title>
      </Head>
      <div className="relative h-screen w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="bg-black h-full lg:bg-black/40">
          <nav className="px-12 py-5 flex">
            <Link href="/">
              <Netflix className="h-6" />
            </Link>
          </nav>
          <div className="flex justify-center">
            <div className="bg-black/70 px-16 py-16 self-center mt-2 lg:max-w-md rounded-md w-full">
              <h2 className="text-white text-3xl mb-8 font-semibold">
                {variant === 'login' ? 'Sign in' : 'Create an account'}
              </h2>
              <div className="flex flex-col gap-6">
                {variant === 'register' && (
                  <Input
                    label="Username"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setName(e.target.value)
                    }
                    id="name"
                    value={name}
                  />
                )}
                <Input
                  label="Email"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  id="email"
                  type="email"
                  value={email}
                />
                <Input
                  label="Password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  id="password"
                  type="password"
                  value={password}
                />
              </div>
              <button
                onClick={variant === 'login' ? login : register}
                className="bg-red-600 text-white rounded-md py-3 w-full mt-10 hover:bg-red-700 transition-colors"
              >
                {variant === 'login' ? 'Masuk' : 'Daftar'}
              </button>
              <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                <div
                  onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-white/80 transition"
                >
                  <Google size="30px" />
                </div>
                <div
                  onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-white/80 transition"
                >
                  <Github size="30px" className="fill-black " />
                </div>
                <div onClick={() => signOut()} className="">
                  signOut
                </div>
              </div>
              <p className="text-neutral-500 mt-12">
                {variant === 'login'
                  ? 'First time using Notflox?'
                  : 'Already have an account?'}
                <span
                  onClick={toggleVariant}
                  className="text-white ml-1 hover:underline cursor-pointer"
                >
                  {variant === 'login' ? 'Create an account' : 'Login'}
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
