import * as migration_20260528_015703_init from './20260528_015703_init';
import * as migration_20260528_112612_company_info from './20260528_112612_company_info';

export const migrations = [
  {
    up: migration_20260528_015703_init.up,
    down: migration_20260528_015703_init.down,
    name: '20260528_015703_init',
  },
  {
    up: migration_20260528_112612_company_info.up,
    down: migration_20260528_112612_company_info.down,
    name: '20260528_112612_company_info'
  },
];
