import serverAuth from '@/lib/serverAuth';
import prismadb from '@/lib/prismadb';
import { without } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req);
      const { movieId } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error('Invalid ID');
      }

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });
      return res.status(200).json(user);
    }
    if (req.method === 'DELETE') {
      const { currentUser } = await serverAuth(req);

      const { movieId } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error('Invalid ID');
      }

      const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      });
      return res.status(200).json(updatedUser);
    }

    return res.status(405).end();
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}
