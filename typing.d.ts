export interface Genre {
  id: number;
  name: string;
}

export interface Network {
  name: string;
  id: integer;
  logo_path: string;
  origin_country: string;
}
export interface ProductionCompany {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
}

export interface Movie {
  homepage: Url;
  tagline: string;
  production_companies: ProductionCompany[];
  title: string;
  backdrop_path: string;
  media_type: string;
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
  vote_average: number;
  vote_count: number;
  status?: string;
}

export interface Element {
  type:
    | 'Bloopers'
    | 'Featurette'
    | 'Behind the Scenes'
    | 'Clip'
    | 'Trailer'
    | 'Teaser'
    | 'Opening Credits';
}

export interface Anime {
  episodeNum?: string;
  animeId: string;
  animeTitle: string;
  animeImg: string;
  releasedDate: string;
  animeUrl: string;
  episodeUrl: string;
  genres: string[];
}
