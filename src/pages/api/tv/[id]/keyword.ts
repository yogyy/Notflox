import axios, { AxiosError } from "axios";
import { API_KEY } from "@/utils/request";
import { baseUrl } from "~/constants/movie";
import type { NextApiRequest, NextApiResponse } from "next";
import { showSchema } from "@/lib/server/schema";
import { auth } from "@/lib/auth";
import { fromNodeHeaders } from "better-auth/node";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const query = showSchema.safeParse(req.query);
  if (query.success === false) {
    return res.status(400).json({ message: query.error.errors[0].message });
  }

  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const response = await axios.get(
      `${baseUrl}/tv/${query.data.id}/keywords?api_key=${API_KEY}`,
    );

    res.setHeader("Cache-Control", "max-age=60, stale-while-revalidate");
    res.status(200).json(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return res.status(error.status || 400).json({ message: error.message });
    }

    res.status(500).json({ message: "Internal server error" });
  }
}

export default handler;
