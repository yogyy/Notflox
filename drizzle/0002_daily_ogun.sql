ALTER TABLE "notflox_watchlist" ALTER COLUMN "media_type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "notflox_watchlist" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "notflox_watchlist" ADD CONSTRAINT "unique_watchlist" UNIQUE("media_type","show_id","user_id");