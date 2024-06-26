import Head from "next/head";
import { auth } from "~/auth";
import Image from "next/image";
import * as React from "react";
import { GetServerSidePropsContext } from "next";
import { HeadMetaData } from "@/components/head-meta";
import { LoginForm } from "@/components/auth/login-form";
import { CardWrapper } from "@/components/auth/card-wrapper";

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
            src="https://res.cloudinary.com/dpegakmzh/image/upload/v1711799337/notflox/auth-background_wx9vbo.webp"
            alt="background"
            fill
            className="absolute z-[-1] hidden h-full w-full object-cover md:block lg:bg-cover"
            priority
          />
          <CardWrapper>
            <LoginForm />
          </CardWrapper>
        </div>
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
