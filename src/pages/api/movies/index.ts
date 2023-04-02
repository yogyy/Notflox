import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    await serverAuth(req);

    const movies = await prismadb.movie.findMany();

    return res.status(200).json(movies);
  } catch (error) {
    console.log({ error });
    return res.status(500).end();
  }
}
