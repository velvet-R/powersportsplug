import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_sales_inquiries_payment_plan" AS ENUM('full', 'financing');
  CREATE TYPE "public"."enum_sales_inquiries_payment_method" AS ENUM('cash_app', 'bank_transfer', 'paypal', 'zelle', 'venmo', 'chime', 'apple_pay');
  ALTER TABLE "sales_inquiries" ADD COLUMN "payment_plan" "enum_sales_inquiries_payment_plan" NOT NULL;
  ALTER TABLE "sales_inquiries" ADD COLUMN "payment_method" "enum_sales_inquiries_payment_method" NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sales_inquiries" DROP COLUMN "payment_plan";
  ALTER TABLE "sales_inquiries" DROP COLUMN "payment_method";
  DROP TYPE "public"."enum_sales_inquiries_payment_plan";
  DROP TYPE "public"."enum_sales_inquiries_payment_method";`)
}
