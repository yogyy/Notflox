import { InferSelectModel } from "drizzle-orm";
import { session, user } from "./schema/auth-schema";
import { watchlist } from "./schema/watchlist-schema";

export type User = InferSelectModel<typeof user>;
export type Session = InferSelectModel<typeof session>;
export type Watchlist = InferSelectModel<typeof watchlist>;
