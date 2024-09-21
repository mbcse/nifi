require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-web3");
require("@openzeppelin/hardhat-upgrades");

require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-contract-sizer");

require("hardhat-interface-generator");
require("hardhat-deploy");
const ethers = require("ethers");

const { getAllChains } = require("./utils/chainsHelper");

require("./tasks");
const config = require("./config");

function getPrivateKeys() {
  const privateKeys = config.PRIVATE_KEYS;
  // if(Object.keys(privateKeys).length === 0){
  //   throw new Error("Please provide private keys in privateKeys.json file for setup")
  // }
  const privateKeysArray = [];

  for (const [, value] of Object.entries(privateKeys)) {
    privateKeysArray.push(value);
  }
  return privateKeysArray;
}

function getNamedAccounts() {
  const privateKeys = config.PRIVATE_KEYS;
  // if(Object.keys(privateKeys).length === 0){
  //   throw new Error("Please provide private keys in privateKeys.json file for setup")
  // }
  const privateKeysObject = {};

  for (const [name, value] of Object.entries(privateKeys)) {
    privateKeysObject[name] = { default: new ethers.Wallet(value).address };
  }
  return privateKeysObject;
}

function getNetworks() {
  let networks = {
    8545: {
      url: "http://127.0.0.1:8545",
      accounts: getPrivateKeys(),
    },
    10023: {
      url: "https://ethereumplus.pwrlabs.io/",
      accounts: getPrivateKeys(),
    },
  };

  const evmChainsData = getAllChains();
  for (let i = 0; i < evmChainsData.length; i++) {
    const chain = evmChainsData[i];
    const chainId = chain.chainId;
    if (chain.rpc && chain.rpc.length > 0) {
      networks[chainId.toString()] = {
        url: chain.rpc[0],
        accounts: getPrivateKeys(),
      };
    }
  }

  return networks;
}

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          viaIR: true,
        },
      },
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          viaIR: true,
        },
      },

      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          viaIR: true,
        },
      },
      {
        version: "0.8.15",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          viaIR: true,
        },
      },
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          viaIR: true,
        },
      },
    ],
  },
  networks: getNetworks(),
  gasReporter: {
    enabled: config.REPORT_GAS,
    currency: "USD",
  },

  etherscan: {
    apiKey: {
      polygonMumbai: config.POLYGONSCAN_API_KEY,
      sepolia: config.ETHERSCAN_API_KEY,
      goerli: config.ETHERSCAN_API_KEY,
      polygon: config.POLYGONSCAN_API_KEY,
      optimistic_goerli: config.OPTIMISM_API_KEY,
      celo_testnet: config.CELOSCAN_API_KEY,
      celo_mainnet: config.CELOSCAN_API_KEY,
      mantle_testnet: config.MANTLESCAN_API_KEY,
      zkevm_testnet: config.ZKEVMSCAN_API_KEY,
      scroll_testnet: config.SCROLLSCAN_API_KEY,
      avalancheFujiTestnet: "snowtrace",
      84532: config.BASESCAN_API_KEY,
    },
    customChains: [
      {
        network: "84532",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org/",
        },
      },
    ],
  },

  namedAccounts: getNamedAccounts(),

  mocha: {
    timeout: 500000,
  },
};
