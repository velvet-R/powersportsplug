import * as migration_20260528_015703_init from './20260528_015703_init';

export const migrations = [
  {
    up: migration_20260528_015703_init.up,
    down: migration_20260528_015703_init.down,
    name: '20260528_015703_init'
  },
];
