interface Genre {
  id: number;
  name: string;
}

interface Network {
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
}
interface ProductionCompany {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
}

type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  homepage: string;
  tagline: string;
  production_companies: ProductionCompany[];
  title: string;
  media_type: 'movie' | 'tv';
  release_date?: string;
  first_air_date?: string | undefined;
  last_air_date?: string | undefined;
  genres: Genre[];
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  videos: VideoInfo;
  vote_average: number;
  vote_count: number;
  status: string;
}

type VideoInfo = {
  results: {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: TypeTrailer;
    official: boolean;
    published_at: string;
    id: string;
  }[];
};

type TypeTrailer =
  | 'Bloopers'
  | 'Featurette'
  | 'Behind the Scenes'
  | 'Clip'
  | 'Trailer'
  | 'Teaser'
  | 'Opening Credits';

interface Anime {
  episodeNum?: string;
  animeId: string;
  animeTitle: string;
  animeImg: string;
  releasedDate: string;
  animeUrl: string;
  episodeUrl: string;
  genres: string[];
}

export type {
  Anime,
  Genre,
  Movie,
  MovieResponse,
  Network,
  ProductionCompany,
  TypeTrailer,
  VideoInfo,
};
