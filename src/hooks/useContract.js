import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";

import { getMintContractAddress } from "../utils/addressHelpers";
import mintContract from "../config/abi/mintContract.json";
import getRpcUrl from "../utils/getRpcUrl";

const RPC_URL = getRpcUrl();

const httpProvider = new Web3.providers.HttpProvider(RPC_URL, {
  timeout: 10000,
});

export const useWeb3 = () => {
  return new Web3(httpProvider);
};

const useContract = (abi, address) => {
  var web3;
  if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
    window.ethereum.enable();
    web3 = new Web3(window.web3.currentProvider);
  } else {
    const provider = new Web3.providers.HttpProvider(RPC_URL);
    web3 = new Web3(provider);
  }
  return new web3.eth.Contract(abi, address);
};

export const useMintContract = () => {
  const abi = mintContract.abi;
  return useContract(abi, getMintContractAddress());
};
