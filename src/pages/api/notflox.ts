import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import axios from 'axios';
import requests from '@/utils/request';
import { Movie } from '../../../typing';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  if (req.method === 'GET' && session) {
    try {
      const fetchTopRatedNetflix = axios
        .get(requests.fetchTopRatedNetflix)
        .then(res => res.data.results);
      const fetchAirToday = axios
        .get(requests.fetchAirToday)
        .then(res => res.data.results);
      const fetchPopularNetflix = axios
        .get(requests.fetchPopularNetflix)
        .then(res => res.data.results);

      const [topRatedNetflix, airToday, popularNetflix] = await Promise.all<
        Movie[]
      >([fetchTopRatedNetflix, fetchAirToday, fetchPopularNetflix]);
      res.setHeader(
        'Cache-Control',
        'public, max-age=3600, stale-while-revalidate=1800'
      );

      res.status(200).json({
        topRatedNetflix,
        airToday,
        popularNetflix,
      });
    } catch (error) {
      res.status(500).json({ message: `Internal server error: '${error}'` });
    }
  } else {
    // Not Signed in
    res.status(405).json({ message: 'Not Allowed' });
  }
  res.end();
}

export default handler;
