import { Hono } from "hono";
import authMiddleware from "../hono-middleware";
import { auth } from "@/lib/auth";
import watchlistRoutes from "./watchlist-route";

const app = new Hono().basePath("/api");

const routes = app
  .use(authMiddleware)
  .on(["POST", "GET"], "/auth/*", (c) => {
    return auth.handler(c.req.raw);
  })
  .route("/watchlist", watchlistRoutes);

export type AppType = typeof routes; // used for rpc if needed
export default app;
