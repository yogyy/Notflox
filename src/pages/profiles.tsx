import Link from "next/link";
import Image from "next/image";
import { useAtom } from "jotai";
import { nonUser } from "~/atoms/jotaiAtoms";
import { useSession } from "next-auth/react";
import React from "react";
import { toast } from "sonner";
import RootLayout from "@/components/layouts/layout";

const Profiles = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [userPic] = useAtom(nonUser);

  return (
    <RootLayout
      title={`${user ? user.name : "Anonymous"}`}
      footer={false}
      className="h-screen bg-gradient-to-b from-ireng to-black"
    >
      <div className="grid h-[calc(100vh_-_145px)] place-content-center">
        <div className="flex flex-col">
          <h1 className="text-center text-3xl text-white">
            Who&#39;s watching?
          </h1>
          <p className="text-center text-gray-400">
            Choose a profile to watch.
          </p>
          <Link
            href="#tai"
            className="group mx-auto mt-10 w-fit flex-col overflow-hidden rounded-lg ring-2 ring-transparent transition duration-300 ease-out hover:ring-gray-200"
            onClick={() =>
              toast.success("wsg y'll", { description: "wuhan knt" })
            }
          >
            <div className="relative flex flex-col items-center justify-center overflow-hidden  border border-transparent group-hover:cursor-pointer">
              <Image
                width={170}
                height={170}
                unoptimized
                draggable={false}
                className="w-32 md:w-44"
                src={user?.picture || userPic}
                alt="profile"
              />
            </div>
          </Link>
          <p className="mt-4 text-center text-lg font-semibold text-gray-400">
            {user?.name || "Anonymous"}
          </p>
        </div>
      </div>
    </RootLayout>
  );
};

export default Profiles;
