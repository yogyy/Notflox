import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { Movie } from '~/types/tmdb-type';
import { API_KEY } from '@/utils/request';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;
  const session = await getServerSession(req, res, authOptions);

  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter' });
  } else if (req.method !== 'GET') {
    return res.status(405).end();
  }

  if (req.method === 'GET' && session) {
    try {
      if (query.length >= 1) {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}`
        );
        const data = response.data.results
          .slice(0, 5)
          .filter(
            (result: Movie) =>
              (result.media_type === 'movie' || result.media_type === 'tv') &&
              result.release_date !== ''
          );
        return res.status(200).json(data);
      } else {
        return res.status(500).json({ message: 'add minimum 3 query' });
      }
    } catch (error) {
      res.status(500).json({ message: `Error fetching query : '${error}'` });
    }
  } else {
    res.status(405).json({ message: 'Not Allowed' });
  }
}

export default handler;
