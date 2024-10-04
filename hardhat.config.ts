// import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config({ path: ".env" });

const ALCHEMY_MAINNET_API_KEY_URL = process.env.ALCHEMY_MAINNET_API_KEY_URL;
const ACCOUNT_PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY;

import { HardhatUserConfig } from "hardhat/config";


require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    // for testnet
    'lisk-sepolia': {
      url: 'https://rpc.sepolia-api.lisk.com',
      accounts: [process.env.ACCOUNT_PRIVATE_KEY as string],
      gasPrice: 1000000000,
    },
  },
};

export default config;
//0x84e5d2f91766721378De50958CB81996cB493033