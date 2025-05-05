import Link from "next/link";
import Image from "next/image";
import { useAtom } from "jotai";
import { nonUser } from "~/atoms/jotaiAtoms";
import RootLayout from "@/components/layouts/layout";
import { ReactElement } from "react";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { Watchlist } from "@/db/type";
import { UserWatchlist } from "@/components/user-watchlist";

const Profiles = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [userPic] = useAtom(nonUser);

  const { data, isLoading } = useQuery<Watchlist[]>(
    ["watchlist", user?.id],
    () => fetch("/api/user/watchlist").then((res) => res.json()),
    { enabled: !!user },
  );

  return (
    <div className="relative z-[2] mx-auto mt-5 max-w-7xl space-y-7 pb-16 sm:mt-16">
      <div className="flex flex-col">
        <h1 className="text-center text-3xl text-white">Who&#39;s watching?</h1>
        <p className="text-center text-gray-400">Choose a profile to watch.</p>
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
              src={user?.image || userPic}
              alt={`${user?.name}'s picture` || "user"}
              priority
            />
          </div>
        </Link>
        <p className="mt-4 text-center text-lg font-semibold tracking-wide text-gray-400">
          {user?.name || "Anonymous"}
        </p>
      </div>

      {user && (
        <div className="mx-4">
          <h2 className="text-2xl">Your Watchlist</h2>
          {isLoading ? (
            <ul className="moviecard-container relative mt-6 grid grid-cols-2 gap-y-[4vw] min-[460px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5">
              {[...Array(8)].map((_, index) => (
                <li key={index} className="relative overflow-hidden px-[.2vw]">
                  <div className="relative aspect-poster animate-pulse rounded bg-zinc-800"></div>
                </li>
              ))}
            </ul>
          ) : (
            <UserWatchlist data={data || []} />
          )}
        </div>
      )}
    </div>
  );
};

Profiles.getLayout = function getLayout(page: ReactElement) {
  return (
    <RootLayout title="Profile" footer={false}>
      {page}
    </RootLayout>
  );
};

export default Profiles;
