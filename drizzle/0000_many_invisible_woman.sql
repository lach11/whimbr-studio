CREATE TABLE `content_entries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`summary` text DEFAULT '' NOT NULL,
	`body` text DEFAULT '' NOT NULL,
	`category` text DEFAULT 'General' NOT NULL,
	`image_url` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`published_at` integer,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `content_entries_slug_unique` ON `content_entries` (`slug`);
--> statement-breakpoint
CREATE INDEX `idx_content_entries_type_status` ON `content_entries` (`type`,`status`);
