import Navbar from '@/components/navbar';
import Banner from '@/components/netflix1/Banner';
import { RowLanscape } from '@/components/netflix1/RowToPage';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import * as React from 'react';

interface AnimeP {
  animeId: string;
  animeTitle: string;
  animeImg: string;
  latestEp: string;
  episodeNum: number;
  animeUrl: string;
  genres: string[];
}

const AnimeHome = () => {
  const [anime, setAnime] = React.useState<AnimeP[]>([]);
  const [animeBaru, setAnimeBaru] = React.useState<AnimeP[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          'https://gogoanime.consumet.stream/top-airing'
        );
        setAnime(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          'https://gogoanime.consumet.stream/recent-release'
        );
        setAnimeBaru(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Netflix Clone</title>
      </Head>
      <Navbar />
      <div className="main pt-20 flex justify-center">
        <main>
          {/* <Banner netflixOriginals={anime} /> */}
          <section className="relative flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 w-max gap-3">
              {animeBaru.map(animeItem => (
                <div
                  key={animeItem.animeId}
                  onClick={() => console.log(animeItem)}
                >
                  <div className="relative aspect-[9/14] w-[164px] h-full">
                    <div className="absolute bottom-2 z-[7] w-[164px]">
                      <h2 className="flex text-gray-300 justify-center items-center text-center font-semibold ">
                        {animeItem.animeTitle || ''}
                      </h2>
                    </div>
                    <Image
                      src={animeItem.animeImg}
                      className="object-cover rounded z-[-1]"
                      fill
                      sizes="100%"
                      alt={animeItem.animeTitle}
                      draggable={false}
                      onClick={() => console.log(animeItem)}
                    />
                    <span className="bg-gradient-to-t from-black to-transparent absolute h-full w-full bottom-0 z-[1] rounded-sm"></span>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 w-max gap-3 mt-3">
            {anime.map(animeItem => (
              <div key={animeItem.animeId}>
                <div className="relative aspect-[9/14] w-[164px] h-full bg-zinc-900 rounded">
                  <h2 className="absolute bottom-2 text-gray-300 text-center font-semibold z-[7]">
                    {animeItem.animeTitle || ''}
                  </h2>
                  <div className="bg-gradient-to-t from-black to-transparent absolute h-full w-full bottom-0 z-[6]"></div>
                  <Image
                    src={animeItem.animeImg}
                    className="rounded-sm object-cover md:rounded z-[5]"
                    fill
                    sizes="100%"
                    alt={animeItem.animeTitle}
                    draggable={false}
                    onClick={() => console.log(animeItem)}
                  />
                </div>
                {/* <p>Latest Episode: {animeItem.latestEp}</p>
                  <p>Genres: {animeItem.genres.join(', ')}</p> */}
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default AnimeHome;
