import { atom } from 'jotai';
import { Movie } from '../typing';

export const modalState = atom<boolean>(false);

export const movieState = atom<Movie | null>(null);
