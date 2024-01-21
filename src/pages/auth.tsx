import Head from "next/head";
import Link from "next/link";
import { auth } from "~/auth";
import Image from "next/image";
import * as React from "react";
import { Netflix } from "@/components/icons";
import { GetServerSidePropsContext } from "next";
import { Toaster } from "@/components/ui/toaster";
import { LoginForm } from "@/components/auth";
import { HeadMetaData } from "@/components/layouts/head-meta";

const Auth = () => {
  return (
    <>
      <HeadMetaData />
      <Head>
        <title>Login</title>
      </Head>
      <div className="relative w-full">
        <div className="relative grid h-dvh w-full place-content-center bg-black md:bg-black/70">
          <Image
            src="/images/auth-background.webp"
            alt="background"
            width={1920}
            height={1080}
            className="absolute z-[-1] hidden h-full w-full object-cover md:block lg:bg-cover"
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
        destination: "/profiles",
        permanent: false,
      },
    };
  }

  return {
    props: { user: session },
  };
}
