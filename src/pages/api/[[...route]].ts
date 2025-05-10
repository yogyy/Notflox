import { PageConfig } from "next";
import { handle } from "@hono/node-server/vercel";
import app from "@/lib/server/routes";

export const config: PageConfig = { api: { bodyParser: false } };

export default handle(app);
