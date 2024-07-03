CREATE TABLE IF NOT EXISTS "todo" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"completed" boolean NOT NULL
);
