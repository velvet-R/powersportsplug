import * as migration_20260528_015703_init from './20260528_015703_init';
import * as migration_20260528_112612_company_info from './20260528_112612_company_info';
import * as migration_20260528_145447_brands_collection from './20260528_145447_brands_collection';
import * as migration_20260528_235004_enhanced_product_collection from './20260528_235004_enhanced_product_collection';
import * as migration_20260529_053157_is_featured_field from './20260529_053157_is_featured_field';
import * as migration_20260529_211018_sales_inquiries from './20260529_211018_sales_inquiries';
import * as migration_20260530_001013 from './20260530_001013';

export const migrations = [
  {
    up: migration_20260528_015703_init.up,
    down: migration_20260528_015703_init.down,
    name: '20260528_015703_init',
  },
  {
    up: migration_20260528_112612_company_info.up,
    down: migration_20260528_112612_company_info.down,
    name: '20260528_112612_company_info',
  },
  {
    up: migration_20260528_145447_brands_collection.up,
    down: migration_20260528_145447_brands_collection.down,
    name: '20260528_145447_brands_collection',
  },
  {
    up: migration_20260528_235004_enhanced_product_collection.up,
    down: migration_20260528_235004_enhanced_product_collection.down,
    name: '20260528_235004_enhanced_product_collection',
  },
  {
    up: migration_20260529_053157_is_featured_field.up,
    down: migration_20260529_053157_is_featured_field.down,
    name: '20260529_053157_is_featured_field',
  },
  {
    up: migration_20260529_211018_sales_inquiries.up,
    down: migration_20260529_211018_sales_inquiries.down,
    name: '20260529_211018_sales_inquiries',
  },
  {
    up: migration_20260530_001013.up,
    down: migration_20260530_001013.down,
    name: '20260530_001013'
  },
];
