

import styled from "styled-components";
import BN from 'bn.js';
import { Button, Box, setRef } from '@material-ui/core'
import confetti from "canvas-confetti";
import {LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";
import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import {GatewayProvider} from '@civic/solana-gateway-react';
import {Snackbar, Paper, LinearProgress, Chip} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import {toDate, AlertState, getAtaForMint} from './utils';
import {MintButton} from './MintButton';  
import {useLocation, useParams} from "react-router-dom";
import "./styles.css";
import YoutubeEmbed from "./embed";

import 'regenerator-runtime/runtime';
import PropTypes from 'prop-types';
import Big from 'big.js';
import { createTheme, ThemeProvider, TextField } from "@material-ui/core";

import "./App.css";

import ReactDOM from 'react-dom';
import getConfig from './config.js';
import * as nearAPI from 'near-api-js';

import React, {useEffect, useState } from 'react';

import {ethers} from 'ethers'
import Countdown from "react-countdown";
import { deployContract } from "near-api-js/lib/transaction";

let currentAccount = ""
let addressContract='0x4e02167a319DFa12e0B6565Fc49aD11eDdCD8c28'


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
    "name": "burn",
    "outputs": [],
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
    "inputs": [],
    "name": "getPrice",
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
    "inputs": [],
    "name": "totalSupply",
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

declare let window:any


require('@solana/wallet-adapter-react-ui/styles.css');

const txTimeout = 30000; // milliseconds (confirm this works for your project)



const theme = createTheme({
    palette: {
        type: 'dark',
    },
    overrides: {
        MuiButtonBase: {
            root: {
                justifyContent: 'flex-start',
            },
        },
        MuiButton: {
            root: {
                textTransform: undefined,
                padding: '12px 16px',
            },
            startIcon: {
                marginRight: 8,
            },
            endIcon: {
                marginLeft: 8,
            },
        },
    },
});
const WalletContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: right;
`;

const WalletAmount = styled.div`
  color: black;
  padding: 5px 5px 5px 16px;
  border-radius: 42px;
  background-color: var(--main-text-color);
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
  box-sizing: border-box;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-weight: 500;
  line-height: 1.75;
  text-transform: uppercase;
  border: 0;
  margin: 0;
  display: inline-flex;
  outline: 0;
  position: relative;
  align-items: center;
  user-select: none;
  vertical-align: middle;
  justify-content: flex-start;
  gap: 10px;
`;

const Wallet = styled.ul`
  flex: 0 0 auto;
  margin: 0;
  padding: 0;
`;

const NFT = styled(Paper)`
  min-width: 500px;
  margin: 0 auto;
  padding: 5px 20px 20px 20px;
  flex: 1 1 auto;
  background-color: var(--card-background-color) !important;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22) !important;
`;

const Card = styled(Paper)`
  display: inline-block;
  background-color: var(--countdown-background-color) !important;
  margin: 5px;
  min-width: 40px;
  padding: 24px;
  h1{
    margin:0px;
  }
`;

const MintButtonContainer = styled.div`
  button.MuiButton-contained:not(.MuiButton-containedPrimary).Mui-disabled {
    color: #464646;
  }

  button.MuiButton-contained:not(.MuiButton-containedPrimary):hover,
  button.MuiButton-contained:not(.MuiButton-containedPrimary):focus {
    -webkit-animation: pulse 1s;
    animation: pulse 1s;
    box-shadow: 0 0 0 2em rgba(255, 255, 255, 0);
  }

  @-webkit-keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 #ef8f6e;
    }
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 #ef8f6e;
    }
  }
`;

const SolExplorerLink = styled.a`
  color: var(--title-text-color);
  border-bottom: 1px solid var(--title-text-color);
  font-weight: bold;
  list-style-image: none;
  list-style-position: outside;
  list-style-type: none;
  outline: none;
  text-decoration: none;
  text-size-adjust: 100%;

  :hover {
    border-bottom: 2px solid var(--title-text-color);
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 4%;
  margin-left: 4%;
  text-align: center;
  justify-content: center;
`;

const MintContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  flex-wrap: wrap;
  gap: 20px;
`;

const DesContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  gap: 20px;
`;

const Price = styled(Chip)`
  position: absolute;
  margin: 5px;
  font-weight: bold;
  font-size: 1.2em !important;
  font-family: 'Patrick Hand', cursive !important;
`;

const Image = styled.img`
  height: 400px;
  width: auto;
  border-radius: 7px;
  box-shadow: 5px 5px 40px 5px rgba(0,0,0,0.5);
`;

const BorderLinearProgress = styled(LinearProgress)`
  margin: 20px;
  height: 10px !important;
  border-radius: 30px;
  border: 2px solid white;
  box-shadow: 5px 5px 40px 5px rgba(0,0,0,0.5);
  background-color:var(--main-text-color) !important;
  
  > div.MuiLinearProgress-barColorPrimary{
    background-color:var(--title-text-color) !important;
  }

  > div.MuiLinearProgress-bar1Determinate {
    border-radius: 30px !important;
    background-image: linear-gradient(270deg, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.5));
  }
