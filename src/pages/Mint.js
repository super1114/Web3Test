import React, { useState, useEffect } from "react";
import "./Mint.css";
import LeftImg from "../assest/images/left_img.png";
import RightImg from "../assest/images/right_img.png";
import Wallet from "../assest/images/wallet.png";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../wallet";
import { switchNetwork } from "../wallet/ethereum";
import { useMintContract, useWeb3 } from "../hooks/useContract";
import {
  getCost,
  getMaxMintAmount,
  getMaxSupply,
  getTotalSupply,
  methods,
  mintNFT,
} from "../hooks/contractFunction";
import { toast } from "react-toastify";

const MintPage = () => {
  const {
    active: networkActive,
    error: networkError,
    activate: activateNetwork,
  } = useWeb3React();

  const { account } = useWeb3React();

  const web3 = useWeb3();

  const [mintNum, setMintNum] = useState(1);
  const [cost, setCost] = useState(0);
  const [maxMintAmount, setMaxMintAmount] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);

  const mintContract = useMintContract();

  const handleMintNum = (type) => {
    if (type == "plus") {
      const num = mintNum + 1;
      setMintNum(num <= maxMintAmount ? num : maxMintAmount);
    } else if (type == "minus") {
      const num = mintNum - 1;
      setMintNum(num > 0 ? num : 1);
    }
  };

  const connectWallet = () => {
    console.log("connect");
    activateNetwork(injected);
  };

  const getBalance = async () => {
    setCost((await getCost(mintContract)) / Math.pow(10, 18));
    setMaxMintAmount(await getMaxMintAmount(mintContract));
    setTotalSupply(await getTotalSupply(mintContract));
    setMaxSupply(await getMaxSupply(mintContract));
    console.log(totalSupply, maxSupply);
  };

  const mint = async () => {
    const value = web3.utils.toWei((cost * mintNum).toFixed(2), "ether");
    await mintNFT(mintContract, account, mintNum, value);
    toast("Mint NFT Successfully!", {
      type: "success",
      position: "top-left",
    });
    getBalance();
  };

  useEffect(() => {
    injected
      .isAuthorized()
      .then((isAuthorized) => {
        if (isAuthorized && !networkActive && !networkError) {
          activateNetwork(injected);
        }
      })
      .catch(() => {});
    if (networkError) {
      console.log(networkError);
      if (networkError.toString().indexOf("No Ethereum") > -1) {
        toast("Please Install MetaMask!", {
          type: "error",
          position: "top-left",
        });
      }
      if (networkError.toString().indexOf("Unsupported") > -1) {
        switchNetwork();

        toast("Please choose Rinkeby Network!", {
          type: "error",
          position: "top-left",
        });
      }
    }
  }, [activateNetwork, networkActive, networkError]);

  useEffect(() => {
    getBalance();
  }, [account]);

  useEffect(() => {}, []);

  return (
    <div className="fixed inset-0 bg-black text-white overflow-y-auto mint-page">
      <div className="hidden lg:block">
        <div className="left-img">
          <img src={LeftImg} className="h-3/5" />
        </div>
      </div>
      <div className="hidden lg:block">
        <div className="right-img z-0">
          <img src={RightImg} className="h-3/5" />
        </div>
      </div>
      <div className="hidden lg:block">
        <div
          className="wallet-connect py-3 px-6 lg:right-12 xl:right-18 xl:top-16 lg:top-12 lg:right-12 sm:top-8 sm:right-2"
          onClick={() => connectWallet()}
        >
          <div className="pr-4">
            {!account
              ? "Connect"
              : account.substr(0, 6) +
                "..." +
                account.substr(account.length - 4, 4)}
          </div>
          <div>
            <img src={Wallet} width="25" />
          </div>
        </div>
      </div>
      <div className="z-10">
        <div className="text-center mt-10 title xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl xs:text-2xl">
          SAMPLE COLLECTION
        </div>
        <div className="flex mt-6 justify-center lg:hidden">
          <div
            className="py-3 px-6 wallet-connect-md"
            onClick={() => connectWallet()}
          >
            <div className="pr-4">
              {!account
                ? "Connect"
                : account.substr(0, 6) +
                  "..." +
                  account.substr(account.length - 4, 4)}
            </div>
            <div>
              <img src={Wallet} width="25" />
            </div>
          </div>
        </div>
        <div className="text-center mt-10">
          <span className="metakey xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl xs:text-2xl">
            META KEY
          </span>
        </div>
        <div className="desc font-desc-color text-center w-1/2 m-auto mb-8 mt-10 xl:text-3xl lg:text-3xl md:text-2xl sm:text-xl">
          This company is dedicated to helping solve the climate crisis through
          the regenerative cultivation of the hemp plant.
        </div>
        <div className="mint-box text-center xs:w-4/5 sm:w-3/5 lg:w-1/4 m-auto mb-8 mt-10 p-6">
          <div className="text-4xl font-bold pb-6">
            {totalSupply} / {maxSupply}
          </div>
          <div className="text-2xl total-price pb-6">
            Total: {(cost * mintNum).toFixed(2)} ETH
          </div>
          <div className="text-center flex justify-content-center">
            <div className="flex m-auto">
              <div
                className="indecrease-item"
                onClick={() => handleMintNum("plus")}
              >
                +
              </div>
              <div className="mint-num ml-4 mr-4">{mintNum}</div>
              <div
                className="indecrease-item"
                onClick={() => handleMintNum("minus")}
              >
                -
              </div>
            </div>
          </div>
        </div>
        <div
          className="mint-btn xs:w-4/5 sm:w-3/5 lg:w-1/4 m-auto mt-4 text-center p-3 mt-12 mb-8"
          onClick={() => {
            account ? mint() : connectWallet();
          }}
        >
          {account ? "Mint Now" : "Connect Wallet"}
        </div>
      </div>
    </div>
  );
};

export default MintPage;
