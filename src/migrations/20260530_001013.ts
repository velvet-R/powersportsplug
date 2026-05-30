import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sales_inquiries_products" ADD COLUMN "price" numeric;
  ALTER TABLE "sales_inquiries_products" ADD COLUMN "down_payment" numeric;
  ALTER TABLE "sales_inquiries_products" ADD COLUMN "estimated_payment" numeric;
  ALTER TABLE "sales_inquiries_products" ADD COLUMN "image" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sales_inquiries_products" DROP COLUMN "price";
  ALTER TABLE "sales_inquiries_products" DROP COLUMN "down_payment";
  ALTER TABLE "sales_inquiries_products" DROP COLUMN "estimated_payment";
  ALTER TABLE "sales_inquiries_products" DROP COLUMN "image";`)
}
