CREATE TABLE IF NOT EXISTS "client_votes" (
	"user_id" text NOT NULL,
	"fight_id" text NOT NULL,
	"voted_for_id" boolean NOT NULL,
	"voted_for_username" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "client_votes_user_id_fight_id_pk" PRIMARY KEY("user_id","fight_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "client_votes" ADD CONSTRAINT "client_votes_user_id_client_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "client_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "client_votes" ADD CONSTRAINT "client_votes_fight_id_client_fights_id_fk" FOREIGN KEY ("fight_id") REFERENCES "client_fights"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "client_votes" ADD CONSTRAINT "client_votes_voted_for_id_client_user_id_fk" FOREIGN KEY ("voted_for_id") REFERENCES "client_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
