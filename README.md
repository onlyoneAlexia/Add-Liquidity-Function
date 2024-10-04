# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```

this project illustrates the process of adding liquidity to a uniswap v2 pool.
the add functions:

function addLiquidity(
address tokenA,
address tokenB,
uint256 amountAdesired,
uint256 amountBdesired,
address to
uint256 deadline){
    
}



}
in this contract we were asked to add liquidity to the USDC-DAI pool on uniswap v2
using the two tokens that are already in the contract

we had to approve the router to spend the tokens.
the "to address" is used to specify the address that will receive the tokens.
the "amount" is the amount of tokens to be sent to the "to address".
the "deadline" is the time after which the transaction will fail.

we used the ROUTER to add liquidity to the pool.


1. add the function you want to interact with from the uniswap v2 router eherscan