const { artifacts, ethers, upgrades } = require("hardhat");
const getNamedSigners = require("./getNamedSigners");
const saveToConfig = require("./saveToConfig");
const readFromConfig = require("./readFromConfig");
const { getChain } = require("./chainsHelper");

const deployUpgradableContract = async (
  hre,
  chainId,
  contractName,
  deployer,
  initializerParams,
) => {
  const chainInfo = getChain(chainId);
  const Contract = await ethers.getContractFactory(contractName);
  Contract.connect(deployer);

  const contractABI = (await artifacts.readArtifact(contractName)).abi;
  await saveToConfig(contractName, "ABI", contractABI, chainId);

  console.log(
    `Deployig contract ${contractName} to ${chainInfo.name} using deployer address ${deployer.address}`,
  );
  const contractInstance = await upgrades.deployProxy(Contract, initializerParams, {
    initializer: "initialize",
    kind: "uups",
  });
  let tx = await contractInstance.waitForDeployment();
  const deployedContractAddress = await contractInstance.getAddress();
  await saveToConfig(contractName, "ADDRESS", deployedContractAddress, chainId);

  let implementationAddress =
    await upgrades.erc1967.getImplementationAddress(deployedContractAddress);

  console.log(`!-------Deploy Info----------!
Contract Name: ${contractName}
Chain: ${chainInfo.name}
ChainId: ${chainId}
Deployment Transaction hash : ${tx.deploymentTransaction().hash}
Deployed Proxy Contract Address: ${deployedContractAddress}
Deployed Implementation Contract Address: ${implementationAddress}
!----------------------------!`);

  return deployedContractAddress;
};

module.exports = deployUpgradableContract;
