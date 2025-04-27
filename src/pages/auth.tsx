import Head from "next/head";
import { auth } from "~/auth";
import Image from "next/image";
import { GetServerSidePropsContext } from "next";
import { HeadMetaData } from "@/components/head-meta";
import { LoginForm } from "@/components/auth/login-form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Netflix } from "@/components/icons";

const Auth = () => {
  return (
    <>
      <HeadMetaData />
      <Head>
        <title>Login | NOTFLOX</title>
      </Head>
      <div className="relative w-full">
        <Image
          src="https://res.cloudinary.com/dpegakmzh/image/upload/v1711799337/notflox/auth-background_wx9vbo.webp"
          alt="background"
          fill
          className="absolute z-[-10] hidden h-full w-full object-cover md:block lg:bg-cover"
          priority
        />
        <div className="relative flex h-svh w-full justify-center bg-black pt-20 max-[400px]:justify-start sm:items-center sm:pt-0 md:bg-black/70">
          <div className="fixed left-0 top-0 w-full py-6 sm:px-8">
            <div className=" m-auto xl:max-w-[calc(83.3333%-6rem)]">
              <div className="ml-4 mt-2">
                <Netflix className="h-6 w-20 md:h-10 md:w-32" />
              </div>
            </div>
          </div>
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
