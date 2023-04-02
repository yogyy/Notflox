import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }
  try {
    await serverAuth(req);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
