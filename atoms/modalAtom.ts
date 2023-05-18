import { Movie } from '../typing';
import { create } from 'zustand';
import { ImageProps } from 'next/image';

// export const modalState = atom({
//   key: 'modalState',
//   default: false,
// });

// export const movieState = atom<Movie | null>({
//   key: 'movieState',
//   default: null,
// });

// const images = [
//   '/images/default-blue.png',
//   '/images/default-red.png',
//   '/images/default-slate.png',
//   '/images/default-green.png',
// ];

interface AppState {
  showModal: boolean;
  currentMovie: Movie | null;
  setCurrentMovie: (movie: Movie | null) => void;
  setShowModal: (isOpen: boolean) => void;
}

export const useAppState = create<AppState>(set => ({
  showModal: false,
  currentMovie: null,
  setCurrentMovie: (movie: Movie | null) => set({ currentMovie: movie }),
  setShowModal: (isOpen: boolean) => set({ showModal: isOpen }),
}));

export const useProfileStore = create(set => ({
  imaged: '/images/default-red.png',
  setNonloginProfile: (newImage: ImageProps) => set({ imaged: newImage }),
}));
