import { API_KEY, BASE_URL } from '@/utils/request';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control', 'max-age=60, stale-while-revalidate');
  const { movieId } = req.query;

  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/keywords?api_key=${API_KEY}`
    );
    let data = response.data;

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export default handler;
