import * as React from 'react';
import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';
import { CheckIcon, PlusSmallIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

interface FavoritesButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoritesButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = React.useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = React.useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.delete('/api/favorite', { data: { movieId } });
    } else {
      response = await axios.post('/api/favorite', { movieId });
    }

    const updateFavoriteIds = response?.data?.favoriteIds;

    mutate({
      ...currentUser,
      favoriteIds: updateFavoriteIds,
    });
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  const Icon = isFavorite ? CheckIcon : PlusSmallIcon;

  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border border-white rounded-full flex justify-center items-center transition hover:border-neutral-300 hover:scale-105"
    >
      <Icon className="text-white" />
    </div>
  );
};

export default FavoriteButton;
