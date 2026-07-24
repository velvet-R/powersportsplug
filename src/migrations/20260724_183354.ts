import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sales_inquiries" ALTER COLUMN "payment_method" SET DATA TYPE text;
  DROP TYPE "public"."enum_sales_inquiries_payment_method";
  CREATE TYPE "public"."enum_sales_inquiries_payment_method" AS ENUM('cash_app', 'bank_transfer', 'zelle', 'chime', 'apple_pay', 'btc');
  ALTER TABLE "sales_inquiries" ALTER COLUMN "payment_method" SET DATA TYPE "public"."enum_sales_inquiries_payment_method" USING "payment_method"::"public"."enum_sales_inquiries_payment_method";
  ALTER TABLE "sales_inquiries" ADD COLUMN "shipping_fee" numeric DEFAULT 0;
  ALTER TABLE "sales_inquiries" ADD COLUMN "total_amount" numeric DEFAULT 0;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_sales_inquiries_payment_method" ADD VALUE 'paypal' BEFORE 'zelle';
  ALTER TYPE "public"."enum_sales_inquiries_payment_method" ADD VALUE 'venmo' BEFORE 'chime';
  ALTER TABLE "sales_inquiries" DROP COLUMN "shipping_fee";
  ALTER TABLE "sales_inquiries" DROP COLUMN "total_amount";`)
}
