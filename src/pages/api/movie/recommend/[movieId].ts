import { API_KEY, BASE_URL } from '@/utils/request';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control', 'max-age=60, stale-while-revalidate');
  const { movieId } = req.query;
  const session = getSession({ req });

  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  if (req.method === 'GET' && (await session)) {
    try {
      const response = await axios.get(
        `${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}`
      );
      let data = response.data;
      res.setHeader('Cache-Control', 'max-age=60, stale-while-revalidate');
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: `Internal server error: '${error}'` });
    }
  } else {
    res.status(405).json({ message: 'Not Allowed' });
  }
}

export default handler;
