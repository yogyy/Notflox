import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { Movie } from "~/types/tmdb-type";
import { API_KEY } from "@/utils/request";
import { searchSchema } from "@/lib/server/schema";
import { auth } from "@/lib/auth";
import { fromNodeHeaders } from "better-auth/node";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const parseResult = searchSchema.safeParse(req.query);
  if (parseResult.success === false) {
    return res
      .status(400)
      .json({ message: parseResult.error.errors[0].message });
  }

  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${parseResult.data.query}`,
    );
    const data = response.data.results.filter(
      (result: Movie) =>
        (result.media_type === "movie" || result.media_type === "tv") &&
        result.release_date !== "",
    );

    res.setHeader("Cache-Control", "max-age=60, stale-while-revalidate");
    return res.status(200).json(data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return res.status(error.status || 400).json({ message: error.message });
    }

    res.status(500).json({ message: "Internal server error" });
  }
}

export default handler;
