import { createPool } from 'generic-pool';
import { Client as PgClient } from 'pg';

import * as constants from '../../config';

export const getPoolCredentialsSecret = (secrets) => ({
  user: secrets[constants.CONSTANTS.databaseUserName],
  host: secrets[constants.CONSTANTS.databaseHostName],
  database: secrets[constants.CONSTANTS.databaseDbName],
  password: secrets[constants.CONSTANTS.databasePassword],
  port: constants.CONSTANTS.databasePort,
  max: secrets[constants.databaseMax] || 20,
  min: secrets[constants.databaseMin] || 5
});

export const getPoolCredentialsLocal = () => ({
  user: 'abc',
  host: 'localhost',
  database: 'abc',
  password: 'def',
  port: 5432,
  max: 20,
  min: 5
});

export const getDbConnectionPool = (poolCredentials) => {
  const factory = {
    create: async () => {
      const client = new PgClient(poolCredentials);
      await client.connect();
      return client;
    },
    destroy: async (client) => {
      try {
        await client.end();
      } catch (err) {
        console.error('Error destroying client:', err);
      }
    }
  };

  const opts = {
    max: poolCredentials.max,
    min: poolCredentials.min
  };

  return createPool(factory, opts);
};
