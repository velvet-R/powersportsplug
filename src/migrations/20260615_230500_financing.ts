import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "financing_applications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar NOT NULL,
  	"dob" varchar NOT NULL,
  	"ssn" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"address" varchar NOT NULL,
  	"city" varchar NOT NULL,
  	"state" varchar NOT NULL,
  	"zip" varchar NOT NULL,
  	"residence_status" varchar NOT NULL,
  	"employment" varchar NOT NULL,
  	"monthly_income" varchar NOT NULL,
  	"desired_plan" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "financing_applications_id" integer;
  CREATE INDEX "financing_applications_updated_at_idx" ON "financing_applications" USING btree ("updated_at");
  CREATE INDEX "financing_applications_created_at_idx" ON "financing_applications" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_financing_applications_fk" FOREIGN KEY ("financing_applications_id") REFERENCES "public"."financing_applications"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_financing_applications_id_idx" ON "payload_locked_documents_rels" USING btree ("financing_applications_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "financing_applications" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "financing_applications" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_financing_applications_fk";
  
  DROP INDEX "payload_locked_documents_rels_financing_applications_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "financing_applications_id";`)
}
