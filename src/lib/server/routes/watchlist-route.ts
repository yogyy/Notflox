import { Session, User } from "@/db/type";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { addWatchlistSchemaHono, honoSchema } from "../schema";
import { db } from "@/db";
import { and, desc, eq } from "drizzle-orm";
import { watchlist } from "@/db/schema/watchlist-schema";

const watchlistRoutes = new Hono<{
  Variables: { user: User | null; session: Session | null };
}>()
  .use(async (c, next) => {
    const session = c.get("session");
    if (!session) return c.json({ error: "Unauthorized" }, 401);
    await next();
  })
  .get("/", async (c) => {
    const user = c.get("user") as User;

    try {
      const userWatchlists = await db.query.watchlist.findMany({
        where: eq(watchlist.userId, user.id),
        orderBy: desc(watchlist.createdAt),
      });

      return c.json({ watchlist: userWatchlists });
    } catch (error) {
      return c.json({ error: "Internal server error" }, 500);
    }
  })
  .get("/:type/:id", zValidator("param", honoSchema), async (c) => {
    const { type, id } = c.req.valid("param");
    const user = c.get("user") as User;

    try {
      const inList = await db.query.watchlist.findFirst({
        where: and(
          eq(watchlist.userId, user.id),
          eq(watchlist.showId, id),
          eq(watchlist.mediaType, type),
        ),
      });

      return c.json({ in_list: Boolean(inList) }, 200);
    } catch (err) {
      return c.json({ error: "Internal server error" }, 500);
    }
  })
  .post(
    "/:type/:id",
    zValidator("param", honoSchema),
    zValidator("json", addWatchlistSchemaHono),
    async (c) => {
      const { type, id } = c.req.valid("param");
      const body = c.req.valid("json");
      const user = c.get("user") as User;

      console.log(body);

      try {
        await db.insert(watchlist).values({
          ...body,
          showId: id,
          mediaType: type,
          userId: user.id,
        });

        return c.json({ message: `${body.title} added to Watchlist` });
      } catch (error: any) {
        if (error.code === "23505") {
          await db
            .delete(watchlist)
            .where(
              and(
                eq(watchlist.userId, user.id),
                eq(watchlist.showId, id),
                eq(watchlist.mediaType, type),
              ),
            );

          return c.json({ message: `${body.title} removed from Watchlist` }, 200);
        }
        return c.json({ error: "Internal server error" }, 500);
      }
    },
  );
export default watchlistRoutes;
