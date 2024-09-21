import * as devConnections from './devConnection.js';
import * as constants from '../../config/constants.js';


const getEnvironment = () => {
  const environment = process.env.ENVIRONMENT
  console.log(environment)
  if (!environment) {
    throw new Error('Invalid Input Environment (DEV/PROD/SANDBOX/QAL) Not Provided..');
  }
  return environment.toUpperCase();
};

const getPoolClient = async () => {
  const env = getEnvironment();
  if (constants.DEV_ENVIRONMENT === env) {
    return await devConnections.getPoolClient();
  } else if (constants.QAL_ENVIRONMENT === env) {
    return await qalConnections.getPoolClient();
  } else {
    return await prodConnections.getPoolClient();
  }
};

const getRedisClient = async () => {
  console.log('Getting Redis Client');
  const env = getEnvironment();
  console.log('Getting Redis Client ENV-> ', env);
  if (constants.DEV_ENVIRONMENT === env) {
    return await devConnections.getRedisClient();
  } else if (constants.QAL_ENVIRONMENT === env) {
    return await qalConnections.getRedisClient();
  } else {
    return await prodConnections.getRedisClient();
  }
};

const getIoRedisClient = async () => {
  console.log('Getting Io Redis Client');
  const env = getEnvironment();
  console.log('Getting Redis Client ENV-> ', env);
  if (constants.DEV_ENVIRONMENT === env) {
    return await devConnections.getIoRedisClient();
  } else if (constants.QAL_ENVIRONMENT === env) {
    return await qalConnections.getIoRedisClient();
  } else {
    return await prodConnections.getIoRedisClient();
  }
};

export { getPoolClient, getRedisClient, getIoRedisClient };
