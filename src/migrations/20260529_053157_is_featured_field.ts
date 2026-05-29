import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products" ADD COLUMN "is_featured" boolean DEFAULT false;
  ALTER TABLE "_products_v" ADD COLUMN "version_is_featured" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products" DROP COLUMN "is_featured";
  ALTER TABLE "_products_v" DROP COLUMN "version_is_featured";`)
}
