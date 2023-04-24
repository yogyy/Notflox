import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { Movie } from '../../../../typing';
import { API_KEY } from '@/utils/request';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter' });
  }

  try {
    if (query.length >= 3) {
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
      return res.status(200).json({ data });
    } else {
      return res.status(500).json({ message: 'add minimum 3 query' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching query' });
  }
}

export default handler;
