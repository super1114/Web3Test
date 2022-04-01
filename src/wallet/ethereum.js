export const ethereumConnect = () =>
  window.ethereum.request({ method: "eth_requestAccounts" });
export const isEthereumConnected = window.ethereum
  ? window.ethereum.isConnected()
  : false;
export const isEthereumMetaMask = window.ethereum
  ? window.ethereum.isMetaMask
  : null;
export const ethereumSendTransaction = (params) =>
  window.ethereum.request({
    method: "eth_sendTransaction",
    params,
  });
export const switchNetwork = () =>
  window.ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: "0x4" }], // testnet // mainnet
  });
