/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
module.exports = {
   solidity: "0.8.0",
   networks: {
      hardhat: {},
    
      rinkeby: { gas: 30000000, gasLimit: 90000000,
         url: "https://arbitrum-mainnet.infura.io/v3/d0a4afbb942449779d66b2135c1ee5bd",
         accounts: [`0xbfef7c76dbe227785366c7d85c6113aa0fca53f45d69dd54a569fc8700e73c19`]
      }
   },
}

