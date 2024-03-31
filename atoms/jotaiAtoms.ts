import { atom } from "jotai";
import { Movie } from "~/types/tmdb-type";

export const modalState = atom<boolean>(false);

export const movieState = atom<Movie | null>(null);

export const changeModalState = atom(null, (get, set, newState: boolean) => {
  set(modalState, newState);
});

export const changeMovieState = atom(
  null,
  (get, set, newMovie: Movie | null) => {
    set(movieState, newMovie);
  },
);

export const nonUser = atom("/images/default-red.webp");
