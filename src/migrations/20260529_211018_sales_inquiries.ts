import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_sales_inquiries_status" AS ENUM('new', 'contacted', 'closed');
  CREATE TABLE "sales_inquiries_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_title" varchar,
  	"product_id" numeric,
  	"quantity" numeric
  );
  
  CREATE TABLE "sales_inquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"customer_name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"location" varchar NOT NULL,
  	"message" varchar,
  	"status" "enum_sales_inquiries_status" DEFAULT 'new',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "sales_inquiries_id" integer;
  ALTER TABLE "sales_inquiries_products" ADD CONSTRAINT "sales_inquiries_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sales_inquiries"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "sales_inquiries_products_order_idx" ON "sales_inquiries_products" USING btree ("_order");
  CREATE INDEX "sales_inquiries_products_parent_id_idx" ON "sales_inquiries_products" USING btree ("_parent_id");
  CREATE INDEX "sales_inquiries_updated_at_idx" ON "sales_inquiries" USING btree ("updated_at");
  CREATE INDEX "sales_inquiries_created_at_idx" ON "sales_inquiries" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sales_inquiries_fk" FOREIGN KEY ("sales_inquiries_id") REFERENCES "public"."sales_inquiries"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_sales_inquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("sales_inquiries_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sales_inquiries_products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sales_inquiries" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "sales_inquiries_products" CASCADE;
  DROP TABLE "sales_inquiries" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_sales_inquiries_fk";
  
  DROP INDEX "payload_locked_documents_rels_sales_inquiries_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "sales_inquiries_id";
  DROP TYPE "public"."enum_sales_inquiries_status";`)
}
