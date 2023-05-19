import { API_KEY } from '@/utils/request';
import axios from 'axios';
import { Genre, Movie, Network, ProductionCompany } from '../../../typing';
import * as React from 'react';
import RootLayout from '@/components/layouts/layout';
import Image from 'next/image';
import { baseUrl } from '../../../constants/movie';
import Recomend from '@/components/netflix1/recomend';
import { tanggal } from '@/lib/getDate';
import { Paginate } from '@/components/Paginate';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import router from 'next/router';
import { useSession } from 'next-auth/react';
import LoaderBlock from '@/components/loader/loaderblock';
import ModalVid from '@/components/netflix1/ModalVid';
import { useAtom } from 'jotai';
import { modalState, movieState } from '../../../atoms/jotaiAtoms';

interface TvProps {
  tv: Movie;
  networks: Network[];
  genres: Genre[];
  productions: ProductionCompany[];
}
interface KW {
  id: number;
  name: string;
}

export default function TvDetails({ tv }: TvProps) {
  const [currentMovie, setCurrentMovie] = useAtom(movieState);
  const [showModal, setShowModal] = useAtom(modalState);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postPerPage, setpostPerPage] = React.useState(6);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const { data: session } = useSession();

  const { data: similarTVShows, isLoading: isLoadingsimilarTVShows } = useQuery(
    ['similarTv', tv.id],
    () => axios.get(`/api/tv/recommend/${tv.id}`).then(res => res.data.results)
  );

  const { data: dataKeywords, isLoading: isLoadingKeywords } = useQuery(
    ['keywordsTv', tv.id],
    () => axios.get(`/api/tv/keyword/${tv.id}`).then(res => res.data.results)
  );
  const similarPaginate = similarTVShows?.slice(firstPostIndex, lastPostIndex);

  React.useEffect(() => {
    if (session === null) {
      router.push('/auth');
    }
  }, [session]);

  React.useEffect(() => {
    setShowModal(false);
    setCurrentPage(1);
  }, [tv.id]);

  return (
    <RootLayout title={tv?.name!}>
      {session ? (
        <>
          <div className="relative w-screen h-[56.25vw] object-cover brightness-50 xl:w-screen">
            <span className="absolute top-[14%] left-[20%] text-3xl font-mono z-10">
              {tv?.tagline}
            </span>
            {tv?.backdrop_path !== null ? (
              <Image
                src={`${baseUrl}${tv?.backdrop_path || ''}`}
                className="bg-black/25"
                fill
                alt={`banner ${tv?.name}`}
                priority
                draggable={false}
              />
            ) : (
              <div className="bg-[#121212]"></div>
            )}
            <div className="absolute bg-gradient-to-b from-transparent h-full to-[#5f5f5f] bottom-0 w-full" />
          </div>
          <div className="relative bg-gradient-to-b from-[#5f5f5f]/20 to-[#121212]/20 md:bg-none mx-auto md:justify-center items-center md:items-start md:-mt-[20%] lg:-mt-[40%] flex gap-5 flex-col md:flex-row px-5 pt-4 max-w-[1200px]">
            <div className="relative h-full gap-3 md:flex md:flex-col">
              <div className="relative w-[165px] h-[255px] -mt-32 rounded md:mt-0 ">
                <Image
                  src={`https://image.tmdb.org/t/p/w342/${tv?.poster_path}`}
                  className="flex object-cover rounded-sm md:rounded"
                  fill
                  sizes="auto"
                  alt={`Thumbnail ${tv?.name}`}
                  draggable={false}
                />
              </div>
              <div className="flex w-full gap-3 mt-3 text-sm md:flex-col">
                <Link
                  target="_blank"
                  href={tv.homepage}
                  title={`To ${tv.name} Homepage`}
                  className="flex items-center transition-colors duration-300 group justify-center md:justify-between px-3 py-1.5 w-full hover:font-semibold text-gray-300 border rounded hover:shadow-red-600 shadow-sm hover:bg-[#121212]/20 bg-black/25 hover:border-red-600"
                >
                  <span className="hidden md:block">Homepage&nbsp;</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 text-gray-300 transition-colors duration-300 group-hover:text-red-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                      clipRule="evenodd"
                    />
                  </svg>

                  {/* <HomeIcon className="w-5 text-gray-300 transition-colors duration-300 group-hover:text-red-600" /> */}
                </Link>
                <button
                  className="flex items-center transition-colors duration-300 group justify-center md:justify-between px-3 py-1.5 w-full hover:font-semibold text-gray-300 border rounded hover:shadow-red-600 shadow-sm hover:bg-[#121212]/20 bg-black/25 hover:border-red-600"
                  onClick={() => {
                    setCurrentMovie(tv);
                    setShowModal(true);
                  }}
                  title={`Play ${tv.name} Trailer`}
                >
                  <span className="hidden md:block">Trailer&nbsp;</span>
                  {/* <PlayIcon className="w-5 text-gray-300 transition-colors duration-300 group-hover:text-red-600" /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 text-gray-300 transition-colors duration-300 group-hover:text-red-600"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="w-full md:w-7/12">
              <h1 className="text-xl font-semibold text-red-600">
                {tv?.name}&nbsp;
                <span className="text-gray-300">
                  ({tv?.first_air_date?.slice(0, 4)})
                </span>
              </h1>
              <h2 className="text-gray-500 text-">{tv?.original_name}</h2>
              <p className="text-sm text-gray-400 lg:text-base">
                {tv?.overview}
              </p>
              <hr className="my-2 border-zinc-800" />
              <div className="text-sm text-gray-300">
                <p>
                  Aired : {tanggal(tv?.first_air_date)}
                  &nbsp; to {tanggal(tv?.last_air_date || '?')}
                </p>
                <p>Status : {tv?.status}</p>
                <div className="text-gray-300">
                  <p>
                    Genre :&nbsp;
                    <span className="text-red-300">
                      {tv?.genres.map((genre: Genre) => genre.name).join(', ')}
                    </span>
                  </p>
                </div>
                <p className="text-gray-300">
                  <span className="">Rating :&nbsp;</span>
                  {tv?.vote_average.toFixed(1)} / 10
                </p>
                <div className="text-sm text-gray-300">
                  <p>
                    Studio :&nbsp;
                    {tv?.production_companies
                      .map((studio: ProductionCompany) => studio.name)
                      .join(', ')}
                  </p>
                </div>
              </div>
              <hr className="mt-2 mb-12 border-zinc-800" />
            </div>
          </div>
          <div className="space-y-12 md:space-y-10 mx-auto relative max-w-[1300px]">
            {isLoadingKeywords ? (
              <div className="flex flex-wrap items-center gap-2 py-2 mx-3 mt-5 xl:mb-52">
                <h1 id="similar-tv-container" className="px-3">
                  Keywords :
                </h1>
                {[...Array(12)].map((_, index) => (
                  <div
                    key={index}
                    className="relative w-20 h-5 bg-white/5 animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap items-center py-2 mt-5 xl:mb-52">
                <h1 id="similar-tv-container" className="px-3">
                  Keywords :
                </h1>
                {dataKeywords?.map((keyword: KW) => (
                  <p
                    key={keyword.id}
                    className="px-2 m-1 text-gray-300 rounded-md cursor-default bg-white/5 w-max hover:bg-white/10 hover:text-gray-200"
                  >
                    {keyword.name}
                  </p>
                ))}
              </div>
            )}
            {similarTVShows?.length !== 0 ? (
              <>
                {isLoadingsimilarTVShows ? (
                  <div className="flex-col mx-4 mt-1 frounded-sm">
                    <p className="text-xl font-semibold text-[#fcfbfb]">
                      Recommendations
                    </p>
                    <div className="w-32 h-4 bg-[#1c1c1c] animate-pulse mb-3 mt-2"></div>
                    <div className="flex">
                      <div className="relative aspect-[9/14] h-[150px] md:h-[249px] w-24 md:w-40 bg-[#1c1c1c] rounded mr-3 animate-pulse"></div>
                      <div className="w-full">
                        <div className="w-full h-4 bg-[#1c1c1c] animate-pulse mb-3"></div>
                        <div className="w-full h-4 bg-[#1c1c1c] animate-pulse mb-3"></div>
                        <div className="w-5/6 h-4 bg-[#1c1c1c] animate-pulse mb-3"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="">
                    <Recomend
                      className=""
                      title="Recommendations"
                      movies={similarPaginate}
                    />
                    <Paginate
                      currentPage={currentPage}
                      postPerPage={postPerPage}
                      setCurrentPage={setCurrentPage}
                      totalPost={similarTVShows?.length}
                    />
                  </div>
                )}
              </>
            ) : (
              <div>
                <h1 className="px-3 text-1xl">Recommendations not available</h1>
              </div>
            )}
          </div>
        </>
      ) : (
        <LoaderBlock />
      )}
      {showModal && <ModalVid showDetail={false} />}
    </RootLayout>
  );
}

export async function getServerSideProps({ params }: any) {
  const tvId = Number(params.tvId);

  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${tvId}?api_key=${API_KEY}`
    );

    return {
      props: {
        tv: data,
      },
    };
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return {
        notFound: true,
      };
    }
  }
}
