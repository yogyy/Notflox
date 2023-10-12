import axios from 'axios';
import { API_KEY } from '@/utils/request';
import { baseUrl } from '~/constants/movie';
import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = getSession({ req });

  if (req.method !== 'GET') {
    return res.status(405).end();
  }
  if (req.method === 'GET' && (await session)) {
    try {
      const apiKey = API_KEY;
      const totalPages = 4;
      const requests = [];

      for (let page = 1; page <= totalPages; page++) {
        const url = `${baseUrl}/tv/on_the_air?api_key=${apiKey}&page=${page}&with_genres=16&with_original_language=ja&with_keywords=210024`;
        requests.push(axios.get(url));
      }
      const responses = await Promise.all(requests);
      const data = responses.map(response => response.data.results);
      const combine = data.flat();

      res.setHeader(
        'Cache-Control',
        'public, max-age=3600, stale-while-revalidate=1800'
      );
      res.status(200).json(combine);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: `Internal server error: '${error}'` });
    }
  } else {
    res.status(405).json({ message: 'Not Allowed' });
  }
}

export default handler;
