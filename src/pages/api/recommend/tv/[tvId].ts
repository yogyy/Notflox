import { API_KEY, BASE_URL } from '@/utils/request';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { tvId } = req.query;

  try {
    const response = await axios.get(
      `${BASE_URL}/tv/${tvId}/recommendations?api_key=${API_KEY}`
    );
    let data = response.data;

    if (data.results.length === 0) {
      const similarResponse = await axios.get(
        `${BASE_URL}/tv/${tvId}/similar?api_key=${API_KEY}`
      );
      data = similarResponse.data;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export default handler;
