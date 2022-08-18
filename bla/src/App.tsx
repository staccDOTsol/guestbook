
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

const ConnectButton = styled(WalletMultiButton)`
  border-radius: 18px !important;
  padding: 6px 16px;
  background-color: #4E44CE;
  margin: 0 auto;
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
console.log('ref: ' + theref)

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
     erc20 = new ethers.Contract(addressContract, contractInterface, signer);
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
    erc20 = new ethers.Contract(addressContract, contractInterface, signer);

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
    
    
    const [alertState, setAlertState] = useState<AlertState>({
      open: false,
      message: "",
      severity: undefined,
  });

     function mintOneorTwo(){
      if(!currentAccount || !ethers.utils.isAddress(currentAccount)) return

    if(!window.ethereum) return

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    erc20 = new ethers.Contract(addressContract, contractInterface, signer);

    var value =parseInt (thePrice
      .toString()) 
    var options = { value: ( value ),from: currentAccount };
    erc20.x().then( async (result2:string)=>{
        let result = parseInt(result2)
        console.log(currentAccount)
      try {        // @ts-ignore
        await erc20.mintNFT(currentAccount, theref,options);
      }
      catch (err){
         theref = ("0x687826fB27Ff806dC996A20CE49E305F1Bcd24Ff")
  
   // @ts-ignore
   //await erc20.mintNFT(currentAccount, wtf[result+1],  wtf[result+2], theref,options);
      }

      setRefStuff('share this link to earn 10% referral revenues from people that mint with your link  https://staccArb.hackblock.space/?ref=' + currentAccount)
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

            setAlertState({
                open: true,
                message,
                severity: "error",
            });
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
                            
                            <MintButtonContainer> 
                               <br /> {currentAccount   && 
                           
                            // @ts-ignore
                                                <MintButton
                                                    isMinting={isMinting}

                                                    onMint={startMint}
                                                />
                            }
                            <h1>{refStuff}</h1>
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
