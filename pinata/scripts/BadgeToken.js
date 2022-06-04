 // scripts/Saucey.js

const hre = require("hardhat");

async function main() {

  const Saucey = await hre.ethers.getContractFactory("Saucey");
  console.log('Deploying Saucey ERC721 token...');
  const token = await Saucey.deploy();

  await token.deployed();
 // await Saucey.mintNft("0xb04006D2AEf65D05Fc480FAd3ab15FF76738e470","ipfs://ipfs/QmexPSS1j67i5ysSzMT6j89DgH64baMgtacUB5KrysCnfi")
  console.log("Saucey deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
