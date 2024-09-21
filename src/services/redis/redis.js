import {getRedisClient} from '../connections';

export const pushMapToRedisWithKey = async (key, object) => {
  const redis = await getRedisClient();
  await redis.hSet(key, object);
  console.log(`Pushed Map To Redis => ${key} -> ${JSON.stringify(object)}`);
  redis.quit();
};

export const getMapFromRedisWithKey = async (key) => {
  const redis = await getRedisClient();
  const object = await redis.hGetAll(key);
  redis.quit();
  return JSON.stringify(object);
}

export const pushStringToRedisWithKey = async (key, value) => {
  if (typeof value !== 'string') value = JSON.stringify(value);
  const redis = await getRedisClient();
  await redis.set(key, value);
  console.log(`Pushed String To Redis => ${key} -> ${value}`);
  redis.quit();
};

export const pushStringToRedisWithKeyAndExpiry = async (key, value, expiry) => {
  if (typeof value !== 'string') value = JSON.stringify(value);
  const redis = await getRedisClient();
  await redis.set(key, value, { EX: expiry });
  console.log(`Pushed String To Redis => ${key} -> ${value} with expiry of ${expiry} Seconds`);
  redis.quit();
};

export const getStringKey = async (key) => {
  const redis = await getRedisClient();
  const value = await redis.get(key);
  redis.quit();
  return value;
};
