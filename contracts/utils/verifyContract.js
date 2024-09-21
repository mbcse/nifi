/// Verify Non-Upgradable Normal Contract
/// Gets the implementation contract Address
/// Verifies the implementation contract
/// @param contractPath: string -  Example 'contracts/contractFileName.sol:contractName' // Filename.sol:ClassName
/// @param deployedContractAddress: string - Address of the deployed contract
/// @param hardhatConfigNetworkName: string - Network name in hardhat.config.js
/// @param constructorParams: array - Array of constructor parameters
const verifyContract = async (
  hre,
  contractPath,
  deployedContractAddress,
  hardhatConfigNetworkName,
  constructorParams,
) => {
  try {
    await hre.run("verify:verify", {
      address: deployedContractAddress,
      contract: contractPath,
      constructorArguments: constructorParams,
      network: hardhatConfigNetworkName,
    });
  } catch (error) {
    console.log("Verifying contract failed: ", error.message);
    console.log(error);
  }
};

module.exports = verifyContract;