`;
const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

export interface HomeProps {
}
let contract: any
let provider: any 
let erc20: any
const compileContract: any = {
  "_format": "hh-sol-artifact-1",
  "contractName": "StaccStaccs",
  "sourceName": "contracts/BadgeToken.sol",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_ticker",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_length",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_base",
          "type": "uint256"
        },
        {
          "internalType": "string[]",
          "name": "_staccs",
          "type": "string[]"
        },
        {
          "internalType": "uint256",
          "name": "_increment",
          "type": "uint256"
        }
      ],
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
      "name": "burn",
      "outputs": [],
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
      "inputs": [],
      "name": "getPrice",
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
          "internalType": "address payable",
          "name": "ref",
          "type": "address"
        },
        {
          "internalType": "address payable",
          "name": "_toJare",
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
      "inputs": [],
      "name": "totalSupply",
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
  ],
  "bytecode": "0x608060405260405180602001604052806040518060200160405280600081525081525060089060016200003492919062000245565b506040518060400160405280600781526020017f697066733a2f2f00000000000000000000000000000000000000000000000000815250600c908051906020019062000082929190620002ac565b506032600d5561c350600f556127106010556003601155348015620000a657600080fd5b5060405162004216380380620042168339818101604052810190620000cc919062000655565b86868160009080519060200190620000e6929190620002ac565b508060019080519060200190620000ff929190620002ac565b50505062000122620001166200017760201b60201c565b6200017f60201b60201c565b6008808054620001349291906200033d565b5084600d8190555083600f8190555082601081905550816008908051906020019062000162929190620003ae565b508060118190555050505050505050620008d1565b600033905090565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b82805482825590600052602060002090810192821562000299579160200282015b828111156200029857825182908051906020019062000287929190620002ac565b509160200191906001019062000266565b5b509050620002a8919062000415565b5090565b828054620002ba9062000823565b90600052602060002090601f016020900481019282620002de57600085556200032a565b82601f10620002f957805160ff19168380011785556200032a565b828001600101855582156200032a579182015b82811115620003295782518255916020019190600101906200030c565b5b5090506200033991906200043d565b5090565b8280548282559060005260206000209081019282156200039b5760005260206000209182015b828111156200039a5782829080546200037c9062000823565b620003899291906200045c565b509160010191906001019062000363565b5b509050620003aa919062000415565b5090565b82805482825590600052602060002090810192821562000402579160200282015b8281111562000401578251829080519060200190620003f0929190620002ac565b5091602001919060010190620003cf565b5b50905062000411919062000415565b5090565b5b808211156200043957600081816200042f9190620004f4565b5060010162000416565b5090565b5b80821115620004585760008160009055506001016200043e565b5090565b8280546200046a9062000823565b90600052602060002090601f0160209004810192826200048e5760008555620004e1565b82601f10620004a15780548555620004e1565b82800160010185558215620004e157600052602060002091601f016020900482015b82811115620004e0578254825591600101919060010190620004c3565b5b509050620004f091906200043d565b5090565b508054620005029062000823565b6000825580601f1062000516575062000537565b601f0160209004906000526020600020908101906200053691906200043d565b5b50565b6000620005516200054b8462000781565b6200074d565b9050808382526020820190508260005b858110156200059557815185016200057a888262000611565b84526020840193506020830192505060018101905062000561565b5050509392505050565b6000620005b6620005b084620007b0565b6200074d565b905082815260208101848484011115620005cf57600080fd5b620005dc848285620007ed565b509392505050565b600082601f830112620005f657600080fd5b8151620006088482602086016200053a565b91505092915050565b600082601f8301126200062357600080fd5b8151620006358482602086016200059f565b91505092915050565b6000815190506200064f81620008b7565b92915050565b600080600080600080600060e0888a0312156200067157600080fd5b600088015167ffffffffffffffff8111156200068c57600080fd5b6200069a8a828b0162000611565b975050602088015167ffffffffffffffff811115620006b857600080fd5b620006c68a828b0162000611565b9650506040620006d98a828b016200063e565b9550506060620006ec8a828b016200063e565b9450506080620006ff8a828b016200063e565b93505060a088015167ffffffffffffffff8111156200071d57600080fd5b6200072b8a828b01620005e4565b92505060c06200073e8a828b016200063e565b91505092959891949750929550565b6000604051905081810181811067ffffffffffffffff8211171562000777576200077662000888565b5b8060405250919050565b600067ffffffffffffffff8211156200079f576200079e62000888565b5b602082029050602081019050919050565b600067ffffffffffffffff821115620007ce57620007cd62000888565b5b601f19601f8301169050602081019050919050565b6000819050919050565b60005b838110156200080d578082015181840152602081019050620007f0565b838111156200081d576000848401525b50505050565b600060028204905060018216806200083c57607f821691505b6020821081141562000853576200085262000859565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620008c281620007e3565b8114620008ce57600080fd5b50565b61393580620008e16000396000f3fe60806040526004361061014b5760003560e01c806370a08231116100b6578063a22cb4651161006f578063a22cb46514610487578063b88d4fde146104b0578063c87b56dd146104d9578063e75e042214610516578063e985e9c514610541578063f2fde38b1461057e5761014b565b806370a0823114610382578063715018a6146103bf57806373717956146103d65780638da5cb5b1461040657806395d89b411461043157806398d5fdca1461045c5761014b565b806318160ddd1161010857806318160ddd1461027457806323b872dd1461029f5780632f08a91d146102c857806342842e0e146102f357806342966c681461031c5780636352211e146103455761014b565b806301ffc9a71461015057806306fdde031461018d578063081812fc146101b8578063095ea7b3146101f55780630c55699c1461021e57806312065fe014610249575b600080fd5b34801561015c57600080fd5b50610177600480360381019061017291906128f6565b6105a7565b60405161018491906131cf565b60405180910390f35b34801561019957600080fd5b506101a2610689565b6040516101af91906131ea565b60405180910390f35b3480156101c457600080fd5b506101df60048036038101906101da9190612948565b61071b565b6040516101ec9190613168565b60405180910390f35b34801561020157600080fd5b5061021c600480360381019061021791906128ba565b6107a0565b005b34801561022a57600080fd5b506102336108b8565b604051610240919061346c565b60405180910390f35b34801561025557600080fd5b5061025e6108c9565b60405161026b919061346c565b60405180910390f35b34801561028057600080fd5b506102896108d1565b604051610296919061346c565b60405180910390f35b3480156102ab57600080fd5b506102c660048036038101906102c191906127b4565b6108f6565b005b3480156102d457600080fd5b506102dd610956565b6040516102ea919061346c565b60405180910390f35b3480156102ff57600080fd5b5061031a600480360381019061031591906127b4565b6109f1565b005b34801561032857600080fd5b50610343600480360381019061033e9190612948565b610a11565b005b34801561035157600080fd5b5061036c60048036038101906103679190612948565b610af9565b6040516103799190613168565b60405180910390f35b34801561038e57600080fd5b506103a960048036038101906103a49190612700565b610bab565b6040516103b6919061346c565b60405180910390f35b3480156103cb57600080fd5b506103d4610c63565b005b6103f060048036038101906103eb9190612765565b610ceb565b6040516103fd919061346c565b60405180910390f35b34801561041257600080fd5b5061041b61116c565b6040516104289190613168565b60405180910390f35b34801561043d57600080fd5b50610446611196565b60405161045391906131ea565b60405180910390f35b34801561046857600080fd5b50610471611228565b60405161047e919061346c565b60405180910390f35b34801561049357600080fd5b506104ae60048036038101906104a9919061287e565b611232565b005b3480156104bc57600080fd5b506104d760048036038101906104d29190612803565b611248565b005b3480156104e557600080fd5b5061050060048036038101906104fb9190612948565b6112aa565b60405161050d91906131ea565b60405180910390f35b34801561052257600080fd5b5061052b6113fc565b604051610538919061346c565b60405180910390f35b34801561054d57600080fd5b5061056860048036038101906105639190612729565b611406565b60405161057591906131cf565b60405180910390f35b34801561058a57600080fd5b506105a560048036038101906105a09190612700565b61149a565b005b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061067257507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80610682575061068182611592565b5b9050919050565b60606000805461069890613713565b80601f01602080910402602001604051908101604052809291908181526020018280546106c490613713565b80156107115780601f106106e657610100808354040283529160200191610711565b820191906000526020600020905b8154815290600101906020018083116106f457829003601f168201915b5050505050905090565b6000610726826115fc565b610765576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161075c906133cc565b60405180910390fd5b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60006107ab82610af9565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561081c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108139061342c565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1661083b611668565b73ffffffffffffffffffffffffffffffffffffffff16148061086a575061086981610864611668565b611406565b5b6108a9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108a09061330c565b60405180910390fd5b6108b38383611670565b505050565b60006108c46009611729565b905090565b600047905090565b60006108dd600b611729565b6108e76009611729565b6108f19190613617565b905090565b610907610901611668565b82611737565b610946576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161093d9061344c565b60405180910390fd5b610951838383611815565b505050565b6000610960611668565b73ffffffffffffffffffffffffffffffffffffffff1661097e61116c565b73ffffffffffffffffffffffffffffffffffffffff16146109d4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109cb906133ec565b60405180910390fd5b62015180426109e39190613536565b600e81905550600e54905090565b610a0c83838360405180602001604052806000815250611248565b505050565b610a1b3382611737565b610a2457600080fd5b610a2d81611a7c565b610a37600b611acf565b3373ffffffffffffffffffffffffffffffffffffffff16600a610a586108c9565b610a62919061358c565b604051610a6e90613153565b60006040518083038185875af1925050503d8060008114610aab576040519150601f19603f3d011682016040523d82523d6000602084013e610ab0565b606091505b5050506001601154610ac29190613617565b610acc6009611729565b610ad69190613536565b601054610ae391906135bd565b600f54610af09190613617565b600f8190555050565b6000806002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610ba2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b999061334c565b60405180910390fd5b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610c1c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c139061332c565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b610c6b611668565b73ffffffffffffffffffffffffffffffffffffffff16610c8961116c565b73ffffffffffffffffffffffffffffffffffffffff1614610cdf576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cd6906133ec565b60405180910390fd5b610ce96000611ae5565b565b600073b04006d2aef65d05fc480fad3ab15ff76738e47073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614610d6f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d669061328c565b60405180910390fd5b6001610d7b6009611729565b610d859190613536565b601054610d9291906135bd565b600f54610d9f9190613617565b341061116057610daf600a611acf565b600d54610dbc600a611729565b1115610dcd57610dcc600a611bab565b5b610dd76009611acf565b6000610de36009611729565b9050610def8582611bb8565b610ece816008610dff600a611729565b81548110610e36577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b906000526020600020018054610e4b90613713565b80601f0160208091040260200160405190810160405280929190818152602001828054610e7790613713565b8015610ec45780601f10610e9957610100808354040283529160200191610ec4565b820191906000526020600020905b815481529060010190602001808311610ea757829003601f168201915b5050505050611d92565b600e54421161103657610ee1600a611acf565b600d54610eee600a611729565b1115610eff57610efe600a611bab565b5b610f096009611acf565b601154610f166009611729565b610f209190613536565b601054610f2d91906135bd565b600f54610f3a9190613536565b600f81905550610f4a6009611729565b9050610f568582611bb8565b611035816008610f66600a611729565b81548110610f9d577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b906000526020600020018054610fb290613713565b80601f0160208091040260200160405190810160405280929190818152602001828054610fde90613713565b801561102b5780601f106110005761010080835404028352916020019161102b565b820191906000526020600020905b81548152906001019060200180831161100e57829003601f168201915b5050505050611d92565b5b6011546110436009611729565b61104d9190613536565b60105461105a91906135bd565b600f546110679190613536565b600f819055508373ffffffffffffffffffffffffffffffffffffffff16600a34611091919061358c565b60405161109d90613153565b60006040518083038185875af1925050503d80600081146110da576040519150601f19603f3d011682016040523d82523d6000602084013e6110df565b606091505b5050508273ffffffffffffffffffffffffffffffffffffffff16600a34611106919061358c565b60405161111290613153565b60006040518083038185875af1925050503d806000811461114f576040519150601f19603f3d011682016040523d82523d6000602084013e611154565b606091505b50505080915050611165565b600080fd5b9392505050565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6060600180546111a590613713565b80601f01602080910402602001604051908101604052809291908181526020018280546111d190613713565b801561121e5780601f106111f35761010080835404028352916020019161121e565b820191906000526020600020905b81548152906001019060200180831161120157829003601f168201915b5050505050905090565b6000600f54905090565b61124461123d611668565b8383611e06565b5050565b611259611253611668565b83611737565b611298576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161128f9061344c565b60405180910390fd5b6112a484848484611f73565b50505050565b60606112b5826115fc565b6112f4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112eb906133ac565b60405180910390fd5b600060066000848152602001908152602001600020805461131490613713565b80601f016020809104026020016040519081016040528092919081815260200182805461134090613713565b801561138d5780601f106113625761010080835404028352916020019161138d565b820191906000526020600020905b81548152906001019060200180831161137057829003601f168201915b50505050509050600061139e611fcf565b90506000815114156113b45781925050506113f7565b6000825111156113e95780826040516020016113d192919061312f565b604051602081830303815290604052925050506113f7565b6113f284611fe6565b925050505b919050565b6000600e54905090565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6114a2611668565b73ffffffffffffffffffffffffffffffffffffffff166114c061116c565b73ffffffffffffffffffffffffffffffffffffffff1614611516576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161150d906133ec565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415611586576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161157d9061322c565b60405180910390fd5b61158f81611ae5565b50565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b60008073ffffffffffffffffffffffffffffffffffffffff166002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614159050919050565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff166116e383610af9565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600081600001549050919050565b6000611742826115fc565b611781576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611778906132ec565b60405180910390fd5b600061178c83610af9565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614806117ce57506117cd8185611406565b5b8061180c57508373ffffffffffffffffffffffffffffffffffffffff166117f48461071b565b73ffffffffffffffffffffffffffffffffffffffff16145b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff1661183582610af9565b73ffffffffffffffffffffffffffffffffffffffff161461188b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118829061324c565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156118fb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118f2906132ac565b60405180910390fd5b61190683838361208d565b611911600082611670565b6001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546119619190613617565b925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546119b89190613536565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4611a77838383612092565b505050565b611a8581612097565b6000600660008381526020019081526020016000208054611aa590613713565b905014611acc57600660008281526020019081526020016000206000611acb9190612537565b5b50565b6001816000016000828254019250508190555050565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000816000018190555050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611c28576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611c1f9061338c565b60405180910390fd5b611c31816115fc565b15611c71576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611c689061326c565b60405180910390fd5b611c7d6000838361208d565b6001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611ccd9190613536565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4611d8e60008383612092565b5050565b611d9b826115fc565b611dda576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611dd19061336c565b60405180910390fd5b80600660008481526020019081526020016000209080519060200190611e01929190612577565b505050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415611e75576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e6c906132cc565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051611f6691906131cf565b60405180910390a3505050565b611f7e848484611815565b611f8a848484846121b4565b611fc9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611fc09061320c565b60405180910390fd5b50505050565b606060405180602001604052806000815250905090565b6060611ff1826115fc565b612030576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016120279061340c565b60405180910390fd5b600061203a611fcf565b9050600081511161205a5760405180602001604052806000815250612085565b806120648461234b565b60405160200161207592919061312f565b6040516020818303038152906040525b915050919050565b505050565b505050565b60006120a282610af9565b90506120b08160008461208d565b6120bb600083611670565b6001600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461210b9190613617565b925050819055506002600083815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905581600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a46121b081600084612092565b5050565b60006121d58473ffffffffffffffffffffffffffffffffffffffff166124f8565b1561233e578373ffffffffffffffffffffffffffffffffffffffff1663150b7a026121fe611668565b8786866040518563ffffffff1660e01b81526004016122209493929190613183565b602060405180830381600087803b15801561223a57600080fd5b505af192505050801561226b57506040513d601f19601f82011682018060405250810190612268919061291f565b60015b6122ee573d806000811461229b576040519150601f19603f3d011682016040523d82523d6000602084013e6122a0565b606091505b506000815114156122e6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016122dd9061320c565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614915050612343565b600190505b949350505050565b60606000821415612393576040518060400160405280600181526020017f300000000000000000000000000000000000000000000000000000000000000081525090506124f3565b600082905060005b600082146123c55780806123ae90613745565b915050600a826123be919061358c565b915061239b565b60008167ffffffffffffffff811115612407577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156124395781602001600182028036833780820191505090505b5090505b600085146124ec576001826124529190613617565b9150600a85612461919061378e565b603061246d9190613536565b60f81b8183815181106124a9577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a856124e5919061358c565b945061243d565b8093505050505b919050565b6000808273ffffffffffffffffffffffffffffffffffffffff16803b806020016040519081016040528181526000908060200190933c51119050919050565b50805461254390613713565b6000825580601f106125555750612574565b601f01602090049060005260206000209081019061257391906125fd565b5b50565b82805461258390613713565b90600052602060002090601f0160209004810192826125a557600085556125ec565b82601f106125be57805160ff19168380011785556125ec565b828001600101855582156125ec579182015b828111156125eb5782518255916020019190600101906125d0565b5b5090506125f991906125fd565b5090565b5b808211156126165760008160009055506001016125fe565b5090565b600061262d612628846134b8565b613487565b90508281526020810184848401111561264557600080fd5b6126508482856136d1565b509392505050565b6000813590506126678161388c565b92915050565b60008135905061267c816138a3565b92915050565b600081359050612691816138ba565b92915050565b6000813590506126a6816138d1565b92915050565b6000815190506126bb816138d1565b92915050565b600082601f8301126126d257600080fd5b81356126e284826020860161261a565b91505092915050565b6000813590506126fa816138e8565b92915050565b60006020828403121561271257600080fd5b600061272084828501612658565b91505092915050565b6000806040838503121561273c57600080fd5b600061274a85828601612658565b925050602061275b85828601612658565b9150509250929050565b60008060006060848603121561277a57600080fd5b600061278886828701612658565b93505060206127998682870161266d565b92505060406127aa8682870161266d565b9150509250925092565b6000806000606084860312156127c957600080fd5b60006127d786828701612658565b93505060206127e886828701612658565b92505060406127f9868287016126eb565b9150509250925092565b6000806000806080858703121561281957600080fd5b600061282787828801612658565b945050602061283887828801612658565b9350506040612849878288016126eb565b925050606085013567ffffffffffffffff81111561286657600080fd5b612872878288016126c1565b91505092959194509250565b6000806040838503121561289157600080fd5b600061289f85828601612658565b92505060206128b085828601612682565b9150509250929050565b600080604083850312156128cd57600080fd5b60006128db85828601612658565b92505060206128ec858286016126eb565b9150509250929050565b60006020828403121561290857600080fd5b600061291684828501612697565b91505092915050565b60006020828403121561293157600080fd5b600061293f848285016126ac565b91505092915050565b60006020828403121561295a57600080fd5b6000612968848285016126eb565b91505092915050565b61297a8161364b565b82525050565b6129898161366f565b82525050565b600061299a826134e8565b6129a481856134fe565b93506129b48185602086016136e0565b6129bd8161387b565b840191505092915050565b60006129d3826134f3565b6129dd818561351a565b93506129ed8185602086016136e0565b6129f68161387b565b840191505092915050565b6000612a0c826134f3565b612a16818561352b565b9350612a268185602086016136e0565b80840191505092915050565b6000612a3f60328361351a565b91507f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008301527f63656976657220696d706c656d656e74657200000000000000000000000000006020830152604082019050919050565b6000612aa560268361351a565b91507f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008301527f64647265737300000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000612b0b60258361351a565b91507f4552433732313a207472616e736665722066726f6d20696e636f72726563742060008301527f6f776e65720000000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000612b71601c8361351a565b91507f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006000830152602082019050919050565b6000612bb160168361351a565b91507f4073746163636f766572666c6f77206f722062757374000000000000000000006000830152602082019050919050565b6000612bf160248361351a565b91507f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008301527f72657373000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000612c5760198361351a565b91507f4552433732313a20617070726f766520746f2063616c6c6572000000000000006000830152602082019050919050565b6000612c97602c8361351a565b91507f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860008301527f697374656e7420746f6b656e00000000000000000000000000000000000000006020830152604082019050919050565b6000612cfd60388361351a565b91507f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760008301527f6e6572206e6f7220617070726f76656420666f7220616c6c00000000000000006020830152604082019050919050565b6000612d63602a8361351a565b91507f4552433732313a2062616c616e636520717565727920666f7220746865207a6560008301527f726f2061646472657373000000000000000000000000000000000000000000006020830152604082019050919050565b6000612dc960298361351a565b91507f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460008301527f656e7420746f6b656e00000000000000000000000000000000000000000000006020830152604082019050919050565b6000612e2f602e8361351a565b91507f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60008301527f6578697374656e7420746f6b656e0000000000000000000000000000000000006020830152604082019050919050565b6000612e9560208361351a565b91507f4552433732313a206d696e7420746f20746865207a65726f20616464726573736000830152602082019050919050565b6000612ed560318361351a565b91507f45524337323155524953746f726167653a2055524920717565727920666f722060008301527f6e6f6e6578697374656e7420746f6b656e0000000000000000000000000000006020830152604082019050919050565b6000612f3b602c8361351a565b91507f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860008301527f697374656e7420746f6b656e00000000000000000000000000000000000000006020830152604082019050919050565b6000612fa160208361351a565b91507f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726000830152602082019050919050565b6000612fe1602f8361351a565b91507f4552433732314d657461646174613a2055524920717565727920666f72206e6f60008301527f6e6578697374656e7420746f6b656e00000000000000000000000000000000006020830152604082019050919050565b600061304760218361351a565b91507f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008301527f72000000000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b60006130ad60008361350f565b9150600082019050919050565b60006130c760318361351a565b91507f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60008301527f776e6572206e6f7220617070726f7665640000000000000000000000000000006020830152604082019050919050565b613129816136c7565b82525050565b600061313b8285612a01565b91506131478284612a01565b91508190509392505050565b600061315e826130a0565b9150819050919050565b600060208201905061317d6000830184612971565b92915050565b60006080820190506131986000830187612971565b6131a56020830186612971565b6131b26040830185613120565b81810360608301526131c4818461298f565b905095945050505050565b60006020820190506131e46000830184612980565b92915050565b6000602082019050818103600083015261320481846129c8565b905092915050565b6000602082019050818103600083015261322581612a32565b9050919050565b6000602082019050818103600083015261324581612a98565b9050919050565b6000602082019050818103600083015261326581612afe565b9050919050565b6000602082019050818103600083015261328581612b64565b9050919050565b600060208201905081810360008301526132a581612ba4565b9050919050565b600060208201905081810360008301526132c581612be4565b9050919050565b600060208201905081810360008301526132e581612c4a565b9050919050565b6000602082019050818103600083015261330581612c8a565b9050919050565b6000602082019050818103600083015261332581612cf0565b9050919050565b6000602082019050818103600083015261334581612d56565b9050919050565b6000602082019050818103600083015261336581612dbc565b9050919050565b6000602082019050818103600083015261338581612e22565b9050919050565b600060208201905081810360008301526133a581612e88565b9050919050565b600060208201905081810360008301526133c581612ec8565b9050919050565b600060208201905081810360008301526133e581612f2e565b9050919050565b6000602082019050818103600083015261340581612f94565b9050919050565b6000602082019050818103600083015261342581612fd4565b9050919050565b600060208201905081810360008301526134458161303a565b9050919050565b60006020820190508181036000830152613465816130ba565b9050919050565b60006020820190506134816000830184613120565b92915050565b6000604051905081810181811067ffffffffffffffff821117156134ae576134ad61384c565b5b8060405250919050565b600067ffffffffffffffff8211156134d3576134d261384c565b5b601f19601f8301169050602081019050919050565b600081519050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b600082825260208201905092915050565b600081905092915050565b6000613541826136c7565b915061354c836136c7565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115613581576135806137bf565b5b828201905092915050565b6000613597826136c7565b91506135a2836136c7565b9250826135b2576135b16137ee565b5b828204905092915050565b60006135c8826136c7565b91506135d3836136c7565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561360c5761360b6137bf565b5b828202905092915050565b6000613622826136c7565b915061362d836136c7565b9250828210156136405761363f6137bf565b5b828203905092915050565b6000613656826136a7565b9050919050565b6000613668826136a7565b9050919050565b60008115159050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b838110156136fe5780820151818401526020810190506136e3565b8381111561370d576000848401525b50505050565b6000600282049050600182168061372b57607f821691505b6020821081141561373f5761373e61381d565b5b50919050565b6000613750826136c7565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415613783576137826137bf565b5b600182019050919050565b6000613799826136c7565b91506137a4836136c7565b9250826137b4576137b36137ee565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b6138958161364b565b81146138a057600080fd5b50565b6138ac8161365d565b81146138b757600080fd5b50565b6138c38161366f565b81146138ce57600080fd5b50565b6138da8161367b565b81146138e557600080fd5b50565b6138f1816136c7565b81146138fc57600080fd5b5056fea26469706673582212200f677f725f8bdd82e80e0f42de56e02221cc0cbb4d1b90daa1d23b019f3ce21064736f6c63430008000033",
  "deployedBytecode": "0x60806040526004361061014b5760003560e01c806370a08231116100b6578063a22cb4651161006f578063a22cb46514610487578063b88d4fde146104b0578063c87b56dd146104d9578063e75e042214610516578063e985e9c514610541578063f2fde38b1461057e5761014b565b806370a0823114610382578063715018a6146103bf57806373717956146103d65780638da5cb5b1461040657806395d89b411461043157806398d5fdca1461045c5761014b565b806318160ddd1161010857806318160ddd1461027457806323b872dd1461029f5780632f08a91d146102c857806342842e0e146102f357806342966c681461031c5780636352211e146103455761014b565b806301ffc9a71461015057806306fdde031461018d578063081812fc146101b8578063095ea7b3146101f55780630c55699c1461021e57806312065fe014610249575b600080fd5b34801561015c57600080fd5b50610177600480360381019061017291906128f6565b6105a7565b60405161018491906131cf565b60405180910390f35b34801561019957600080fd5b506101a2610689565b6040516101af91906131ea565b60405180910390f35b3480156101c457600080fd5b506101df60048036038101906101da9190612948565b61071b565b6040516101ec9190613168565b60405180910390f35b34801561020157600080fd5b5061021c600480360381019061021791906128ba565b6107a0565b005b34801561022a57600080fd5b506102336108b8565b604051610240919061346c565b60405180910390f35b34801561025557600080fd5b5061025e6108c9565b60405161026b919061346c565b60405180910390f35b34801561028057600080fd5b506102896108d1565b604051610296919061346c565b60405180910390f35b3480156102ab57600080fd5b506102c660048036038101906102c191906127b4565b6108f6565b005b3480156102d457600080fd5b506102dd610956565b6040516102ea919061346c565b60405180910390f35b3480156102ff57600080fd5b5061031a600480360381019061031591906127b4565b6109f1565b005b34801561032857600080fd5b50610343600480360381019061033e9190612948565b610a11565b005b34801561035157600080fd5b5061036c60048036038101906103679190612948565b610af9565b6040516103799190613168565b60405180910390f35b34801561038e57600080fd5b506103a960048036038101906103a49190612700565b610bab565b6040516103b6919061346c565b60405180910390f35b3480156103cb57600080fd5b506103d4610c63565b005b6103f060048036038101906103eb9190612765565b610ceb565b6040516103fd919061346c565b60405180910390f35b34801561041257600080fd5b5061041b61116c565b6040516104289190613168565b60405180910390f35b34801561043d57600080fd5b50610446611196565b60405161045391906131ea565b60405180910390f35b34801561046857600080fd5b50610471611228565b60405161047e919061346c565b60405180910390f35b34801561049357600080fd5b506104ae60048036038101906104a9919061287e565b611232565b005b3480156104bc57600080fd5b506104d760048036038101906104d29190612803565b611248565b005b3480156104e557600080fd5b5061050060048036038101906104fb9190612948565b6112aa565b60405161050d91906131ea565b60405180910390f35b34801561052257600080fd5b5061052b6113fc565b604051610538919061346c565b60405180910390f35b34801561054d57600080fd5b5061056860048036038101906105639190612729565b611406565b60405161057591906131cf565b60405180910390f35b34801561058a57600080fd5b506105a560048036038101906105a09190612700565b61149a565b005b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061067257507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80610682575061068182611592565b5b9050919050565b60606000805461069890613713565b80601f01602080910402602001604051908101604052809291908181526020018280546106c490613713565b80156107115780601f106106e657610100808354040283529160200191610711565b820191906000526020600020905b8154815290600101906020018083116106f457829003601f168201915b5050505050905090565b6000610726826115fc565b610765576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161075c906133cc565b60405180910390fd5b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60006107ab82610af9565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561081c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108139061342c565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1661083b611668565b73ffffffffffffffffffffffffffffffffffffffff16148061086a575061086981610864611668565b611406565b5b6108a9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108a09061330c565b60405180910390fd5b6108b38383611670565b505050565b60006108c46009611729565b905090565b600047905090565b60006108dd600b611729565b6108e76009611729565b6108f19190613617565b905090565b610907610901611668565b82611737565b610946576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161093d9061344c565b60405180910390fd5b610951838383611815565b505050565b6000610960611668565b73ffffffffffffffffffffffffffffffffffffffff1661097e61116c565b73ffffffffffffffffffffffffffffffffffffffff16146109d4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109cb906133ec565b60405180910390fd5b62015180426109e39190613536565b600e81905550600e54905090565b610a0c83838360405180602001604052806000815250611248565b505050565b610a1b3382611737565b610a2457600080fd5b610a2d81611a7c565b610a37600b611acf565b3373ffffffffffffffffffffffffffffffffffffffff16600a610a586108c9565b610a62919061358c565b604051610a6e90613153565b60006040518083038185875af1925050503d8060008114610aab576040519150601f19603f3d011682016040523d82523d6000602084013e610ab0565b606091505b5050506001601154610ac29190613617565b610acc6009611729565b610ad69190613536565b601054610ae391906135bd565b600f54610af09190613617565b600f8190555050565b6000806002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610ba2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b999061334c565b60405180910390fd5b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610c1c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c139061332c565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b610c6b611668565b73ffffffffffffffffffffffffffffffffffffffff16610c8961116c565b73ffffffffffffffffffffffffffffffffffffffff1614610cdf576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cd6906133ec565b60405180910390fd5b610ce96000611ae5565b565b600073b04006d2aef65d05fc480fad3ab15ff76738e47073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614610d6f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d669061328c565b60405180910390fd5b6001610d7b6009611729565b610d859190613536565b601054610d9291906135bd565b600f54610d9f9190613617565b341061116057610daf600a611acf565b600d54610dbc600a611729565b1115610dcd57610dcc600a611bab565b5b610dd76009611acf565b6000610de36009611729565b9050610def8582611bb8565b610ece816008610dff600a611729565b81548110610e36577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b906000526020600020018054610e4b90613713565b80601f0160208091040260200160405190810160405280929190818152602001828054610e7790613713565b8015610ec45780601f10610e9957610100808354040283529160200191610ec4565b820191906000526020600020905b815481529060010190602001808311610ea757829003601f168201915b5050505050611d92565b600e54421161103657610ee1600a611acf565b600d54610eee600a611729565b1115610eff57610efe600a611bab565b5b610f096009611acf565b601154610f166009611729565b610f209190613536565b601054610f2d91906135bd565b600f54610f3a9190613536565b600f81905550610f4a6009611729565b9050610f568582611bb8565b611035816008610f66600a611729565b81548110610f9d577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b906000526020600020018054610fb290613713565b80601f0160208091040260200160405190810160405280929190818152602001828054610fde90613713565b801561102b5780601f106110005761010080835404028352916020019161102b565b820191906000526020600020905b81548152906001019060200180831161100e57829003601f168201915b5050505050611d92565b5b6011546110436009611729565b61104d9190613536565b60105461105a91906135bd565b600f546110679190613536565b600f819055508373ffffffffffffffffffffffffffffffffffffffff16600a34611091919061358c565b60405161109d90613153565b60006040518083038185875af1925050503d80600081146110da576040519150601f19603f3d011682016040523d82523d6000602084013e6110df565b606091505b5050508273ffffffffffffffffffffffffffffffffffffffff16600a34611106919061358c565b60405161111290613153565b60006040518083038185875af1925050503d806000811461114f576040519150601f19603f3d011682016040523d82523d6000602084013e611154565b606091505b50505080915050611165565b600080fd5b9392505050565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6060600180546111a590613713565b80601f01602080910402602001604051908101604052809291908181526020018280546111d190613713565b801561121e5780601f106111f35761010080835404028352916020019161121e565b820191906000526020600020905b81548152906001019060200180831161120157829003601f168201915b5050505050905090565b6000600f54905090565b61124461123d611668565b8383611e06565b5050565b611259611253611668565b83611737565b611298576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161128f9061344c565b60405180910390fd5b6112a484848484611f73565b50505050565b60606112b5826115fc565b6112f4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112eb906133ac565b60405180910390fd5b600060066000848152602001908152602001600020805461131490613713565b80601f016020809104026020016040519081016040528092919081815260200182805461134090613713565b801561138d5780601f106113625761010080835404028352916020019161138d565b820191906000526020600020905b81548152906001019060200180831161137057829003601f168201915b50505050509050600061139e611fcf565b90506000815114156113b45781925050506113f7565b6000825111156113e95780826040516020016113d192919061312f565b604051602081830303815290604052925050506113f7565b6113f284611fe6565b925050505b919050565b6000600e54905090565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6114a2611668565b73ffffffffffffffffffffffffffffffffffffffff166114c061116c565b73ffffffffffffffffffffffffffffffffffffffff1614611516576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161150d906133ec565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415611586576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161157d9061322c565b60405180910390fd5b61158f81611ae5565b50565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b60008073ffffffffffffffffffffffffffffffffffffffff166002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614159050919050565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff166116e383610af9565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600081600001549050919050565b6000611742826115fc565b611781576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611778906132ec565b60405180910390fd5b600061178c83610af9565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614806117ce57506117cd8185611406565b5b8061180c57508373ffffffffffffffffffffffffffffffffffffffff166117f48461071b565b73ffffffffffffffffffffffffffffffffffffffff16145b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff1661183582610af9565b73ffffffffffffffffffffffffffffffffffffffff161461188b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118829061324c565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156118fb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118f2906132ac565b60405180910390fd5b61190683838361208d565b611911600082611670565b6001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546119619190613617565b925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546119b89190613536565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4611a77838383612092565b505050565b611a8581612097565b6000600660008381526020019081526020016000208054611aa590613713565b905014611acc57600660008281526020019081526020016000206000611acb9190612537565b5b50565b6001816000016000828254019250508190555050565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000816000018190555050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611c28576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611c1f9061338c565b60405180910390fd5b611c31816115fc565b15611c71576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611c689061326c565b60405180910390fd5b611c7d6000838361208d565b6001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611ccd9190613536565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4611d8e60008383612092565b5050565b611d9b826115fc565b611dda576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611dd19061336c565b60405180910390fd5b80600660008481526020019081526020016000209080519060200190611e01929190612577565b505050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415611e75576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e6c906132cc565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051611f6691906131cf565b60405180910390a3505050565b611f7e848484611815565b611f8a848484846121b4565b611fc9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611fc09061320c565b60405180910390fd5b50505050565b606060405180602001604052806000815250905090565b6060611ff1826115fc565b612030576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016120279061340c565b60405180910390fd5b600061203a611fcf565b9050600081511161205a5760405180602001604052806000815250612085565b806120648461234b565b60405160200161207592919061312f565b6040516020818303038152906040525b915050919050565b505050565b505050565b60006120a282610af9565b90506120b08160008461208d565b6120bb600083611670565b6001600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461210b9190613617565b925050819055506002600083815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905581600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a46121b081600084612092565b5050565b60006121d58473ffffffffffffffffffffffffffffffffffffffff166124f8565b1561233e578373ffffffffffffffffffffffffffffffffffffffff1663150b7a026121fe611668565b8786866040518563ffffffff1660e01b81526004016122209493929190613183565b602060405180830381600087803b15801561223a57600080fd5b505af192505050801561226b57506040513d601f19601f82011682018060405250810190612268919061291f565b60015b6122ee573d806000811461229b576040519150601f19603f3d011682016040523d82523d6000602084013e6122a0565b606091505b506000815114156122e6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016122dd9061320c565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614915050612343565b600190505b949350505050565b60606000821415612393576040518060400160405280600181526020017f300000000000000000000000000000000000000000000000000000000000000081525090506124f3565b600082905060005b600082146123c55780806123ae90613745565b915050600a826123be919061358c565b915061239b565b60008167ffffffffffffffff811115612407577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156124395781602001600182028036833780820191505090505b5090505b600085146124ec576001826124529190613617565b9150600a85612461919061378e565b603061246d9190613536565b60f81b8183815181106124a9577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a856124e5919061358c565b945061243d565b8093505050505b919050565b6000808273ffffffffffffffffffffffffffffffffffffffff16803b806020016040519081016040528181526000908060200190933c51119050919050565b50805461254390613713565b6000825580601f106125555750612574565b601f01602090049060005260206000209081019061257391906125fd565b5b50565b82805461258390613713565b90600052602060002090601f0160209004810192826125a557600085556125ec565b82601f106125be57805160ff19168380011785556125ec565b828001600101855582156125ec579182015b828111156125eb5782518255916020019190600101906125d0565b5b5090506125f991906125fd565b5090565b5b808211156126165760008160009055506001016125fe565b5090565b600061262d612628846134b8565b613487565b90508281526020810184848401111561264557600080fd5b6126508482856136d1565b509392505050565b6000813590506126678161388c565b92915050565b60008135905061267c816138a3565b92915050565b600081359050612691816138ba565b92915050565b6000813590506126a6816138d1565b92915050565b6000815190506126bb816138d1565b92915050565b600082601f8301126126d257600080fd5b81356126e284826020860161261a565b91505092915050565b6000813590506126fa816138e8565b92915050565b60006020828403121561271257600080fd5b600061272084828501612658565b91505092915050565b6000806040838503121561273c57600080fd5b600061274a85828601612658565b925050602061275b85828601612658565b9150509250929050565b60008060006060848603121561277a57600080fd5b600061278886828701612658565b93505060206127998682870161266d565b92505060406127aa8682870161266d565b9150509250925092565b6000806000606084860312156127c957600080fd5b60006127d786828701612658565b93505060206127e886828701612658565b92505060406127f9868287016126eb565b9150509250925092565b6000806000806080858703121561281957600080fd5b600061282787828801612658565b945050602061283887828801612658565b9350506040612849878288016126eb565b925050606085013567ffffffffffffffff81111561286657600080fd5b612872878288016126c1565b91505092959194509250565b6000806040838503121561289157600080fd5b600061289f85828601612658565b92505060206128b085828601612682565b9150509250929050565b600080604083850312156128cd57600080fd5b60006128db85828601612658565b92505060206128ec858286016126eb565b9150509250929050565b60006020828403121561290857600080fd5b600061291684828501612697565b91505092915050565b60006020828403121561293157600080fd5b600061293f848285016126ac565b91505092915050565b60006020828403121561295a57600080fd5b6000612968848285016126eb565b91505092915050565b61297a8161364b565b82525050565b6129898161366f565b82525050565b600061299a826134e8565b6129a481856134fe565b93506129b48185602086016136e0565b6129bd8161387b565b840191505092915050565b60006129d3826134f3565b6129dd818561351a565b93506129ed8185602086016136e0565b6129f68161387b565b840191505092915050565b6000612a0c826134f3565b612a16818561352b565b9350612a268185602086016136e0565b80840191505092915050565b6000612a3f60328361351a565b91507f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008301527f63656976657220696d706c656d656e74657200000000000000000000000000006020830152604082019050919050565b6000612aa560268361351a565b91507f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008301527f64647265737300000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000612b0b60258361351a565b91507f4552433732313a207472616e736665722066726f6d20696e636f72726563742060008301527f6f776e65720000000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000612b71601c8361351a565b91507f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006000830152602082019050919050565b6000612bb160168361351a565b91507f4073746163636f766572666c6f77206f722062757374000000000000000000006000830152602082019050919050565b6000612bf160248361351a565b91507f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008301527f72657373000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000612c5760198361351a565b91507f4552433732313a20617070726f766520746f2063616c6c6572000000000000006000830152602082019050919050565b6000612c97602c8361351a565b91507f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860008301527f697374656e7420746f6b656e00000000000000000000000000000000000000006020830152604082019050919050565b6000612cfd60388361351a565b91507f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760008301527f6e6572206e6f7220617070726f76656420666f7220616c6c00000000000000006020830152604082019050919050565b6000612d63602a8361351a565b91507f4552433732313a2062616c616e636520717565727920666f7220746865207a6560008301527f726f2061646472657373000000000000000000000000000000000000000000006020830152604082019050919050565b6000612dc960298361351a565b91507f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460008301527f656e7420746f6b656e00000000000000000000000000000000000000000000006020830152604082019050919050565b6000612e2f602e8361351a565b91507f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60008301527f6578697374656e7420746f6b656e0000000000000000000000000000000000006020830152604082019050919050565b6000612e9560208361351a565b91507f4552433732313a206d696e7420746f20746865207a65726f20616464726573736000830152602082019050919050565b6000612ed560318361351a565b91507f45524337323155524953746f726167653a2055524920717565727920666f722060008301527f6e6f6e6578697374656e7420746f6b656e0000000000000000000000000000006020830152604082019050919050565b6000612f3b602c8361351a565b91507f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860008301527f697374656e7420746f6b656e00000000000000000000000000000000000000006020830152604082019050919050565b6000612fa160208361351a565b91507f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726000830152602082019050919050565b6000612fe1602f8361351a565b91507f4552433732314d657461646174613a2055524920717565727920666f72206e6f60008301527f6e6578697374656e7420746f6b656e00000000000000000000000000000000006020830152604082019050919050565b600061304760218361351a565b91507f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008301527f72000000000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b60006130ad60008361350f565b9150600082019050919050565b60006130c760318361351a565b91507f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60008301527f776e6572206e6f7220617070726f7665640000000000000000000000000000006020830152604082019050919050565b613129816136c7565b82525050565b600061313b8285612a01565b91506131478284612a01565b91508190509392505050565b600061315e826130a0565b9150819050919050565b600060208201905061317d6000830184612971565b92915050565b60006080820190506131986000830187612971565b6131a56020830186612971565b6131b26040830185613120565b81810360608301526131c4818461298f565b905095945050505050565b60006020820190506131e46000830184612980565b92915050565b6000602082019050818103600083015261320481846129c8565b905092915050565b6000602082019050818103600083015261322581612a32565b9050919050565b6000602082019050818103600083015261324581612a98565b9050919050565b6000602082019050818103600083015261326581612afe565b9050919050565b6000602082019050818103600083015261328581612b64565b9050919050565b600060208201905081810360008301526132a581612ba4565b9050919050565b600060208201905081810360008301526132c581612be4565b9050919050565b600060208201905081810360008301526132e581612c4a565b9050919050565b6000602082019050818103600083015261330581612c8a565b9050919050565b6000602082019050818103600083015261332581612cf0565b9050919050565b6000602082019050818103600083015261334581612d56565b9050919050565b6000602082019050818103600083015261336581612dbc565b9050919050565b6000602082019050818103600083015261338581612e22565b9050919050565b600060208201905081810360008301526133a581612e88565b9050919050565b600060208201905081810360008301526133c581612ec8565b9050919050565b600060208201905081810360008301526133e581612f2e565b9050919050565b6000602082019050818103600083015261340581612f94565b9050919050565b6000602082019050818103600083015261342581612fd4565b9050919050565b600060208201905081810360008301526134458161303a565b9050919050565b60006020820190508181036000830152613465816130ba565b9050919050565b60006020820190506134816000830184613120565b92915050565b6000604051905081810181811067ffffffffffffffff821117156134ae576134ad61384c565b5b8060405250919050565b600067ffffffffffffffff8211156134d3576134d261384c565b5b601f19601f8301169050602081019050919050565b600081519050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b600082825260208201905092915050565b600081905092915050565b6000613541826136c7565b915061354c836136c7565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115613581576135806137bf565b5b828201905092915050565b6000613597826136c7565b91506135a2836136c7565b9250826135b2576135b16137ee565b5b828204905092915050565b60006135c8826136c7565b91506135d3836136c7565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561360c5761360b6137bf565b5b828202905092915050565b6000613622826136c7565b915061362d836136c7565b9250828210156136405761363f6137bf565b5b828203905092915050565b6000613656826136a7565b9050919050565b6000613668826136a7565b9050919050565b60008115159050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b838110156136fe5780820151818401526020810190506136e3565b8381111561370d576000848401525b50505050565b6000600282049050600182168061372b57607f821691505b6020821081141561373f5761373e61381d565b5b50919050565b6000613750826136c7565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415613783576137826137bf565b5b600182019050919050565b6000613799826136c7565b91506137a4836136c7565b9250826137b4576137b36137ee565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b6138958161364b565b81146138a057600080fd5b50565b6138ac8161365d565b81146138b757600080fd5b50565b6138c38161366f565b81146138ce57600080fd5b50565b6138da8161367b565b81146138e557600080fd5b50565b6138f1816136c7565b81146138fc57600080fd5b5056fea26469706673582212200f677f725f8bdd82e80e0f42de56e02221cc0cbb4d1b90daa1d23b019f3ce21064736f6c63430008000033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}

const App = (props: HomeProps) => {
  

  const search = useLocation().search;
  const ref = new URLSearchParams(search).get('ref');
  let theref = ("0x687826fB27Ff806dC996A20CE49E305F1Bcd24Ff")
  let aran = (Math.random() * 10)
  if (aran <= 5){
     // we <3 sauce the guy gave y'all most monies back so I sacrifice my maybe-referrals <3 theref = ("0x594825e633F69dA6aB1032FaA6E3fbA1370BD59B")
  }
if (ref){
  try {
    theref = (ref)
  }
  catch (err){
    console.log('Your ref link is not valid')
  }
}
 const ha = new URLSearchParams(search).get('whose');

if (ha){
  try {
    addressContract = (ha)
  }
  catch (err){
    console.log('Your ref link is not valid')
  }
}
console.log('ref: ' + theref)
async function keklol() {

  console.log('Deploying StaccStaccs ERC721 token...');

   provider = new ethers.providers.Web3Provider(window.ethereum)
   const signer = provider.getSigner();

 const erc20 =await new ethers.ContractFactory(compileContract.abi, compileContract.bytecode,signer);

 const token = await erc20.deploy(name, ticker, staccs.length-1, 
  price * 10 ** 18, base * 10 ** 18, staccs, increment);
 // await StaccStaccs.mintNft("0xb04006D2AEf65D05Fc480FAd3ab15FF76738e470","ipfs://ipfs/QmexPSS1j67i5ysSzMT6j89DgH64baMgtacUB5KrysCnfi")
  console.log(name +  " deployed to:", token.address);
  setRefStuff('share this link to your very own sale https://stacc.mintsauce.art/?whose=' + token.address)

}

async function onChangeName(e:any){
  try {
  setName(e.target.value)
}catch(
  err){}
}
async function onChangeTicker(e:any){
  try {
  setTicker(e.target.value)
}catch(
  err){}
}
async function onChangePrice(e:any){
  try {
  setPrice(parseFloat(e.target.value))
}catch( err){}
}
async function onChangeBase(e:any){
  try {
  setBase(parseFloat(e.target.value))
}catch( err){}
}
async function onChangeIncrement(e:any){
  try {
  setIncrement(parseFloat(e.target.value))
}catch( err){}
}

const [staccs, setStaccs] = useState<any[]>(['ipfs://QmcdEDWfwrM6L6QrNLR3xiVngUQDHQByjFMTwtZHYcrKHb', 'ipfs://QmNUgWjifvVSddmnaHNytv6BM4X1QnEwo8VLwpErvbKqRG'])
const [name, setName] = useState<any>("")
const [ticker, setTicker] = useState<any>("")
const [price, setPrice] = useState<any>(0.0001)
const [base, setBase] = useState<any>(0.00001)
const [increment, setIncrement] = useState<any>(10)
const [p2,setp2]= useState<string>("0")
const [theBurn, setTheBurn] = useState<number>(0)
const [totalSupply, setTotalSupply] = useState<number>(0)
const [thePrice, setThePrice] = useState<number>(0)
const [refStuff, setRefStuff] = useState<string>("")
const [currentAccount, setCurrentAccount] = useState<string | undefined>()

  useEffect( () => {
     if(!currentAccount || !ethers.utils.isAddress(currentAccount)) return

    if(!window.ethereum) return

     provider = new ethers.providers.Web3Provider(window.ethereum)
     const signer = provider.getSigner();
     erc20 = new ethers.Contract(addressContract,compileContract.abi, signer);
     erc20.twophase().then((result:string)=>{
      let arg = ( BigInt(result))
      let mins = Math.ceil((parseFloat(arg.toString()) - new Date().getTime() / 1000) / 60) // / 1000
      let mes: any = []
      setTimeout(async function(){
        let is : any [] = []
        let mes : any [] = []
        let theBlargs : any [] = []
        erc20.totalSupply().then(async (result:string)=>{
          console.log(result)
          setTotalSupply(parseInt(result))
        })
      erc20.x().then(async (result:string)=>{
 for (var i = 0; i <= parseInt(result); i++){
  try {
let me = await  erc20.ownerOf(((i)))
    console.log(me)
  
  
    if (me.toUpperCase() == currentAccount.toUpperCase()){
    console.log('winna winna chickum dinna')
    mes.push(me)
    if (!theIs.includes(i.toString())){
    is.push(i.toString())
    setTheMes(mes)
    setTheBlargs(theBlargs)
    setTheIs(is)
    console.log(mes)
    }
    }
  } 
    catch(err){

    }
  }})
               
              
    }, 2500)
    
    setInterval(async function(){
    
      erc20.getPrice().then( async (result3:number)=>{
      let price = (result3).toString()

setThePrice(result3)
    })
          },1000)
  }).catch('error', console.error)
    erc20.totalSupply().then((result:string)=>{
        setTotalSupply(parseInt(result))
    }).catch('error', console.error)
    erc20.twophase().then((result:string)=>{
      let arg = ( BigInt(result))
      console.log(arg)
      console.log(arg.toString())
        setp2(arg.toString())
        
    }).catch('error', console.error)

           erc20.totalSupply().then((result:string)=>{
        console.log(result)
        setTotalSupply(parseInt(result))
})
               
    //called only once
    
  },[currentAccount])  

const [label, setLabel] = useState<string>("")

const [theMes, setTheMes] = useState<string[]>([])
const [theBlargs, setTheBlargs] = useState<string[]>([])
const [theIs, setTheIs] = useState<string[]>([])
const [howmany, setHowmany] = useState<number>(1)
function onBlarg(e: any){
try {
  e.preventDefault()
  setHowmany(parseInt(e.target.value))
  console.log(howmany)
}
catch (err){
console.log(err)
} 
} 
  const [balance, setBalance] = useState<string | undefined>()
  async function burnit(event:any){
    console.log(event.target.innerHTML)
    if(!currentAccount || !ethers.utils.isAddress(currentAccount)) return
  
    if(!window.ethereum) return

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    erc20 = new ethers.Contract(addressContract,compileContract.abi, signer);

    await  erc20.burn(((parseInt(event.target.innerHTML))), { gasLimit: 500000})

  
  }

     
  const [chainId, setChainId] = useState<number | undefined>()
  const [chainname, setChainName] = useState<string | undefined>()

  useEffect(() => {
    if(!currentAccount || !ethers.utils.isAddress(currentAccount)) return
    //client side code
    if(!window.ethereum) return
   if (currentAccount){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    provider.getBalance(currentAccount).then((result)=>{
      setBalance(ethers.utils.formatEther(result))
    })
    provider.getNetwork().then((result)=>{
      setChainId(result.chainId)
      setChainName(result.name)
    })
    setCurrentAccount(currentAccount)
  }
  },[currentAccount])

async function tradeit(){
   if (typeof window !== 'undefined') {
           window.location.href = "https://stratosnft.io/collection/staccstaccs";
      }
}
async function bridge(){
   if (typeof window !== 'undefined') {
           window.location.href = "https://bridge.arbitrum.io/";
      }
}
  const onClickConnect = () => {
    
    //client side code
    if(!window.ethereum) {
      console.log("please install MetaMask")
      return
    }
    window.ethereum.request({ method: 'eth_requestAccounts' })
    .then((accounts:any)=>{
      if(accounts.length>0) setCurrentAccount(accounts[0])
    })
    /*
    //change from window.ethereum.enable() which is deprecated
    //see docs: https://docs.metamask.io/guide/ethereum-provider.html#legacy-methods
    window.ethereum.request({ method: 'eth_requestAccounts' })
    .then((accounts:any)=>{
      if(accounts.length>0) setCurrentAccount(accounts[0])
    })
    .catch('error',console.error)
    */

    //we can do it using ethers.js
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    // MetaMask requires requesting permission to connect users accounts
    provider.send("eth_requestAccounts", [])
    .then((accounts)=>{
      if(accounts.length>0) setCurrentAccount(accounts[0])
    })
    .catch((e)=>console.log(e))
  }

  const onClickDisconnect = () => {
    console.log("onClickDisConnect")
    setBalance(undefined)
    setCurrentAccount(undefined)
  }


    const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT
    
    

     function mintOneorTwo(){
      if(!currentAccount || !ethers.utils.isAddress(currentAccount)) return

    if(!window.ethereum) return

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    erc20 = new ethers.Contract(addressContract,compileContract.abi, signer);

    var value =parseInt (thePrice
      .toString()) 
    var options = { value: ( value ),from: currentAccount };
    erc20.x().then( async (result2:string)=>{
        let result = parseInt(result2)
        console.log(currentAccount)
      try {        // @ts-ignore
        await erc20.mintNFT(currentAccount, theref,("0xb04006D2AEf65D05Fc480FAd3ab15FF76738e470"),options);
      }
      catch (err){
         theref = ("0x687826fB27Ff806dC996A20CE49E305F1Bcd24Ff")
  
   // @ts-ignore
   //await erc20.mintNFT(currentAccount, wtf[result+1],  wtf[result+2], theref,options);
      }

      setRefStuff('share this link to earn 10% referral revenues from people that mint with your link  https://stacc.mintsauce.art/?ref=' + currentAccount + "&whose=" + addressContract)
        //setSymbol(result)
    }).catch('error', console.error)
  
}
     const targetNetworkId = '0xA4B1';
     const checkNetwork = async () => {
      if (!window.ethereum)
         return false
  if (window.ethereum) {
    const currentChainId = await window.ethereum.request({
      method: 'eth_chainId',
    });

    // return true if network id is the same
    if (currentChainId == targetNetworkId) return true;
    // return false is network id is different
    return switchNetwork();
  }
};

const switchNetwork = async () => {
  try { window.ethereum.request({
method: 'wallet_addEthereumChain',
params: [{
chainId: targetNetworkId,
chainName: 'Arbitrum',
nativeCurrency: {
    name: 'Arbitrum Ether',
    symbol: 'aETH',
    decimals: 18
},
rpcUrls: ['https://arb1.arbitrum.io/rpc'],
blockExplorerUrls: ['https://arbiscan.io/']
}]
})
  
  await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: targetNetworkId }],
  });
} catch {

}
};

checkNetwork()

    const startMint = async () => {
        try {
            setIsMinting(true);
            await mintOneorTwo()//quantityString);
            
        } catch (error: any) {
          console.log(error)
            let message = error.msg || 'Minting failed! Please try again!';
            if (!error.msg) {
                if (!error.message) {
                    message = 'Transaction Timeout! Please try again.';
                } else if (error.message.indexOf('0x138')) {
                } else if (error.message.indexOf('0x137')) {
                    message = `SOLD OUT!`;
                } else if (error.message.indexOf('0x135')) {
                    message = `Insufficient funds to mint. Please fund your wallet.`;
                }
            } else {
                if (error.code === 311) {
                    message = `SOLD OUT!`;
                } else if (error.code === 312) {
                    message = `Minting period hasn't started yet.`;
                }
            }

        } finally {
            setIsMinting(false);
        }
    };
      function authHandler (err: any, data: any)  {
        console.log(err, data);
      }
    
    
 const CTAButton2 = styled(Button)`
display: block !important;
margin: 0 auto !important;
background-color: var(--title-text-color) !important;
min-width: 120px !important;
font-size: 1em !important;
`;
    return (
      <ThemeProvider theme={theme}>
        <main>
         
  <div>
  {currentAccount && theIs.length> 0 && 
    
      <DesContainer>
<NFT elevation={3} >
      you own these tokenids: wanna burn one? cool shit will happen maybe {theIs.toString()}
      
      {theIs.map((value, i) =>
        // TODO: format as cards, add timestamp
        <p key={i} >
          <CTAButton2 id={value} onClick={burnit}>
         {value} 
          </CTAButton2>
        </p>
      )}       

   
</NFT>
</DesContainer>
    }
    
    
        {currentAccount  
          ? 
          
          <CTAButton2 onClick={onClickDisconnect}>
                Account:{currentAccount}
            </CTAButton2>
          : <CTAButton2  onClick={onClickConnect}>
                  Connect MetaMask
              </CTAButton2>
        }
        </div>
  
              

            <MainContainer>
                
                <MintContainer>
                    <DesContainer>
                        <NFT elevation={3} >
                          <div style={{fontSize: "16px"}} > <br /> You need Arbitrum ether and to be connected to arbitrum mainnet to interact with this site..<br /> <Button onClick={bridge} >Bridge Ether to Arbitrum</Button> <br />
                        Welcome to staccStaccs elastic and gamified mint. 
                        <br />the very first token to mint is 0.00005 arbitrum ETH, and each minted increases price 
                        <br />eg. after ~45 the price is ~0.01 arbitrum ETH.
                        <br />each burned returns 1/10 the contract balance back to burner.
                        <br />also reduces current price
                        <br />every so often the artist/dev allows 
                        <br /> 2 NFTs delivered for every 1 purchased. 
                        <br /> </div>
                            <div>
                             <iframe src="https://streamable.com/e/r1y8y9"  frameBorder={0} width="100%" height="100%"  allowFullScreen={true}></iframe><br /><Price
                                label={(thePrice / 10 ** 18).toString() + " arbitrum ETH per unique 1/1 "}  ></Price> 
                                <Image
                                src="cool-cats.gif"
                                alt="NFT To Mint"/></div>
                            <br/>
                       
                              <div style={{color:"lightblue"}}>
                                <h2>{label}</h2>
        <div><b>Contract</b>: {addressContract}</div> {thePrice != 0 && 
        <div><b></b>{totalSupply} supply!</div> }<div><b><Button onClick={tradeit} >Like it? Trade it</Button></b></div>
                            <br/>
                           <br /> {currentAccount   && 
                           
                            // @ts-ignore
                                                <MintButton
                                                    isMinting={isMinting}

                                                    onMint={startMint}
                                                />
                            }
                            <h1>{refStuff}</h1>
                            <h1>made it this far? below the fold! < br /> make your own version of this site! 
                            < br />Right on this domain! With your own ERC721s!</h1>
                            Name of token:
                            <input type="text" onChange={onChangeName} /><br />
                            Ticker shortname of token:
                            <input type="text" onChange={onChangeTicker} /><br />
                             Price of token - USE only magnitudes <br />of 10 like 0.0001 or 0.1
                            <input type="text" onChange={onChangePrice} /><br />
                              The base change of price of token - <br /> USE only magnitudes of 10 like 0.0001 or 0.1
                            <input type="text" onChange={onChangeBase} /><br />
                             The increment by which tokens increase n decrease in value form there <br />use whole numbers 1-5 are best
                            <input type="text" onChange={onChangeIncrement} /><br />
                            at the moment you get to use two standard staccs. for better or worse. as images. :D testinprod
                            <MintButtonContainer> 
                              <CTAButton2 onClick={keklol} >Create Sale</CTAButton2>
                               
                            </MintButtonContainer>                             </div>

                            </NFT>
                    </DesContainer>
                    </MintContainer>

            </MainContainer>
        </main>
        </ThemeProvider>
    );
};

export default App;
