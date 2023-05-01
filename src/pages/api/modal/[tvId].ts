import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_KEY, BASE_URL } from '@/utils/request';
import { getSession } from 'next-auth/react';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { tvId } = req.query;
  const session = getSession({ req });

  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  if (req.method === 'GET' && (await session)) {
    try {
      const response = await axios.get(
        `${BASE_URL}/tv/${tvId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
      );
      const data = response.data;
      return res.status(200).json({ data });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error fetching query : '${error}'` });
    }
  } else {
    res.status(405).json({ message: 'Not Allowed' });
  }
}
export default handler;
