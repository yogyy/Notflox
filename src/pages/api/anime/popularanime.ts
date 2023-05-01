import { BASE_URL, API_KEY } from '@/utils/request';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const today = `${year}-${month}-${day}`;

  const session = getSession({ req });

  if (req.method !== 'GET') {
    return res.status(405).end();
  }
  if (req.method === 'GET' && (await session)) {
    try {
      const response = await axios.get(
        `${BASE_URL}/discover/tv?api_key=${API_KEY}&sort_by=popularity.desc&air_date.gte=${today}&first_air_date_year=2023&with_genres=16&with_original_language=ja`
      );
      res.setHeader(
        'Cache-Control',
        'public, max-age=3600, stale-while-revalidate=1800'
      );
      res.status(200).json(response.data.results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: `Internal server error: '${error}'` });
    }
  } else {
    res.status(405).json({ message: 'Not Allowed' });
  }
}

export default handler;
