import serverAuth from '@/lib/serverAuth';
import prismadb from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }
  try {
    const { currentUser } = await serverAuth(req);
    const favorieMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        },
      },
    });
    return res.status(200).json(favorieMovies);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
