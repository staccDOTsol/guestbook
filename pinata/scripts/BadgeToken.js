 // scripts/StaccStaccs.js

const hre = require("hardhat");

async function main() {

  const StaccStaccs = await hre.ethers.getContractFactory("StaccStaccs");
  console.log('Deploying StaccStaccs ERC721 token...');
  const token = await StaccStaccs.deploy();

  await token.deployed();
 // await StaccStaccs.mintNft("0xb04006D2AEf65D05Fc480FAd3ab15FF76738e470","ipfs://ipfs/QmexPSS1j67i5ysSzMT6j89DgH64baMgtacUB5KrysCnfi")
  console.log("StaccStaccs deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
