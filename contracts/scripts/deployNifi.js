const { artifacts, ethers, upgrades } = require("hardhat");

const deploySettings = require("./deploySettings");
const { getChain } = require("../utils/chainsHelper");
const deployContract = require("../utils/deployContract");
const deployUpgradableContract = require("../utils/deployUpgradableContract");
const getNamedSigners = require("../utils/getNamedSigners");
const readFromConfig = require("../utils/readFromConfig");
const saveToConfig = require("../utils/saveToConfig");
const verifyUpgradableContract = require("../utils/verifyUpgradableContract");

const getDeployHelpers = async () => {
  const chainId = await hre.getChainId();
  const CHAIN_NAME = getChain(chainId).name;
  const { payDeployer } = await getNamedSigners();
  return { chainId, CHAIN_NAME, payDeployer };
};

async function main() {
  const deployHelpers = await getDeployHelpers();
  const owner = deploySettings["COMMON"].OWNER_ADDRESS;
  const deployedAddress = await deployContract(
    hre,
    deployHelpers.chainId,
    "Nifi",
    deployHelpers.payDeployer,
    [owner],
  );

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
