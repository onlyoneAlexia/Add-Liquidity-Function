import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");

async function main() {
    // Define addresses for Uniswap V2 Router that we are using,
  
    const ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
      //this are the addresses for the uniswap v2 router and the tokens we are using
    const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

    // Address of the account to impersonate (should have sufficient token balance)
    const TOKEN_HOLDER = "0xf584F8728B874a6a5c7A8d4d387C9aae9172D621";

    // Impersonate the token holder account
    await helpers.impersonateAccount(TOKEN_HOLDER);
    const impersonatedSigner = await ethers.getSigner(TOKEN_HOLDER);

    // Define desired and minimum amounts for providing liquidity
    const amountADesired = ethers.parseUnits("200", 6);  // 200 USDC (6 decimals for each token
    const amountBDesired = ethers.parseUnits("200", 18); // 200 DAI 
    const amountAMin = ethers.parseUnits("100", 6);      // 100 USDC minimum
    const amountBMin = ethers.parseUnits("100", 18);     // 100 DAI minimum

    // Get contract instances
    const USDC_Contract = await ethers.getContractAt("IERC20", USDC, impersonatedSigner);
    const DAI_Contract = await ethers.getContractAt("IERC20", DAI);
    const ROUTER = await ethers.getContractAt("IUniswapV2Router", ROUTER_ADDRESS, impersonatedSigner);

    // Approve router to spend tokens
    await USDC_Contract.approve(ROUTER, amountADesired);
    await DAI_Contract.approve(ROUTER, amountBDesired);

    // Get initial token balances
    const usdcBal = await USDC_Contract.balanceOf(impersonatedSigner.address);
    const daiBal = await DAI_Contract.balanceOf(impersonatedSigner.address);
    const deadline = Math.floor(Date.now() / 1000) + (60 * 10); // 10 minutes from now

    console.log("usdc balance before swap", Number(usdcBal));
    console.log("dai balance before swap", Number(daiBal));

    // Add liquidity to the USDC-DAI pool
    await ROUTER.addLiquidity(
        USDC,
        DAI,
        amountADesired,
        amountBDesired,
        amountAMin,
        amountBMin,
        impersonatedSigner.address,
        deadline
    );

    // Get token balances after adding liquidity
    const usdcBalAfter = await USDC_Contract.balanceOf(impersonatedSigner.address);
    const daiBalAfter = await DAI_Contract.balanceOf(impersonatedSigner.address);

    console.log("=========================================================");

    console.log("usdc balance after swap", Number(usdcBalAfter));
    console.log("dai balance after swap", Number(daiBalAfter));

    console.log("=========================================================");

    // Calculate and log the amount of tokens used for liquidity
    console.log("usdc used for liquidity", Number(usdcBal) - Number(usdcBalAfter));
    console.log("dai used for liquidity", Number(daiBal) - Number(daiBalAfter));
}

// Run the main function and handle any errors
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});