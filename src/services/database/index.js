/* eslint-disable camelcase */
import {queries} from './query.js';
import * as connections from '../connections/index.js';

const { 
  get_all_asset_routes: GET_ALL_ASSET_ROUTES,
  get_route_details: GET_ROUTE_DETAILS,
  get_all_smartcontracts: GET_ALL_SMART_CONTRACTS,
  get_chain: GET_CHAIN,
  get_asset: GET_ASSET,
  get_all_assets: GET_ALL_ASSETS,
  get_all_chains: GET_ALL_CHAINS,
  get_all_route_operations: GET_ALL_ROUTE_OPERATIONS,
  get_route_operation: GET_ROUTE_OPERATION,
  get_all_assets_by_chain: GET_ALL_ASSET_BY_CHAIN,
  get_all_route_operations_by_chain: GET_ALL_ROUTE_OPERATIONS_BY_CHAIN,
  add_asset_route: ADD_ROUTE,
  add_route_details: ADD_ROUTE_DETAILS,
  get_all_route_details: GET_ALL_ROUTE_DETAILS,
  get_all_route_details_by_desc: GET_ALL_ROUTE_DETAILS_BY_DESC,
} = queries;

export const getAllAssets = async () => {
  const pool = await connections.getPoolClient();
  const queryResult = await pool.query(GET_ALL_ASSETS);
  return queryResult.rows;
};

export const getAllAssetsByChainDetailsId = async (chainDetailsid) => {
  const pool = await connections.getPoolClient();
  const queryResult = await pool.query(GET_ALL_ASSET_BY_CHAIN, [chainDetailsid]);
  return queryResult.rows;
};


export const getAllChains = async () => {
  const pool = await connections.getPoolClient();
  const queryResult = await pool.query(GET_ALL_CHAINS);
  return queryResult.rows;
};

export const getAsset = async (assetId) => {
  const pool = await connections.getPoolClient();
  const result = await pool.query(GET_ASSET, [assetId]);
  return result.rows[0];
};

export const getChain = async (chain_details_id) => {
  const pool = await connections.getPoolClient();
  const queryResult = await pool.query(GET_CHAIN, [chain_details_id]);
  return queryResult.rows[0];
};


export const getAllRoutes = async () => {
  const pool = await connections.getPoolClient();
  const queryResult = await pool.query(GET_ALL_ASSET_ROUTES);
  return queryResult.rows;
}

export const getRouteDetails = async (routeId) => {
  const pool = await connections.getPoolClient();
  const queryResult = await pool.query(GET_ROUTE_DETAILS, [routeId]);
  return queryResult.rows;
}

export const getAllSmartContracts = async () => {
  const pool = await connections.getPoolClient();
  const queryResult = await pool.query(GET_ALL_SMART_CONTRACTS);
  return queryResult.rows;
}

export const getAllRouteOperations = async () => {
  const pool = await connections.getPoolClient();
  const queryResult = await pool.query(GET_ALL_ROUTE_OPERATIONS);
  return queryResult.rows;
}

export const getAllRouteOperationsByChainDetailsId = async (chainDetailsId) => {
  const pool = await connections.getPoolClient();
  const queryResult = await pool.query(GET_ALL_ROUTE_OPERATIONS_BY_CHAIN, [chainDetailsId]);
  return queryResult.rows;
}

export const getRouteOperation = async (routeOperationId) => {
  const pool = await connections.getPoolClient();
  const queryResult = await pool.query(GET_ROUTE_OPERATION, [routeOperationId]);
  return queryResult.rows[0];
}

export const addRouteDetails = async (routeDetails) => {
  const pool = await connections.getPoolClient();
  const queryResult = await pool.query(ADD_ROUTE_DETAILS, routeDetails);
  return queryResult.rows[0];
}

export const addAssetRoute = async (assetRoute) => {
  const pool = await connections.getPoolClient();
  const queryResult = await pool.query(ADD_ROUTE, assetRoute);
  return queryResult.rows[0];
}

export const getAllRouteDetails = async () => {
  const pool = await connections.getPoolClient();
  const queryResult = await pool.query(GET_ALL_ROUTE_DETAILS);
  return queryResult.rows;
}

export const getAllRouteDetailsByDesc = async () => {
  const pool = await connections.getPoolClient();
  const queryResult = await pool.query(GET_ALL_ROUTE_DETAILS_BY_DESC);
  return queryResult.rows;
}

