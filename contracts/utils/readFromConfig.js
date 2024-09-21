const pathAbi = "./contractABIData.json";
const pathContractAddresses = "./contractAddresses.json";
const { constants } = require("fs");
const fs = require("fs").promises;

async function checkFileExists(file) {
  return fs
    .access(file, constants.F_OK)
    .then(() => true)
    .catch(() => false);
}

const getFieldPath = (fieldType) => {
  switch (fieldType) {
    case "ABI":
      return pathAbi;
    case "ADDRESS":
      return pathContractAddresses;
    default:
      throw new Error(`Unknown field type ${fieldType}`);
  }
};

async function readFromConfig(contractName, fieldType, chainId) {
  const path = getFieldPath(fieldType);
  try {
    if (!(await checkFileExists(path))) {
      await fs.writeFile(path, JSON.stringify({}, null, 4));
    }
    const contractConfig = JSON.parse(await fs.readFile(path));
    const chainData = contractConfig[chainId];
    const keyName = `${contractName.toUpperCase()}`;
    return chainData[keyName];
  } catch (err) {
    console.log(err);
    console.log(`Couldn't Read ${fieldType} for contract ${contractName} from config`);
    throw err;
  }
}

module.exports = readFromConfig;
