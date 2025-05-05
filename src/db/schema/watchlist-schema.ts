import {
  timestamp,
  pgTableCreator,
  varchar,
  unique,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { relations } from "drizzle-orm";
import { nanoid } from "nanoid";

const pgTable = pgTableCreator((name) => `notflox_${name}`);

export const watchlist = pgTable(
  "watchlist",
  {
    id: varchar("id", { length: 22 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    title: varchar("title").notNull(),
    showId: varchar("show_id", { length: 10 }).notNull(),
    mediaType: varchar("media_type", {
      enum: ["movie", "tv"],
      length: 6,
    }).notNull(),
    userId: varchar("user_id")
      .references(() => user.id)
      .notNull(),
    backdropPath: varchar("backdrop_path"),
    posterPath: varchar("poster_path"),
    createdAt: timestamp("created_at").defaultNow(),
    releaseDate: timestamp("release_date", { mode: "string" }).notNull(),
  },
  (table) => [
    unique("unique_watchlist").on(table.mediaType, table.showId, table.userId),
  ],
);

export const watchlistRelation = relations(watchlist, ({ one }) => ({
  user: one(user, { fields: [watchlist.userId], references: [user.id] }),
}));

export const userRelations = relations(user, ({ many }) => ({
  watchlist: many(watchlist),
}));
