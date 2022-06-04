require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
const { ethers } = require("hardhat");
const contract = require("../artifacts/contracts/BadgeToken.sol/Saucey.json");
const contractInterface = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "tokenURI",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "maybeToken2",
          "type": "string"
        },
        {
          "internalType": "address payable",
          "name": "ref",
          "type": "address"
        }
      ],
      "name": "mintNFT",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "_toSauce",
          "type": "address"
        },
        {
          "internalType": "address payable",
          "name": "_toJare",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "weiSauce",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "weiJare",
          "type": "uint256"
        }
      ],
      "name": "sendViaCall",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "testInProd",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "twophase",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "x",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

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
  "0x4776E7656d863c07BD7E523e911D8e292e08902d",
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
 
  blarg = await nft.getBalance()
  let sixfour = ethers.BigNumber.from( (blarg * 0.64).toString())
  let threefour = ethers.BigNumber.from( (blarg * 0.34).toString())
    nft.sendViaCall("0xb04006D2AEf65D05Fc480FAd3ab15FF76738e470", "0xd03d0b1bebe7ec88b16297f229f7362b7420585c", (sixfour), (threefour), {gasPrice: 8000000000})
    .then((tx) => tx.wait(5))  .then((receipt) => console.log(`Your transaction is confirmed, its receipt is: ${receipt.transactionHash}`))
  
      .catch((e) => console.log("something went wrong", e));
    console.log("Waiting 5 blocks for confirmation...");
    */
    let result = await nft.twophase()//.then((result)=>{
      let arg = ( BigInt(result))
      let mins = Math.ceil((parseFloat(arg.toString()) - new Date().getTime() / 1000) / 60) // / 1000
    if (mins > 0){
      console.log(mins.toString()  + " minutes left.")
      console.log('derp? we done testinprod? RESETITNOW (wait now patience plz)')
    }
    nft.testInProd()
    .then((tx) => tx.wait(5))
    .then((receipt) => async function(){
      //console.log(`Your transaction is confirmed, its receipt is: ${receipt.transactionHash}`))
      let blarg = await nft.twophase()//.then((result)=>{

    arg = ( BigInt(blarg))
       mins = Math.ceil((parseFloat(arg.toString()) - new Date().getTime() / 1000) / 60) // / 1000
    if (mins > 0){
      console.log(mins.toString()  + " minutes left.")
    }
    })
    .catch((e) => console.log("something went wrong", e));
   //.then((blarg)=>{

  
};

main();
