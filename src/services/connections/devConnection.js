import {createClient} from 'redis';
import * as connectionUtils from './connectionUtils.js';
import { Client } from 'ioredis'; // Assuming you are using 'ioredis' library

const REDIS_PORT = process.env.REDIS_PORT || 6379;
let dbPool;

const getPoolClient = async () => {
  try {
    if (!dbPool) {
      const poolCredentials = connectionUtils.getPoolCredentialsLocal();
      dbPool = connectionUtils.getDbConnectionPool(poolCredentials);
    }
    return {
      query: async (text, params) => {
        const client = await dbPool.acquire();
        try {
          const res = await client.query(text, params);
          return res;
        } finally {
          dbPool.release(client);
        }
      }
    };
  } catch (err) {
    console.log('Cannot Connect to DataBase..', err);
    throw new Error(err);
  }
};

const getRedisClient = async () => {
  try {
    const client = createClient({ socket: { port: REDIS_PORT, host: 'localhost' } }); // add another parameter with host as 'redis'
    await client.connect();
    return client;
  } catch (err) {
    console.log('Cannot Connect to Redis..', err);
    throw new Error(err);
  }
};

const getIoRedisClient = async () => {
  try {
    // logger.info(`SecretManagerReponse ${response}`);
    // logger.info(`SecretManagerReponse ${response[constants.redisUrl]}`);
    const client = new Client({ port: REDIS_PORT });
    return client;
  } catch (err) {
    console.log('Cannot Connect to redis using ioredis..', err);
    throw new Error(err);
  }
};

export {
  getPoolClient,
  getRedisClient,
  getIoRedisClient,
};
