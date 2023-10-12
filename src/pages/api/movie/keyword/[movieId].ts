import axios from 'axios';
import { API_KEY } from '@/utils/request';
import { baseUrl } from '~/constants/movie';
import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { movieId } = req.query;
  const session = getSession({ req });

  if (req.method !== 'GET') {
    return res.status(405).end();
  }
  if (req.method === 'GET' && (await session)) {
    try {
      const response = await axios.get(
        `${baseUrl}/movie/${movieId}/keywords?api_key=${API_KEY}`
      );
      let data = response.data;
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
