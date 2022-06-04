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
         accounts: [`0x3c87e691593bd57b5030f769827ef634061bdaf1c77f155711f4db69ffa589f2`]
      }
   },
}

