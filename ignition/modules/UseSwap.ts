import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";



const UseSwapModule = buildModule("UseSwapModule", (m) => {
  const useSwap = m.contract("UseSwap", [ "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"], );

  return { useSwap };
});

export default UseSwapModule;
