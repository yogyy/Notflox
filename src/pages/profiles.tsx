import Link from "next/link";
import Image from "next/image";
import { useAtom } from "jotai";
import { nonUser } from "~/atoms/jotaiAtoms";
import { useSession } from "next-auth/react";
import RootLayout from "@/components/layouts/layout";
import { ReactElement } from "react";

const Profiles = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [userPic] = useAtom(nonUser);

  return (
    <>
      <div className="grid h-[calc(100vh_-_145px)] place-content-center">
        <div className="flex flex-col">
          <h1 className="text-center text-3xl text-white">
            Who&#39;s watching?
          </h1>
          <p className="text-center text-gray-400">
            Choose a profile to watch.
          </p>
          <Link
            href="/"
            className="group mx-auto mt-10 w-fit flex-col overflow-hidden rounded-lg ring-2 ring-transparent transition duration-300 ease-out hover:ring-gray-200"
          >
            <div className="relative flex flex-col items-center justify-center overflow-hidden  border border-transparent group-hover:cursor-pointer">
              <Image
                width={170}
                height={170}
                unoptimized
                draggable={false}
                className="w-32 md:w-44"
                src={user?.picture || userPic}
                alt="user's profile"
                priority
              />
            </div>
          </Link>
          <p className="mt-4 text-center text-lg font-semibold text-gray-400">
            {user?.name || "Anonymous"}
          </p>
        </div>
      </div>
    </>
  );
};

Profiles.getLayout = function getLayout(page: ReactElement) {
  console.log(page.props);
  return (
    <RootLayout title="Profile" footer={false}>
      {page}
    </RootLayout>
  );
};

export default Profiles;
