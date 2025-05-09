import { db } from "@/db";
import { watchlist } from "@/db/schema/watchlist-schema";
import { auth } from "@/lib/auth";
import { showSchema } from "@/lib/server/schema";
import { fromNodeHeaders } from "better-auth/node";
import { and, eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const parseResult = showSchema.safeParse(req.query);
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
    const inList = await db.query.watchlist.findFirst({
      where: and(
        eq(watchlist.userId, session.user.id),
        eq(watchlist.showId, parseResult.data.id),
        eq(watchlist.mediaType, "tv"),
      ),
    });

    return res.status(200).json({ in_list: Boolean(inList) });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export default handler;
