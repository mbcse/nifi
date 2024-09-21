export const queries = {
  
  get_all_chains: `
    SELECT * from ces.cerebro_singularity_chain_details
  `,
  
  get_all_assets: `
    SELECT * from ces.cerebro_singularity_asset_table
    JOIN ces.cerebro_singularity_chain_details
    ON cerebro_singularity_asset_table.chain_details_id = cerebro_singularity_chain_details.id
  `,

  get_all_assets_by_chain: `
  SELECT * from ces.cerebro_singularity_asset_table
  JOIN ces.cerebro_singularity_chain_details
  ON cerebro_singularity_asset_table.chain_details_id = cerebro_singularity_chain_details.id
  where cerebro_singularity_asset_table.chain_details_id= $1
`,
  
  get_chain: `
    SELECT * from ces.cerebro_singularity_chain_details
    WHERE id = $1
  `,

  get_asset: `
    SELECT * from ces.cerebro_singularity_asset_table
    JOIN ces.cerebro_singularity_chain_details
    ON cerebro_singularity_asset_table.chain_details_id = cerebro_singularity_chain_details.id
    WHERE asset_id = $1
  `,

  get_all_route_operations: `
    SELECT * from ces.route_operation_details
  `,  

  get_all_route_operations_by_chain: `
    SELECT * from ces.route_operation_details
    WHERE chain_details_id = $1 or chain_details_id isnull
  `,  

  get_route_operation: `
    SELECT * from ces.route_operation_details
    WHERE id = $1
  `,


  get_all_asset_routes: `
    SELECT asset_route_details.*,
    from_asset.chain_details_id AS from_asset_chain_details_id,
    to_asset.chain_details_id AS to_asset_chain_details_id,
    from_asset.asset_name AS from_asset_name,
    to_asset.asset_name AS to_asset_name,
    from_chain.chain_name AS from_chain_name,
    to_chain.chain_name AS to_chain_name
    from ces.asset_route_details
    JOIN ces.cerebro_singularity_asset_table AS from_asset
         ON asset_route_details.from_asset_id = from_asset.asset_id
    JOIN ces.cerebro_singularity_asset_table AS to_asset
          ON asset_route_details.to_asset_id = to_asset.asset_id
    JOIN ces.cerebro_singularity_chain_details AS from_chain
          ON from_asset.chain_details_id = from_chain.id
    JOIN ces.cerebro_singularity_chain_details AS to_chain
          ON to_asset.chain_details_id = to_chain.id
    ORDER BY asset_route_details.id;
  `,

  get_route_details: `
      SELECT
      route_details.*,
      route_operation_details.*,
      from_asset.asset_name AS from_asset_name,
      from_asset.icon_url AS from_asset_image_url,
      from_asset.chain_details_id AS from_asset_chain_details_id,
      to_asset.asset_name AS to_asset_name,
      to_asset.icon_url AS to_asset_image_url,
      to_asset.chain_details_id AS to_asset_chain_details_id,
      from_chain.chain_name AS from_chain_name,
      from_chain.network_id AS from_chain_network_id,
      from_chain.chain_scanner_url AS from_chain_explorer,
      to_chain.chain_name AS to_chain_name,
      to_chain.network_id AS to_chain_network_id,
      to_chain.chain_scanner_url AS to_chain_explorer
  FROM ces.route_details
          JOIN ces.route_operation_details
                ON route_details.route_operation_details_id = route_operation_details.id
          JOIN ces.cerebro_singularity_asset_table AS from_asset
                ON route_details.from_asset_id = from_asset.asset_id
          JOIN ces.cerebro_singularity_asset_table AS to_asset
                ON route_details.to_asset_id = to_asset.asset_id
          JOIN ces.cerebro_singularity_chain_details AS from_chain
                ON from_asset.chain_details_id = from_chain.id
          JOIN ces.cerebro_singularity_chain_details AS to_chain
                ON to_asset.chain_details_id = to_chain.id
  WHERE route_id = $1
  ORDER BY route_details.id;
  `,

  get_all_route_details: `
    SELECT * from ces.route_details 
    order by route_details.id
  `,

  get_all_route_details_by_desc: `
    SELECT * from ces.route_details 
    order by route_details.id DESC
  `,

  get_all_smartcontracts: `
    SELECT * from ces.cerebro_singularity_smart_contract_details
    JOIN ces.cerebro_singularity_chain_details 
    ON cerebro_singularity_smart_contract_details.chain_details_id = cerebro_singularity_chain_details.id
  `,

  add_asset_route: `
    INSERT INTO ces.asset_route_details
    (id, from_asset_id, to_asset_id, exchange_price_route, exchange_route_id, payment_collection_mode, is_active, fiat_provider, fiat_through_singularity_wallet)
    VALUES ($1, $2, $3, '{}', $4, $5, true, $6, $7);
  `,

  add_route_details: `
    INSERT INTO ces.route_details
    (id, route_id, operation, from_asset_id, to_asset_id, sender, receiver, route_operation_details_id, order_id, execution_type)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
  `
};
