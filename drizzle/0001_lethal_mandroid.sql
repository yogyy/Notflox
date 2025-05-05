CREATE TABLE "notflox_watchlist" (
	"id" varchar(22) PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"show_id" varchar(10) NOT NULL,
	"media_type" varchar(6),
	"user_id" varchar NOT NULL,
	"backdrop_path" varchar,
	"poster_path" varchar,
	"created_at" timestamp DEFAULT now(),
	"release_date" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "notflox_watchlist" ADD CONSTRAINT "notflox_watchlist_user_id_notflox_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."notflox_user"("id") ON DELETE no action ON UPDATE no action;