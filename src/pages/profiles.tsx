import Link from "next/link";
import Image from "next/image";
import { useAtom } from "jotai";
import { nonUser } from "~/atoms/jotaiAtoms";
import { useSession } from "next-auth/react";
import { HeadMetaData } from "@/components/head-meta";
import { Header } from "@/components/layouts/header";

const Profiles = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [userPic] = useAtom(nonUser);
  return (
    <>
      <HeadMetaData title={`${user ? user.name : "Anonymous"}`} />
      <Header />
      <main className="h-screen bg-gradient-to-b from-ireng to-black">
        <div className="grid h-[calc(100vh_-_145px)] place-content-center">
          <div className="flex flex-col">
            <h1 className="text-center text-3xl text-white md:text-6xl">
              Who&#39;s watching?
            </h1>
            <Link
              href="/"
              className="group mx-auto mt-10 w-full flex-col px-10"
            >
              <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-md border-2 border-transparent group-hover:cursor-pointer">
                <Image
                  width={170}
                  height={170}
                  draggable={false}
                  className="w-32 md:w-44"
                  src={user?.picture || user?.image || userPic}
                  alt="profile"
                />
                <p className="mt-4 text-center text-[clamp(16px,10vw,_2rem)] text-gray-400 group-hover:text-white">
                  {user?.name || "Anonymous"}
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
