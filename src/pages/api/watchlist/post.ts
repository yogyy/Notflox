import { db } from "@/db";
import { watchlist } from "@/db/schema/watchlist-schema";
import { auth } from "@/lib/auth";
import { addWatchlistSchema } from "@/lib/server/schema";
import { fromNodeHeaders } from "better-auth/node";
import { and, eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const parseResult = addWatchlistSchema.safeParse(req.body);
  if (parseResult.success === false) {
    return res.status(400).json({ error: parseResult.error.format() });
  }

  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    await db.insert(watchlist).values({
      ...parseResult.data,
      userId: session.user.id,
    });

    return res
      .status(200)
      .json({ message: `${parseResult.data.title} added to Watchlist` });
  } catch (error: any) {
    if (error.code === "23505") {
      await db
        .delete(watchlist)
        .where(
          and(
            eq(watchlist.userId, session.user.id),
            eq(watchlist.showId, parseResult.data.showId),
            eq(watchlist.mediaType, parseResult.data.mediaType),
          ),
        );
      return res.status(200).json({
        message: `${parseResult.data.title} removed from Watchlist`,
      });
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

export default handler;
