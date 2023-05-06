import * as React from 'react';
import { getSession, signIn } from 'next-auth/react';
import { Github, Google, Netflix } from '@/components/icons';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = () => {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [variant, setVariant] = React.useState('login');
  const [disabled, setDisabled] = React.useState(false);

  const router = useRouter();

  const toggleVariant = React.useCallback(() => {
    setVariant(currentVariant =>
      currentVariant === 'login' ? 'register' : 'login'
    );
  }, []);

  const login = React.useCallback(async () => {
    const res = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false,
      callbackUrl: '/profiles',
    });

    console.log(res);
    if (res?.error === null) {
      router.push('/profiles');
    } else if (email === '' && password === '') {
      toast.error('Email and password required');
    } else {
      toast.error(`${res?.error}`);
    }
  }, [email, password]);

  return (
    <>
      <Head>
        <title>Login First</title>
      </Head>
      <div className="relative h-screen w-full bg-[url('/images/hero.webp')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="bg-black h-full lg:bg-black/40">
          <nav className="px-12 py-5 flex">
            <Netflix className="h-6" />
          </nav>
          <div className="flex justify-center">
            <div className="bg-black/70 px-16 py-16 self-center mt-2 lg:max-w-md rounded-md w-full">
              <h2 className="text-white text-3xl mb-8 font-semibold">
                {variant === 'login' ? 'Sign in' : 'Create an account'}
              </h2>
              <div className="flex flex-col gap-6">
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
                      className="block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700/30 appearance-none focus:outline-none focus:ring-0 peer invalid:border-b-1"
                      required
                    />
                    <label
                      htmlFor="name"
                      className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text"
                    >
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
                    className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text"
                  >
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
                    className="block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700/30 appearance-none focus:outline-none focus:ring-0 peer invalid:border-b-1"
                    required
                  />
                  <label
                    htmlFor="password"
                    className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text"
                  >
                    Password
                  </label>
                </div>
              </div>
              <button
                disabled={variant === 'register' || disabled}
                onClick={() => {
                  setDisabled(true);
                  login();
                  setTimeout(() => {
                    setDisabled(false);
                  }, 2000);
                }}
                className={`${
                  disabled
                    ? 'cursor-not-allowed bg-red-900'
                    : 'hover:bg-red-700'
                }
                " bg-red-600 text-white rounded-md py-3 w-full mt-10  transition-colors"
                `}
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
              </div>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={true}
                closeOnClick={true}
                draggable={true}
                pauseOnHover={true}
                theme="dark"
                limit={1}
              />
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
