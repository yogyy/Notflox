import { genreMovie, genreTv } from '~/constants/movie';
import { Movie } from '~/typing';

const convertGenreIdsToNames = (genreIds: number[], movie: Movie) => {
  const genreNames = genreIds.map((genreId: number) => {
    const matchingGenre = (
      movie.media_type === 'tv' ? genreTv : genreMovie
    ).find(genre => genre.id === genreId);
    return matchingGenre ? matchingGenre.name : '';
  });
  return genreNames.join(', ');
};

export default convertGenreIdsToNames;
