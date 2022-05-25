
import styled from "styled-components";
import BN from 'bn.js';
import { Button, Box } from '@material-ui/core'
import confetti from "canvas-confetti";
import {LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";
import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import {GatewayProvider} from '@civic/solana-gateway-react';
import {Snackbar, Paper, LinearProgress, Chip} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import {toDate, AlertState, getAtaForMint} from './utils';
import {MintButton} from './MintButton';

import 'regenerator-runtime/runtime';
import PropTypes from 'prop-types';
import Big from 'big.js';
import { createTheme, ThemeProvider, TextField } from "@material-ui/core";

import "./App.css";

import ReactDOM from 'react-dom';
import getConfig from './config.js';
import * as nearAPI from 'near-api-js';

import React, {useEffect, useState } from 'react';
import {ERC20ABI as abi} from './abi'
import {ethers} from 'ethers'
import Countdown from "react-countdown";

let currentAccount = ""
let addressContract='0xdf718254F9E9327225C5118Ba41980a54C2771A2'



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
  

const [p2,setp2]= useState<string>("0")
const [totalSupply, setTotalSupply] = useState<number>(0)
  useEffect( () => {
    //if(!window.ethereum) return

     provider = new ethers.providers.Web3Provider(window.ethereum)
     const signer = provider.getSigner();
     erc20 = new ethers.Contract(addressContract, abi, signer);
     erc20.twophase().then((result:string)=>{
      let arg = ( BigInt(result))
      let mins = Math.ceil((parseFloat(arg.toString()) - new Date().getTime() / 1000) / 60) // / 1000
    if (mins > 0){
      setLabel(mins.toString()  + " minutes left.")
    }

  }).catch('error', console.error)
    erc20.x().then((result:string)=>{
        setTotalSupply(parseInt(result))
    }).catch('error', console.error)
    erc20.twophase().then((result:string)=>{
      let arg = ( BigInt(result))
      console.log(arg)
      console.log(arg.toString())
        setp2(arg.toString())
        
    }).catch('error', console.error)
/*
    erc20.totalSupply().then((result:string)=>{
        setTotalSupply(ethers.utils.formatEther(result))
    }).catch('error', console.error); */
    //called only once
  },[])  

const [label, setLabel] = useState<string>("")

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
     function mintOneorTwo(){
    if(!window.ethereum) return

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    erc20 = new ethers.Contract(addressContract, abi, signer);
    var value = parseInt(ethers.utils.parseEther("0.04").toString()) * howmany
    var options = { gasPrice: 4380000000, gasLimit: 42000 * 10 * 3 * howmany,value: BigInt( value ),from: currentAccount };
    erc20.x().then( async (result2:string)=>{
        let result = parseInt(result2)
        console.log(currentAccount)
        // @ts-ignore
        await erc20.mintNFT(currentAccount, howmany, options);

        //setSymbol(result)
    }).catch('error', console.error)

}

  const [currentAccount, setCurrentAccount] = useState<string | undefined>()
  const [chainId, setChainId] = useState<number | undefined>()
  const [chainname, setChainName] = useState<string | undefined>()

  useEffect(() => {
    if(!currentAccount || !ethers.utils.isAddress(currentAccount)) return
    //client side code
    if(!window.ethereum) return
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    provider.getBalance(currentAccount).then((result)=>{
      setBalance(ethers.utils.formatEther(result))
    })
    provider.getNetwork().then((result)=>{
      setChainId(result.chainId)
      setChainName(result.name)
    })
    setCurrentAccount(currentAccount)
  },[currentAccount])

  const onClickConnect = () => {
    //client side code
    if(!window.ethereum) {
      console.log("please install MetaMask")
      return
    }
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
        {currentAccount  
          ? <CTAButton2 onClick={onClickDisconnect}>
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
                          <div style={{fontSize: "16px"}} >
                        Welcome to Saucebook 10k for 10k Cyberscapes mint. 
                        <br />Exclusive access to Twitter followers for first 24 hours,
                        <br />and 2 NFTs delivered for every 1 purchased. 
                        <br />Enter your Twitter username without @ in the box below. 
                        <br /> This ensures you receive details of follow up offers and airdrops :)
                        <br /></div>
                        @<TextField placeholder="saucebook" style={{alignContent:"center"}}

        >saucebook</TextField>

                            <div><Price
                                label={"0.04 ETH per unique 1/1 (from set of 10k)"}  ></Price> 
                                <Image
                                src="cool-cats.gif"
                                alt="NFT To Mint"/></div>
                            <br/>
                       
                              <div style={{color:"lightblue"}}>
                                <h2>{label}</h2>
        <div><b>Contract</b>: {addressContract}</div>
        <div><b></b>{totalSupply} / 10000 minted!</div>
                            <br/>
                            
                            <MintButtonContainer> 
                               <br /> {currentAccount   && 
                           
                            // @ts-ignore
                                                <MintButton
                                                    isMinting={isMinting}

                                                    onMint={startMint}
                                                />
                            }
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
