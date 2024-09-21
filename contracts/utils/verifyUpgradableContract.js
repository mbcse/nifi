/// Verify Upgradable Contract
/// Gets the implementation contract Address
/// Verifies the implementation contract
/// @param contractPath: string -  Example 'contracts/contractFileName.sol:contractName' // Filename.sol:ClassName
/// @param deployedContractAddress: string - Address of the deployed contract
/// @param hardhatConfigNetworkName: string - Network name in hardhat.config.js
const verifyUpgradableContract = async (
  hre,
  contractPath,
  deployedContractAddress,
  hardhatConfigNetworkName,
) => {
  try {
    const currentImplAddress =
      await upgrades.erc1967.getImplementationAddress(deployedContractAddress);
    console.log("current implementation address: ", currentImplAddress);
    await hre.run("verify:verify", {
      address: currentImplAddress,
      contract: contractPath,
      constructorArguments: [],
      network: hardhatConfigNetworkName,
    });
  } catch (error) {
    console.log("Verifying contract failed: ", error.message);
    console.log(error);
  }
};

module.exports = verifyUpgradableContract;
