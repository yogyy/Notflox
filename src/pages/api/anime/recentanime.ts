import { BASE_URL, API_KEY } from '@/utils/request';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }
  try {
    const pages = 1;
    const baseUrl = `${BASE_URL}/tv/on_the_air`;
    const apiKey = API_KEY;
    const timezone = 'Japan/Tokyo';
    const genre = 16;
    const language = 'ja';
    const keywords = 'anime';
    const totalPages = 4;
    const requests = [];

    for (let page = 1; page <= totalPages; page++) {
      const url = `${baseUrl}?api_key=${apiKey}&page=${page}&timezone=${timezone}&with_genres=${genre}&with_original_language=${language}&with_keywords=${keywords}`;
      requests.push(axios.get(url));
    }
    const responses = await Promise.all(requests);
    const data = responses.map(response => response.data.results);
    const combine = data.flat();

    res.status(200).json(combine);
    res.setHeader(
      'Cache-Control',
      'public, max-age=3600, stale-while-revalidate=1800'
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export default handler;
