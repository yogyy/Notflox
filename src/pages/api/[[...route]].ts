import { auth } from "@/lib/auth";
import { Hono } from "hono";
import { handle } from "@hono/node-server/vercel";
import { PageConfig } from "next";
import authMiddleware from "@/lib/server/hono-middleware";
import watchlistRoutes from "@/lib/server/routes/watchlist-route";

export const config: PageConfig = {
  api: { bodyParser: false },
};

const app = new Hono()
  .basePath("/api")
  .use(authMiddleware)
  .on(["POST", "GET"], "/auth/*", (c) => {
    return auth.handler(c.req.raw);
  });

app.route("/watchlist", watchlistRoutes);

export default handle(app);
