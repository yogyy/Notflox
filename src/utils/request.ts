export const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
export const BASE_URL = 'https://api.themoviedb.org/3';

const requests = {
  fetchTrending: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`,
  fetchDiscoverMovie: `${BASE_URL}/discover/movie?api_key=${API_KEY}&include_adult=false&page=1&year=2023&without_genres=10749`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchUpComing: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749&adult=false`,
  fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
  // tv
  fetchTrendingTv: `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=en-US`,
  fetchFamilyTv: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=10751`,
  fetchTopRatedTv: `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionTv: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=10759`,
  fetchComedyTv: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=35`,
  fetchCrimeTv: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=80`,
  fetchMysteryTv: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=9648`,
  fetchSciFiTv: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=10765`,
};

export default requests;
