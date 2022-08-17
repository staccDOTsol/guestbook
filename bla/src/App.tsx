
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
import {Link, useLocation, useParams} from "react-router-dom";

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
  let theref = ("0xd03d0b1bebe7ec88b16297f229f7362b7420585c")
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
const [totalSupply, setTotalSupply] = useState<number>(0)
const [refStuff, setRefStuff] = useState<string>("")
const [currentAccount, setCurrentAccount] = useState<string | undefined>()


const [label, setLabel] = useState<string>("")

const [howmany, setHowmany] = useState<number>(1)
async function opensea(){
  window.open('https://opensea.io/collection/cyberscapes');
}
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

  const [chainId, setChainId] = useState<number | undefined>()
  const [chainname, setChainName] = useState<string | undefined>()

    
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
 
              

            <MainContainer>
                
                <MintContainer>
                    <DesContainer>
                        <NFT elevation={3} >
                          <div style={{fontSize: "16px"}} >
                        Welcome to Saucebook Cyberscapes mint.

                        
                        <br /> Y'all missed out on minting!  </div>

                            <div><Price
                                label={"0.03 ETH per unique 1/1"}  ></Price> 
                                <Image
                                src="cool-cats.gif"
                                alt="NFT To Mint"/></div>
                            <br/>
                            <Button onClick={opensea} >https://opensea.io/collection/cyberscapes</Button>
                              <div style={{color:"lightblue"}}>
                                <h2>{label}</h2>
        <div><b>Contract</b>: 0x30d806b1bc9871eE93A5afb9524cc35Ca2df1b36</div>
        <div><b></b>only 212 minted...</div>
                            <br/>
                            </div>
                            </NFT>
                    </DesContainer>
                    </MintContainer>

            </MainContainer>
</div>
        </main>
        </ThemeProvider>
    );
};

export default App;
