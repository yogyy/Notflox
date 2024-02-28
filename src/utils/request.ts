import { baseUrl } from "~/constants/movie";

export const API_KEY = process.env.TMDB_API_KEY;

const requests = {
  TrendingMovies: `${baseUrl}/trending/movie/week?language=en-US&with_networks=213`,
  DiscoverMovies: `${baseUrl}/discover/tv?include_adult=false&page=1&year=2023&without_genres=10749&with_networks=213`,
  TopRatedMovies: `${baseUrl}/movie/top_rated?language=en-US`,
  UpComingMovies: `${baseUrl}/tv/upcoming?language=en-US`,
  ActionMovies: `${baseUrl}/discover/movie?language=en-US&with_genres=28`,
  ComedyMovies: `${baseUrl}/discover/movie?language=en-US&with_genres=35`,
  HorrorMovies: `${baseUrl}/discover/movie?language=en-US&with_genres=27`,
  RomanceMovies: `${baseUrl}/discover/movie?language=en-US&with_genres=10749&adult=false`,
  Documentaries: `${baseUrl}/discover/movie?language=en-US&with_genres=99`,
  NowPlayingMovies: `${baseUrl}/movie/now_playing?language=en-US&page=1`,

  // netflix
  NetflixOriginals: `${baseUrl}/discover/tv?with_networks=213`,
  PopularNetflix: `${baseUrl}/tv/popular?with_networks=213`,
  ActionTvNetflix: `${baseUrl}/discover/tv?language=en-US&with_genres=10759&with_networks=213`,
  TopRatedNetflix: `${baseUrl}/tv/top_rated?language=en-US&with_networks=213`,
  NetflixAirToday: `${baseUrl}/tv/airing_today?language=en-US&with_networks=213`,
  TrendingNetflix: `${baseUrl}/trending/tv/week?language=en-US&with_networks=213`,

  // tv
  TrendingTv: `${baseUrl}/trending/tv/week?language=en-US`,
  FamilyTv: `${baseUrl}/discover/tv?language=en-US&with_genres=10751`,
  TopRatedTv: `${baseUrl}/tv/top_rated?language=en-US`,
  ActionTv: `${baseUrl}/discover/tv?language=en-US&with_genres=10759`,
  ComedyTv: `${baseUrl}/discover/tv?language=en-US&with_genres=35`,
  CrimeTv: `${baseUrl}/discover/tv?language=en-US&with_genres=80`,
  MysteryTv: `${baseUrl}/discover/tv?language=en-US&with_genres=9648`,
  SciFiTv: `${baseUrl}/discover/tv?language=en-US&with_genres=10765`,
  NowPlayingTv: `${baseUrl}/tv/on_the_air?page=1&with_original_language=en`,
};

export default requests;
