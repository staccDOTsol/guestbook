
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
import {CTAButton, MintButton} from './MintButton';

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

const ajson = {"cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 97968631-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmexPSS1j67i5ysSzMT6j89DgH64baMgtacUB5KrysCnfi","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 9773530-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmW1t8P1sip9adUdHo8FvDUKP6GfKjnvNWHeDk2FCm3jMX","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 90846428-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.json":"QmPKKke6p448mAiu2dgVvDSXrqVPjS1gCEVJqzbebSZUvy","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 88708675-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmfKbcAWKiiFyAcGG6AjVMpDwDTuePoAfQAFy9p96hNv1T","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 86477580-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Standard.json":"Qmbg82XW7hMfmnFPoaxp8KdNsybn3LH5rexr6LJvZMSixt","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 85324090-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmY6cT5mYftNuDnbB7MiSj5y4FHARCUfKprE41oFBpaMaC","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 8272158-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmcbMa6pEo5FLj9VngRy6QdfRJtH7D1diu3Pr3czCmFe6k","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 8233769-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Standard.json":"Qma199wcEERbMHNfSVNpcKfTK2BQJwQdfYCqP68Txofj5T","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 78058691-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmSSa8E1ysPk5fjd5DaEzr9guLP5j6HiJz3r7cfaxSRkE4","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 73517011-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmWJn1eYuGReniodonE4JkPPvXGVuakxVULsErcWZWkD3V","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 73011684-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmUMHssAsZxkmN98u9mWLcLxF2cmNniBsK9HgYv4HjzgsU","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 7213016-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmbhMGhR78EZhcHUGTU1DsP5mxFr1PTQLEE4JmTBmTZedn","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 68289943-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Standard.json":"QmXtKWDzfgZgHDUUji7TyzdWTdRLW5pLxsS9VkAS73gQKe","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 68087809-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmRa4CtB1dQJYrpzrwjVRSxXmJERFFjTVaKQQSbrFUQMQZ","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 67403366-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmUAVWTAWzoVCi7sxhP4Q9YGr58kMNjkzvi5MC5dhLJ5HV","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 67210723-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Standard.json":"QmbCVLs9xZzNMFE4VUDUcymBbKZ3dQ4dcg4jE69qsb5sPP","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 66247605-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmaXHyq2wvWqq8Agi6ghT1LssUGJrw5jfbjaRGdQ5ZJoXM","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 64022944-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmThBjKZPBdcs1VjDVCLEedJ4Zjcbp7RUZGDjVX9A97Kq8","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 55676841-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmeEU7psc6yjEubx6sekKrm7AJBoc3gm1k52DaU3kfDEvN","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 51761580-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmZ2GaCMA7Ka5s497umDc6y686zKES3QRNNZG7bNcdbrHq","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 49465363-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmcWPnonq8n6xu77Kh8oKXodjoNKkvweBiQC3T7zZ9Zuoj","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 47772778-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"Qme9U6kS6XjxBrfN7KkzYzcF6DXurRQDtsoYqvdymU1ZQU","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 47351919-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmNP28LVNVgGuAhtfVuRgShaS6b8C4RTD4N9RxSD7Y6qJj","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 47279794-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmQynD8R7How8RKEqoewr4cSF5BLRFWfLH4CWP5Xo86Pop","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 39363720-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmZckraFnk7hnmz9ehxFSeVn49y814oXbSKPmekDNUHFCq","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 36496062-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmWoJtex7fvLp3ZCxsNroo8cJGg57bKgGbrNUncKvdTboz","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 32606777-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.json":"QmPSbPw2qsc5oxm2uHJuBMb58XrQYXAKbabiqkM7MMJxmQ","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 29445650-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"Qmcq6maDNrDwCdxcDNTy8d5G2FkiKYu3WYmpGGLY7uNwN2","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 24002144-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmZwkGEuFGzjEQmjVQqsrdKobodHdM6Bb7o8VgP91SzYrs","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 238055415-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"Qmeu2PUBxAaBy4YCWFi3LTnLvBjkesZpzSUBvbtYXw9Tbs","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 237976726-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.json":"QmfSaZcEPcCemkdvCTfLFnj2BSXMtXwmfFy1LnCfUEbwaD","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 237365546-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmaKZWzMVunS3pFBncThCLgkbiFPjcRrYcbPR19zRWzGwv","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 234110428-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmWx3UoQDeUR8KsMDNYnzDumeF6xb9Q5TgZbgzK9YSXoFC","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 233318353-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmWaEGvVF4u6AxpjVVAsmyA4yfG22FzNPtnWARn4xRHRjn","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 232277112-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmdsTP5vitdGeSJYkZtbFg83qqR54pox9AQneYzEyAa9u8","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 228574574-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmRW9h727i3GqNZWHi6sbAJpyEoumieo7LtbpFYVYU2vsW","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 226831961-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmYDVNTifSnKEfzo6Qpw7Hiwp5feDbS2smGr5LexuaNhay","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 225601895-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmbVcd886xKU1T7pxfrME9NAJdr87Q164ZJk5hqRN8rfaK","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 224350072-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmcVnnMCNBjbLhJfz9BgrFmoebVsRou6vKFfQf4TMvHmpe","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 217459466-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmPgja6E4bajbcgVrZMvLZ9kqwYcuhSfDk25GgNcs9oQVE","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 215220443-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.json":"QmSmXz6a77bAFj9CVDnu1r6tJZKP2sDRwmoAx7KN12BeEX","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 213602920-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Standard.json":"Qme1iK2LLVk7S8pqxhB56f6PjiKYxDFbqx3mC6gZnZGd6V","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 21022310-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmYD3rQ9eto6J4JcuQiz1dK2kz2g4Sr8eevqcAZunRgcyb","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 210190475-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmcASNtjkjLaYPJQ7JXA6tNnd59LbkjdqHLFw62ZZyxY5Z","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 208609234-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmS4RmyLXS2JLdMaCVh8tUTj8BHQW2WQ7PY4bbwThv6cBL","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 203266697-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmTsMWbYybTA27V4xTT81yYd1N71ojytKxXVynhYnuDbNg","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 203223262-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmYLYjP1EgV9ZXMCczuxFuP6G1DPZkhSP9ocM3HwdJi1MN","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 201410451-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmU4RK6go2sg8ZMeuLPJRZn4NbfhU2D6EdFnPY1FexaQG9","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 201212922-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmSLj5N7CPSao5NDHk6dqZCV1FUH6xtDeetttmZ7CbAUvf","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 198779625-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmRnNQ9p2NCbgwZNDhfoBkcpGEobvwnAdxdZK84jyZPFg4","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 19696547-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmVUwqPW4QQCDzR5mdTCqmZo6Msbcs4QvtUPCbv1umhCPH","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 189318101-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmYHRj5FiY496YJtXeSZpd2DTdau4FwuGMZpkpqeMzq3fA","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 187597847-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmbAiakrQGeaG16Mi86A6cxMCyEpCKrQdqGmBgnQ3mjnNy","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 186727752-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.json":"Qmd38jqPMFk3FpdJ1AJpXe6Tb4n43pZVnYCSd1nq2MQhZy","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 182094259-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"Qme7Ti1fhvK51mKsC9zkRuFSyCtT6VEcgP2eoKUAhsgbRZ","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 181405468-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmTRCx7qB9DSneGo9GSgi8yK8SBsDveP2nC7rCmDhJRw43","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 180342336-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmcxNzK1XPeHoBamyuam4GJJvcJsV2eHuPvqvF5cymWgpm","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 178874721-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmeKgQiDpi7U9UEPJLMVVrkNs9LfUNPznEHJK7JZoFVkFb","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 178682716-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.json":"QmYtiRHA2QSgSu4Weg2cUss2mv7jEEEUEzrhcSEQKkXTfE","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 175781273-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmVurqzLDcRzxPFSk38Wh6AengC6nPrSMgaZWUN7QQdYms","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 174158494-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmWfJGRGrofUkCKEZXAayoCycjMLCJBQ3LAFiTVr7T8CPd","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 167046152-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.json":"QmQTwnBMNhSD3gEygRWWYmaXJaBoX52jwrxx1qP8ZRR5cm","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 164598052-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Standard.json":"QmTLrNGjyYpWrJJ6nGeRs9VSETFszC5nKKfgnWd8LMdkWr","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 163194524-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmRMg1ejQXhBwqo7d4SGjt18LCzP14nGUg2gs4akPuvRHu","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 161322513-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.json":"QmaASAVmWCfZkCphAXDAWTui12QwjmJ8gpGxdgHsPhwHcR","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 159618154-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmeXu75xkdtcm7kLwiEssgzeuzNY29hvzumguq1qyjMU5L","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 155970847-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmRrK6jY5arcaN8sFJ37Kq4ZxiTaajWHMJ4a9wkWRV3UL4","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 155161625-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmbvZXXzMZQUFooBn6HYviSWStMJruepEyYj7sZpmpj3iS","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 149355080-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmdAcsVghXYNxrBk1MELM3RqoSspjMSfsDigVa3cNP13NR","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 146440687-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmY31ycBSiCS3w8SLjThAyqcDmeMUeZ7qawDHe5bVur8BD","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 145685318-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmQjmypdrcSHsDFgSqGQa1vYSDab7NfL2bMG6P2eYEdA3C","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 143583054-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmTF5wWgMKXmhdZyAPicP7ALFnGZaidXyy63LiEWwDzmia","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 142934304-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.json":"QmZk46gDK7FuMSkc1qmDqMvv6N6Lda4d7cegWGXXw8E54Z","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 141638331-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.json":"QmRaXq63BntDjhf1zHc2R5629ipsgMdoL8zsjMv6yf1iWB","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 140713054-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"Qmd26KYbv1QtvizxLskeWtNTW5HkSfRcRT8wZsmVsyCBJu","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 138067767-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmNfv9vPiVUGS7p97dz9m6BFhrs36wMTHQ3NCSDq3EFu8a","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 135391531-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Standard.json":"QmRaqPiaHLBCNRWYKxBmce24TjZwUNPTaFNGehUqHia2Er","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 134180105-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.json":"QmQhWoT6vqkuvePVXwBvo967S9DskqgGbKrCMDQZc4tjhS","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 132826108-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Standard.json":"QmPvd7xkn4UDzumwoaeCNzvEJvExWGhNFFbYWunXW5pSoX","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 130446770-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmRXVuKXVCnPevFuAshURyyTeUxDuFyFsJs7VGDE9KzbDw","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 127194446-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.json":"Qmbc1y5zDg41WD4A5UyaUvCoRPixxJA9TAfW4Pw1NaNpti","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 126608850-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.json":"QmSmtsJqvdj6RDzgSvsBJhX1qzc3qmnSJHkdK6cRCy9tkJ","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 12053700-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.json":"QmUYoC6AMGpLpHUd5r7avXBSYcwYuwbrXnt7oicmYKEpb4","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 118857817-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.json":"QmaZiEwetunh2JbqsWXb978A5nWAYSSvom86TGcPTfw4WN","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 118430447-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmazQXb2mDjQpBFcSbKcyRYrwEzfw3GbjA6hYd9EZKXrij","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 118071238-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmctzdDTsKabxHpx5rGLmUX2hpqq5E96idv7c5WCRzgxtZ","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 115934089-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmUqYwNhapFEXij8CGhYi1cvXs9B3hyL4QP1qFAoD9et6t","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 114022009-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmYFKx9mvyM1kdVeNGtcSwwfutgfnvcReovTQPY2NXLbN8","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 109730140-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmYJGCdvRvPcFD3LfMfCdgN3AV4Eq4Dx9tMUBWKU3YFMV1","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 107546496-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.json":"QmchcNwzWwon9SojfBiDNzUswzYSQuABma9ZWZZZ61dB2C","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 106721931-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmVEoMrjfVYUUtdP3pW3aB3CVmw49nYXy1u3P1VLGvyzHK","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 105223686-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmVjatveU4DWmjLw3ZFKZXYmzX6aKDeiayHSnauCDuUUvK","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 10466621-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmW7z5zoWT911eHTQPwjBwo4PW9YtqSWab1fMM34jYbjtq","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 104362610-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.json":"QmcsihxpPt67tK9jP16qx3b2373S9yndiD7X5VkdKmutAo","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 97968631-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmYCAfRBGx8PpQ8iFBpELcorUgTkQrXKPAhtyvog4KuaK7","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 9773530-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmdogzfnUc5U57cRfNqzaVEis6jJnPXzjWhXRNzv86AZ5L","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 90846428-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.png":"QmNsi43YU2Tygd6L9Mb1bvfHWU91BUPyFCSzgLBCxf3RzA","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 88708675-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmZ6AUi6MkbGGLHXCakhs3mGv4qtKH34NHSUZcwfiU3xHq","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 86477580-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Standard.png":"QmZd8UPnWWH5k9udsrU7QqBMjUrPjTysdS15QL8MNLCeDq","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 85324090-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"Qmc6L6EfGd2SvHPJVnNDxuwiAsYiNNDT8SREDtYX4YqwSZ","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 8272158-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmRPCJfo2f96gzgniU4eZNqRiTwKkTshwwVGQh3h111aFA","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 8233769-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Standard.png":"QmWRHg1AiQd2hin6HiMQB5P4THkuwCkke8TJyZ3ZZV6qiv","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 78058691-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmSoCBeWaTMQcJBaxYrFbQBryWFLM8gRpsxUkJWGHtu3wP","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 73517011-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"Qmb93v46vdE6hRBAXYe7f875roBAvpDjrbTs27dJ7ThpX6","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 73011684-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmX8SRLtgWzeEJ4ufNusVmEE4G6oGZvDMSDQADRGYJduLN","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 7213016-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmSPpj7vNYpW7SAgDqpPfU8icVhWzqpV7x16kwtFhLKanj","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 68289943-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Standard.png":"QmUVK5pdNU2LbC5aZPp6MCG7YJNjCVZ7o1f46UYZcooBvM","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 68087809-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"Qmdpgu82bY2tJvX3k4drrZxDRj8wfr8JbBt5rMkbvhgPwB","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 67403366-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmarzWaa8BJpATba7RLg7j9XSag4d5hcYjMNF3ufJyBq34","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 67210723-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Standard.png":"QmaEyXVorTD6yUrxGaeicPChua3UHWYwfTAn8VYtiLQquW","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 66247605-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmQMLG4n8zG9EPUVJW3eb57BHC72t28y1KLCTfS9PUfteH","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 64022944-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmR8B6i9tAnFBtszjDMicCxZUrbvX5CDZ2sX1eyJPYoStD","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 55676841-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmULGVJawSQetq7q57Pa9JfcriUtqGND2F1cMmEgThi71F","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 51761580-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmTrY8uTEY2TbKYEFigpQviDrgJEZ3d3jfJFa8ysMqxuTm","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 49465363-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmfSWmcaBYiyt2AKEsRWNX4uvnicwmeFPt4f2oT5suDSbg","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 47772778-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"Qmd1aZL3D8NHWcdQJpF6Eif2556vgo8s4Tyux6tgHQxGUr","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 47351919-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmWSZX5xPATEc7vaZrvC4gE9ekqHNnbeeRrGEWRQ1uBoka","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 47279794-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmS4BtPxQCwU5Ap1qwxuquvsJyJpD2BRahMY3KvcQfySco","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 39363720-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmaPCcfTH2EU2UNdVex6iRetKwRNJJFnbEWYQehQmDhsrr","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 36496062-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmYBmWajhmsxELfrp596H9DWaYJ6z2TPpHk3JHBtinYRtF","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 32606777-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.png":"QmSK1THx5LQYpH2AUhRmv4XtfgSPmJC9K4ZRHxK8nUWhPY","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 29445650-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmUMSgZ21627N2rvvQkZWXKpRzbEGfaZQnTtcXDUrTbzrk","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 24002144-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmSu2xRW8tV9kDhiXcqVw1BRbvdawJ4RnAzBGB8TQdjysZ","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 238055415-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmSj2PhCEgUcFqaYJQf5R87YbEiUgPtGvudH1kHjGwqBFz","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 237976726-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.png":"QmXcmCGzhbF9EMC5otFXhfhjEVahoGEyYU6AsGC8o1hdhB","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 237365546-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmZVttWSKoWWxuFEAsiwgqekT21b9EaRUcuwFWvkJ4hUDt","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 234110428-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmSjPw1Jwewb7xDnUX2v8LJAWaZooTd7pwsRCcNEMUBee8","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 233318353-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmYC9YvFr2JYT6DoBb5S6kT1PseiD6C77ZRfGCfg3KjNBU","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 232277112-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmVwBLTzCE3br4yQFq9d1MX9m1YPtcyef4bRLRv6z6keV4","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 228574574-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmSLDYSDDhenU2AAxUE7EkvhS3V1dvntqwcmTVpz8r93VP","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 226831961-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmdQ5yWs9ZE3cxtbWM5SXFVzEuwdzdTZ1Ws9a51GZziP5L","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 225601895-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmQQRpV1gCJay7N6GBJidg6qEZuzyqrffpxvM1tchapqbb","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 224350072-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmPwQP9nXmtKEFUw5DbNiNhdFtUazf3taJUetPX31kJd63","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 217459466-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmaZ8kkZH52aAyQ6mGgW1kY7GgVuehVEs8Rt2iL9De9vq8","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 215220443-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.png":"QmXrBcgKGB6vdt5Fjoo9UyUcktxdUhSQ3RD2ZBVhFxiSh8","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 213602920-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Standard.png":"QmXvTDtPhYU6ypHYSScqLDWM8nWrFFQrPyz51rEvaDi7vk","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 21022310-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmTQqimXsDQ72wKcBtpbgahekPH4Akvd8RN22asnxB4JDd","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 210190475-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmZMkHZmFkYagLc5AMctoFubBzsVUh3Ta9LqEUArjip7Wb","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 208609234-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmZQBSLzWtUoqZ5LSjaqMrfvCfqSKuXYriFNqp4Kws2uNA","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 203266697-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmR5NovB36L53ZJEdaFikbs5x7BkUiH6nDqyeYjsQupQJz","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 203223262-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmdA6a3uDHZsb6aDV4m3SZ3cWzB7USZWwL2P5AxBUwXBiZ","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 201410451-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"Qmaka6PpRa5VjkwhksuDJ3SvJakQPPm5UkuzgxNsTe4NjQ","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 201212922-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmWgQfEc9Nn9LK2tFi3GZG3gkxMYX8B8Hxvomaboma1rCo","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 198779625-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmdN7aEzJxiTdM4nTLrbwQRpeQTcdVyVkZHavnC52PSmdf","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 19696547-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmWX1RpDh4quG9U8rvXP98GyyDZA4YfZ6CjsspMyZTWbUG","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 189318101-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmcMU2Aiv73eN9eB2QQ7bp4rkjrbBeTPiRrTuYbZznbPhZ","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 187597847-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmUrfxJ4mF6C8qJy12UV5Tq8adHLnNHyqXTLahhLzFFjL9","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 186727752-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.png":"QmZgHsi2Qg9S45UAejPxPoHUqCYXtwZNqBW49LDwDWTCgM","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 182094259-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmSRADJE9B7wbDzNUuxwj75Rag3n988b8pWGYkHRoYRRTZ","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 181405468-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmRq2bNUrprPoeNpgagktGmb9PJQRucgTrxwptJvFRdzUJ","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 180342336-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmXRgqn6B9MAMcbJ59o4zzDieY4mGKckXUXQ5VZaSZSUC9","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 178874721-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmP58VzqngDappwdGdecGmSgsiteMeYFXw8wdJarzSZi1p","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 178682716-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.png":"QmYvyoTEKDpMJ5JoKgzCtZEggZprKwF4oViSyLwp8tjxZb","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 175781273-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmdV4asawBZKhxe4qS7jCvfLaJDTqp4swTQdpwQMe6aKD5","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 174158494-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmYpXDtWqGVmty8dbuFo1k1Pe7k6iPiJWeWgiHStonRxri","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 167046152-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.png":"QmX7yHKpcx1AUj9XQhiVCb8GtqDXtyczgbZUsM9eF3esMp","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 164598052-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Standard.png":"QmWN88wTWNatKhw8H2j5Yb9X9g74kAP4Cr2bLT4T41NaQB","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 163194524-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmSX9KMAxT3qN6oYbQXZNmNWaRn5qyVwkRTr9Q4ReYMuFU","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 161322513-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.png":"Qma4ykWUJuLY9RMv28mE66NPcuNDR1WBTqPruNgMcv49d8","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 159618154-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmTBxRpTmreYKy61hbQwcnd8X5EgDsShvs6FdmEjKBJdx6","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 155970847-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmdGuYq2BiHMRjhthYTGUVHF88TDC1FHQf2pL7vpkEGaR8","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 155161625-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmfVuzoM6B8v2FKF91xh1hwDiuTCCzvUu2GJSbhTnxazb8","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 149355080-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmTZzd9MPNpz6e7T1gtqGZ3CysW87Auier7x7S7bp3rt5R","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 146440687-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmWb7MtPWegbQPT4z9XidF8jmaofmZdNGsjsYZbJrMnQkR","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 145685318-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmZMCStQigAnbwHqXkMyR9Dm9YxVbmWQpwkVGrqWKUYAjp","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 143583054-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmVDEqgMtzyvUtdHpVsHYMcm9ixJAHnmtCcHz2ZPFEaiHQ","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 142934304-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.png":"QmTTPBVhEUeRt2rMgcvC5hLrg2yrCtcTZQHtcfuzNyU17p","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 141638331-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.png":"QmdPf2FDGDf9Ynkz6AfzHb75hvUUJvtbq6dikUZh3bWGLJ","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 140713054-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"Qmbz4EDjj5QeRFBJ8oQQQw8mWuHM36rdn3ALSgCgPGQk7q","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 138067767-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmbK48iLVrtbfSFTUqVaRDZkDeRocmiNyFg6THREaKe4kC","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 135391531-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Standard.png":"QmX82jXsCoSBzHRWsrqt7mHs2ovKLTNNQ3zoVVt17S2Fn7","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 134180105-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.png":"QmXZhwiBAx7qhrXTbpBEyY4vPC6yGnWePnpiyvYzHYmTbU","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 132826108-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Standard.png":"QmPCn9owEP3GUMkND9PkcUmRnLioA6YLiRqpoGYRNUT5Qm","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 1324497-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmSY41bnKfui5NRfadrjGBJMCVYJmFYpRqpS9kYWEXDzz5","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 130446770-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"Qma3VC7FDPfChPVaFy4ngALwfLpwgwrmufMNCX7rogaRc7","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 127194446-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.png":"QmUXXp8pd4xcTzAXhaWCDGGpbJUztGvHmLUHjV8dNJdS54","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 126608850-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.png":"QmU84C8jHa86tNeLSSGxKfND4qDCKqBjx888fGhLYavUxh","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 12053700-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.png":"QmbNBT7iZFkLuvrZqBw3AH9jqD7aXq4kZ54TDRGPMFzmLt","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 118857817-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.png":"QmQ9qhV9nFPFLEkSo8C1msRJbcRmBoctGzMVwJzGtiyjLu","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 118430447-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmZZzWmQninEM8QAGecPEnDfvwj7tYSb4LmP63D6QR1tfH","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 118071238-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmetSpwWS4QMPSbCbazKVe97xupQ3cnTHkPKBX3L8sjQkh","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 115934089-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmU865v23sm1XEFirRytMiF1gecMSih9yBVREsCwZDoBUg","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 114022009-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmU8AiAfoQpUjxjxeFaT6NZ5jwh4DN3cioJfHKpQWGpFEs","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 109730140-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmSwVty4mUCrkzvB1s69JK7uQncTdaeeg84k5LgnMnzWm1","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 107546496-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Motion.png":"QmP5nGUTeVjUkhj97ehs4x5CrtQDX2GaofE6egaDnz3vry","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 106721931-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmSEcd2tU8cKZQBEqofY1x1LfhN7mNq1VQ4dJVhZMr2JUL","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 105223686-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmfKFWaKfcAGRS9ay282dwBw8G18AmrAACSKEhhsMGooAH","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 10466621-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"Qmd2C1xAJur3sVk9wRBXRiUNMr3gMaDemdgScmqKr79kWM","cyber city dawn detailed painting [ruDALL-E Arbitrary Resolution v2] 104362610-gigapixel-low_res-scale-2_00x-gigapixel-art-scale-3_00x-SharpenAI-Focus.png":"QmYATw8ftxa9gq2p8treNnPKpDNgCSW3ompoXk5gURJ6zo","1.json":"QmP3o6Xcpy3Xt5wdvwWRquNeKKsZPuestKbtC3XpHDRG4U","1.jpg":"QmUqdDSy3qLk9yBndSNHwF1jSdurtJnqEfkSDPVTeiNZAr","two.png":"QmazpAaWf3Bb4qhSW9PnQXfj2URbQwdNbZvDr77RbwH7xb","one.png":"QmZPnX4481toHABEtvKFoCWoVuzFFQRBiA5QR2Cij9pjon"}
let notjson: any[] = []
for (var a in ajson){
  // @ts-ignore
notjson.push(ajson[a])
}
console.log(notjson)
let currentAccount = ""
let addressContract='0x14B2F38e4079c079752F5035D1b65200EefCD94D'



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
     setLabel(mins.toString()  + " minutes left.")
    

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
  setHowmany(parseInt(e.target.value))
}
catch (err){

}
}
  const [balance, setBalance] = useState<string | undefined>()
     function mintOneorTwo(){
    if(!window.ethereum) return

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    erc20 = new ethers.Contract(addressContract, abi, signer);
    var value = parseInt(ethers.utils.parseEther("0.03").toString()) * howmany
    var options = { gasPrice: 4380000000, gasLimit: 42000 * 10 * 3 * howmany,value: BigInt( value ),from: currentAccount };
    erc20.x().then( async (result2:string)=>{
        let result = parseInt(result2)
        console.log(currentAccount  ,"ipfs://" + notjson[result], "ipfs://" + notjson[result+1])
        // @ts-ignore
        await erc20.mintNFT(currentAccount  ,"ipfs://" + notjson[result], "ipfs://" + notjson[result+1], howmany, options);

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
    
    
    return (
      <ThemeProvider theme={theme}>
        <main>
         
  <div>
        {currentAccount  
          ? <Button onClick={onClickDisconnect}>
                Account:{currentAccount}
            </Button>
          : <Button  onClick={onClickConnect}>
                  Connect MetaMask
              </Button>
        }
        {currentAccount  
          ? <div>
          <div>ETH Balance of current account: {balance}</div>
          <div>Chain Info: ChainId {chainId} name {chainname}</div></div>
        :<></>
        }</div>
  
              

            <MainContainer>
                
                <MintContainer>
                    <DesContainer>
                        <NFT elevation={3}>
                        Welcome to Saucebook 10k for 10k Cyberscapes mint. 
                        <br />Exclusive access to Twitter followers for first 24 hours and 2 NFTs delivered for every 1 purchased. 
                        <br />Enter your Twitter username without @ in the box below to ensure you receive details of follow up offers and airdrops.
                        <br />
                        @<TextField

        >saucebook</TextField>

                            <div><Price
                                label={"0.03 ETH per unique 1/1 0-decimal SAUCE"}/>
                                <Image
                                src="cool-cats.gif"
                                alt="NFT To Mint"/></div>
                            <br/>
                            </NFT>
                       
                              <div>
                                <h2>{label}</h2>
        <div><b>Tis Saucey</b>: {addressContract}</div>
        <div><b></b>{totalSupply} / 10000 minted!</div>
    </div>
                            <br/>
                            
                            <MintButtonContainer> <div>How many? (1-2 in this box for 0.03-0.06 will yiled 2 or 4 SAUCE for the first 24hrs, after timer runs out then you can enter 1-4)
                            <TextField onChange={onBlarg}

                            >1</TextField> {true && 
                           
                            // @ts-ignore
                                                <MintButton
                                                    isMinting={isMinting}

                                                    onMint={startMint}
                                                />
                            }
                            </div>
                            </MintButtonContainer> 
                    </DesContainer>
                    </MintContainer>

            </MainContainer>
        </main>
        </ThemeProvider>
    );
};

export default App;
