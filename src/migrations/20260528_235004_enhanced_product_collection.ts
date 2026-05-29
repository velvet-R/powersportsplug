import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_products_condition" AS ENUM('New', 'Used', 'Certified');
  CREATE TYPE "public"."enum__products_v_version_condition" AS ENUM('New', 'Used', 'Certified');
  ALTER TABLE "products" ADD COLUMN "brand_id" integer;
  ALTER TABLE "products" ADD COLUMN "year" numeric;
  ALTER TABLE "products" ADD COLUMN "engine_size" varchar;
  ALTER TABLE "products" ADD COLUMN "condition" "enum_products_condition";
  ALTER TABLE "products" ADD COLUMN "stock_number" varchar;
  ALTER TABLE "products" ADD COLUMN "low_stock_threshold" numeric DEFAULT 5;
  ALTER TABLE "products" ADD COLUMN "down_payment" numeric;
  ALTER TABLE "products" ADD COLUMN "estimated_payment" numeric;
  ALTER TABLE "_products_v" ADD COLUMN "version_brand_id" integer;
  ALTER TABLE "_products_v" ADD COLUMN "version_year" numeric;
  ALTER TABLE "_products_v" ADD COLUMN "version_engine_size" varchar;
  ALTER TABLE "_products_v" ADD COLUMN "version_condition" "enum__products_v_version_condition";
  ALTER TABLE "_products_v" ADD COLUMN "version_stock_number" varchar;
  ALTER TABLE "_products_v" ADD COLUMN "version_low_stock_threshold" numeric DEFAULT 5;
  ALTER TABLE "_products_v" ADD COLUMN "version_down_payment" numeric;
  ALTER TABLE "_products_v" ADD COLUMN "version_estimated_payment" numeric;
  ALTER TABLE "products" ADD CONSTRAINT "products_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_brand_id_brands_id_fk" FOREIGN KEY ("version_brand_id") REFERENCES "public"."brands"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "products_brand_idx" ON "products" USING btree ("brand_id");
  CREATE INDEX "_products_v_version_version_brand_idx" ON "_products_v" USING btree ("version_brand_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products" DROP CONSTRAINT "products_brand_id_brands_id_fk";
  
  ALTER TABLE "_products_v" DROP CONSTRAINT "_products_v_version_brand_id_brands_id_fk";
  
  DROP INDEX "products_brand_idx";
  DROP INDEX "_products_v_version_version_brand_idx";
  ALTER TABLE "products" DROP COLUMN "brand_id";
  ALTER TABLE "products" DROP COLUMN "year";
  ALTER TABLE "products" DROP COLUMN "engine_size";
  ALTER TABLE "products" DROP COLUMN "condition";
  ALTER TABLE "products" DROP COLUMN "stock_number";
  ALTER TABLE "products" DROP COLUMN "low_stock_threshold";
  ALTER TABLE "products" DROP COLUMN "down_payment";
  ALTER TABLE "products" DROP COLUMN "estimated_payment";
  ALTER TABLE "_products_v" DROP COLUMN "version_brand_id";
  ALTER TABLE "_products_v" DROP COLUMN "version_year";
  ALTER TABLE "_products_v" DROP COLUMN "version_engine_size";
  ALTER TABLE "_products_v" DROP COLUMN "version_condition";
  ALTER TABLE "_products_v" DROP COLUMN "version_stock_number";
  ALTER TABLE "_products_v" DROP COLUMN "version_low_stock_threshold";
  ALTER TABLE "_products_v" DROP COLUMN "version_down_payment";
  ALTER TABLE "_products_v" DROP COLUMN "version_estimated_payment";
  DROP TYPE "public"."enum_products_condition";
  DROP TYPE "public"."enum__products_v_version_condition";`)
}
