import { db } from "@/db";
import { watchlist } from "@/db/schema/watchlist-schema";
import { auth } from "@/lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import { desc, eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const userWatchlists = await db.query.watchlist.findMany({
      where: eq(watchlist.userId, session.user.id),
      orderBy: desc(watchlist.createdAt),
    });

    return res.status(200).json(userWatchlists);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export default handler;
