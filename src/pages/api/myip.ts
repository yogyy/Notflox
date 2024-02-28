import { NextApiRequest, NextApiResponse } from "next";
import { getClientIp } from "request-ip";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const ip = getClientIp(req);
  res.status(200).json({ ip });
}
