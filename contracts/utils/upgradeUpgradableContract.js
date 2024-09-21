const { artifacts, ethers, upgrades } = require("hardhat");
const getNamedSigners = require("./getNamedSigners");
const saveToConfig = require("./saveToConfig");
const readFromConfig = require("./readFromConfig");
const { getChain } = require("./chainsHelper");

const upgradeUpgradableContract = async (hre, chainId, contractName, deployer) => {
  const chainInfo = getChain(chainId);
  const Contract = await ethers.getContractFactory(contractName);
  Contract.connect(deployer);

  const contractABI = (await artifacts.readArtifact(contractName)).abi;
  await saveToConfig(contractName, "ABI", contractABI, chainId);

  const proxyContractAddress = await readFromConfig(contractName, "ADDRESS", chainId);

  console.log("Upgrading contract address: ", proxyContractAddress);

  const oldImplementationAddress =
    await upgrades.erc1967.getImplementationAddress(proxyContractAddress);
  console.log(
    `Upgrading contract ${contractName} on ${chainInfo.name} using upgrader address ${deployer.address}`,
  );
  const tx = await upgrades.upgradeProxy(proxyContractAddress, Contract, { kind: "uups" });
  await tx.deployTransaction.wait();
  const newImplementationAddress =
    await upgrades.erc1967.getImplementationAddress(proxyContractAddress);

  console.log(`!-------Upgrade Info----------!
Contract Name: ${contractName}
Chain: ${chainInfo.name}
ChainId: ${chainId}
Upgrade Transaction hash : ${tx.deployTransaction.hash}
Proxy Contract Address: ${proxyContractAddress}
Old Implementation Contract Address : ${oldImplementationAddress}
New Implementation Contract Address: ${newImplementationAddress}
!----------------------------!`);

  return proxyContractAddress;
};

module.exports = upgradeUpgradableContract;
