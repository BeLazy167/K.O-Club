ALTER TABLE "client_fights" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "client_fights" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "client_fights" ALTER COLUMN "author_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "client_user" ALTER COLUMN "username" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "client_fights" ADD COLUMN "location" text NOT NULL;--> statement-breakpoint
ALTER TABLE "client_fights" ADD COLUMN "challenged_id" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "client_fights" ADD CONSTRAINT "client_fights_challenged_id_client_user_id_fk" FOREIGN KEY ("challenged_id") REFERENCES "client_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "client_fights" DROP COLUMN IF EXISTS "latitude";--> statement-breakpoint
ALTER TABLE "client_fights" DROP COLUMN IF EXISTS "longitude";