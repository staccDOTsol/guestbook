require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
const { ethers } = require("hardhat");
const contract = require("../artifacts/contracts/BadgeToken.sol/Saucey.json");
const contractInterface = contract.abi;

// https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html#provider-object
let provider = ethers.provider;
const ehs = ["QmW1t8P1sip9adUdHo8FvDUKP6GfKjnvNWHeDk2FCm3jMX",
"QmPKKke6p448mAiu2dgVvDSXrqVPjS1gCEVJqzbebSZUvy",
"QmfKbcAWKiiFyAcGG6AjVMpDwDTuePoAfQAFy9p96hNv1T",
"Qmbg82XW7hMfmnFPoaxp8KdNsybn3LH5rexr6LJvZMSixt",
"QmY6cT5mYftNuDnbB7MiSj5y4FHARCUfKprE41oFBpaMaC"]
let tokenURI = "ipfs://ipfs/" + ehs[0]//"https://bafkreifvtwuiypleu4vv7edh4zclmymp5ixh44xxmd3hb2imiqa7mp2c3a.ipfs.dweb.link/";
const privateKey = `0x3c87e691593bd57b5030f769827ef634061bdaf1c77f155711f4db69ffa589f2`;
const wallet = new ethers.Wallet(privateKey);

wallet.provider = provider;
const signer = wallet.connect(provider);

// https://docs.ethers.io/v5/api/contract/contract
const nft = new ethers.Contract(
  "0xDEb3B64D4958c2c44f2AEAF4e14271e4d9E39f77",
  contractInterface,
  signer
);

const main = async () => {
  /*
  nft
    .mintNFT("0xb04006D2AEf65D05Fc480FAd3ab15FF76738e470", tokenURI, "0x594825e633F69dA6aB1032FaA6E3fbA1370BD59B", {value:ethers.utils.parseEther("0.05"), gasPrice: 8000000000})
  
    .then((tx) => tx.wait(5))
    .then((receipt) => console.log(`Your transaction is confirmed, its receipt is: ${receipt.transactionHash}`))

    .catch((e) => console.log("something went wrong", e));
   
  nft
  .mintNFT("0xb04006D2AEf65D05Fc480FAd3ab15FF76738e470", tokenURI, "0xd03d0b1bebe7ec88b16297f229f7362b7420585c", {value:ethers.utils.parseEther("0.05"), gasPrice: 16000000000})

  .then((tx) => tx.wait(5))
  .then((receipt) => console.log(`Your transaction is confirmed, its receipt is: ${receipt.transactionHash}`))

  .catch((e) => console.log("something went wrong", e));
 */
  blarg = await nft.getBalance()
  let sixfour = ethers.BigNumber.from( (blarg * 0.64).toString())
  let threefour = ethers.BigNumber.from( (blarg * 0.34).toString())
    nft.sendViaCall("0xb04006D2AEf65D05Fc480FAd3ab15FF76738e470", "0xd03d0b1bebe7ec88b16297f229f7362b7420585c", (sixfour), (threefour), {gasPrice: 8000000000})
    .then((tx) => tx.wait(5))  .then((receipt) => console.log(`Your transaction is confirmed, its receipt is: ${receipt.transactionHash}`))
  
      .catch((e) => console.log("something went wrong", e));
    console.log("Waiting 5 blocks for confirmation...");
};

main();
