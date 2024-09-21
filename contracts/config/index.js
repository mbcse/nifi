const privateKeys = require("./privateKeys.json");
module.exports = {
  NETWORKS: {
    1: {
      RPC_URL: process.env.ETHEREUM_RPC_URL,
      CHAIN_ID: 1,
    },
    5: {
      RPC_URL: process.env.GOERLI_RPC_URL,
      CHAIN_ID: 5,
    },
    56: {
      RPC_URL: process.env.BINANCE_CHAIN_MAINNET_RPC_URL,
      CHAIN_ID: 56,
    },
    97: {
      RPC_URL: process.env.BINANCE_CHAIN_TESTNET_RPC_URL,
      CHAIN_ID: 97,
    },
    137: {
      RPC_URL: process.env.POLYGON_MAINNET_RPC_URL,
      CHAIN_ID: 137,
    },
    80001: {
      RPC_URL: process.env.POLYGON_TESTNET_RPC_URL,
      CHAIN_ID: 80001,
    },
    CUSTOM: {
      RPC_URL: process.env.CUSTOM_RPC_URL,
      CHAIN_ID: process.env.CUSTOM_CHAIN_ID,
    },
    1028: {
      RPC_URL: "https://api.shasta.trongrid.io/jsonrpc",
      CHAIN_ID: 1028,
    },
    51: {
      RPC_URL: "https://rpc.apothem.network",
      CHAIN_ID: 51,
    },
    64: {
      RPC_URL: "https://rpc.gnosischain.com/",
      CHAIN_ID: 64,
    },
    338: {
      RPC_URL: "https://evm-t3.cronos.org",
      CHAIN_ID: 338,
    },
    11155111: {
      RPC_URL: process.env.SEPOLIA_RPC_URL,
      CHAIN_ID: 11155111,
    },

    29548: {
      RPC_URL: "https://rpc.oasys.mycryptoheroes.net/",
      CHAIN_ID: 29548,
    },

    420: {
      RPC_URL: process.env.OPTIMISM_GOERLI_RPC_URL,
      CHAIN_ID: 420,
    },

    10009: {
      RPC_URL: process.env.CALDERA_POLYGON_RPC_URL,
      CHAIN_ID: 10009,
    },
    9981: {
      RPC_URL: process.env.CALDERA_GOERLI_RPC_URL,
      CHAIN_ID: 9981,
    },
    222: {
      RPC_URL: process.env.CONDUIT_RPC_URL,
      CHAIN_ID: 222,
    },
    44787: {
      RPC_URL: process.env.CELO_TESTNET_RPC_URL,
      CHAIN_ID: 44787,
    },
    42220: {
      RPC_URL: process.env.CELO_MAINNET_RPC_URL,
      CHAIN_ID: 42220,
    },
    534351: {
      RPC_URL: process.env.SCROLL_TESTNET_RPC_URL,
      CHAIN_ID: 534351,
    },
    1442: {
      RPC_URL: process.env.ZKEVM_TESTNET_RPC_URL,
      CHAIN_ID: 1442,
    },
    5001: {
      RPC_URL: process.env.MANTLE_TESTNET_RPC_URL,
      CHAIN_ID: 5001,
    },

    421613: {
      RPC_URL: process.env.ARBITRUM_GOERLI_RPC_URL,
      CHAIN_ID: 421613,
    },
    421614: {
      RPC_URL: process.env.ARBITRUM_SEPOLIA_RPC_URL,
      CHAIN_ID: 421614,
    },
    420: {
      RPC_URL: process.env.OPTIMISM_GOERLI_RPC_URL,
      CHAIN_ID: 420,
    },
    314159: {
      RPC_URL: process.env.FILECOIN_TESTNET_RPC_URL,
      CHAIN_ID: 314159,
    },
    84531: {
      RPC_URL: process.env.BASE_GOERLI_RPC_URL,
      CHAIN_ID: 84531,
    },
    84532: {
      RPC_URL: process.env.BASE_SEPOLIA_RPC_URL,
      CHAIN_ID: 84532,
    },
    59140: {
      RPC_URL: process.env.LINEA_GOERLI_RPC_URL,
      CHAIN_ID: 59140,
    },
    43113: {
      RPC_URL: process.env.AVALANCHE_TESTNET_RPC_URL,
      CHAIN_ID: 43113,
    },
  },

  PRIVATE_KEYS: privateKeys,

  REPORT_GAS: process.env.REPORT_GAS || true,

  ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
  POLYGONSCAN_API_KEY: process.env.POLYGONSCAN_API_KEY,
  OPTIMISM_API_KEY: process.env.OPTIMISM_API_KEY,
  CELOSCAN_API_KEY: process.env.CELOSCAN_API_KEY,
  SCROLLSCAN_API_KEY: process.env.SCROLLSCAN_API_KEY,
  MANTLESCAN_API_KEY: process.env.MANTLESCAN_API_KEY,
  ZKEVMSCAN_API_KEY: process.env.ZKEVMSCAN_API_KEY,
  BASESCAN_API_KEY: process.env.BASESCAN_API_KEY,
};
