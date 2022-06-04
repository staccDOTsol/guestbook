/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
module.exports = {
   solidity: "0.8.0",
   networks: {
      hardhat: {},
      rinkeby: { gas: 5500000, gasPrice: 8000000000,
         url: "https://eth-rinkeby.alchemyapi.io/v2/EZtVTwrnJpGYaxXMmBKxeDp7YtkatbsD",
         accounts: [`0xe93aab87410511b8d9125d3b0b942c8f7c2feddfc4c34930bb2a9bb427aa3050`]
      },
      mainnet: { gas: 5500000, gasPrice: 36138666420,
         url: "https://eth-mainnet.alchemyapi.io/v2/NwjAINr_QVzfyoylRKpWmIBHYhFuQ330",
         accounts: [`0xe93aab87410511b8d9125d3b0b942c8f7c2feddfc4c34930bb2a9bb427aa3050`]
      }
   },
}

