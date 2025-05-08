import { auth } from "@/lib/auth";
import { Hono } from "hono";
import { handle } from "@hono/node-server/vercel";
import { PageConfig } from "next";
import authMiddleware from "@/lib/server/middleware";
import { Session, User } from "@/db/type";
import { zValidator } from "@hono/zod-validator";
import { honoSchema } from "@/lib/server/schema";

export const config: PageConfig = {
  api: { bodyParser: false },
};

const app = new Hono<{
  Variables: { user: User | null; session: Session | null };
}>().basePath("/api/hono");
app.use(authMiddleware);
app.on(["POST", "GET"], "/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

app.get("/:type/:id", zValidator("param", honoSchema), (c) => {
  const { type, id } = c.req.valid("param");
  return c.json({
    message: "Hello Next.js! from hono api",
    user: c.get("user"),
    param: { type, id },
  });
});

export default handle(app);
