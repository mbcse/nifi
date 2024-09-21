const request = require("sync-request");

function syncHttpsGet(url) {
  try {
    const response = request("GET", url);
    if (response.statusCode === 200) {
      const body = response.getBody("utf8");
      return JSON.parse(body);
    } else {
      console.error(`HTTP error! Status: ${response.statusCode}`);
    }
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
}

const chainUrls = "https://chainid.network/chains.json";

let ALL_CHAINS;

const getAllChains = () => {
  if (ALL_CHAINS) {
    return ALL_CHAINS;
  } else {
    const chains = syncHttpsGet(chainUrls);
    ALL_CHAINS = chains;
    return chains;
  }
};

const getChain = (chainId) => {
  const chains = getAllChains();
  chains.push( {
    name: 'pwr',
    chainId: '10023'
  })

  return chains.find((chain) => chain.chainId == chainId.toString());
};

module.exports = { getAllChains, getChain };
