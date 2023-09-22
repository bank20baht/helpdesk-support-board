// knexfile.ts

import type { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: '172.30.0.1',
      port: 5432,
      user: 'postgres',
      password: 'admin',
      database: 'helpdesk-board-db',
    },
    migrations: {
      directory: './src/database/migrations',
    },
  },

  production: {
    client: 'pg',
    connection: {
      host: '172.30.0.1',
      port: 5432,
      user: 'postgres',
      password: 'admin',
      database: 'helpdesk-board-db',
    },
    migrations: {
      directory: './src/database/migrations',
    },
  },
};

module.exports = config;
