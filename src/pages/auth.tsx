import Head from "next/head";
import { auth } from "~/auth";
import Image from "next/image";
import * as React from "react";
import { GetServerSidePropsContext } from "next";
import { HeadMetaData } from "@/components/head-meta";
import { LoginForm } from "@/components/auth/login-form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Toaster } from "@/components/ui/toaster";

const Auth = () => {
  return (
    <>
      <HeadMetaData />
      <Head>
        <title>Login</title>
      </Head>
      <div className="relative w-full">
        <div className="relative flex h-dvh w-full items-center justify-center bg-black max-[400px]:justify-start md:bg-black/70">
          <Image
            src="/images/auth-background.webp"
            alt="background"
            width={1920}
            height={1080}
            className="absolute z-[-1] hidden h-full w-full object-cover md:block lg:bg-cover"
            priority
          />
          <CardWrapper>
            <LoginForm />
          </CardWrapper>
        </div>
      </div>
      <Toaster />
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
