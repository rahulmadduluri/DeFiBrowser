// ConnectButton.tsx
import { formatEther } from "@ethersproject/units";
import { legos } from "@studydefi/money-legos";
import { ethers } from "ethers";
import { getContractAddress } from "ethers/lib/utils";
import React, { useState } from 'react';
import erc20_abi from "../abi/erc20.json";

export default function SimpleStore() {

  const [errorMessage, setErrorMessage] = useState<string>();
  const [defaultAccont, setDefaultAccount] = useState<string>();
  const [connButtonText, setConnButtonText] = useState<string>('Connect Wallet');
  
  const [currentContractVal, setCurrentContractVal] = useState<string>();

  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();
  const [contract, setContract] = useState<any>();

  const  handleConnectWallet = () => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' }).then((result: any[]) => {
        accountChangeHandler(result[0]);
        setConnButtonText('Wallet Connected');
      });
    } else {
      setErrorMessage('Need to install MetaMask!');
    }
  }

  const accountChangeHandler = (newAccount: string) => {
    setDefaultAccount(newAccount);
    updateEthers();
  }

  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    const yearnContract = new ethers.Contract("0xdA816459F1AB5631232FE5e97a05BBBb94970c95", erc20_abi, tempSigner);
    setContract(tempContract);

    // const yearnContract = new ethers.Contract("0xdA816459F1AB5631232FE5e97a05BBBb94970c95", erc20_abi, provider);
    // const yearnContractWithSigner = yearnContract.connect(signer);
    // const tx = await yearnContractWithSigner.deposit( ethers.utils.parseEther('10.0'))

  }

  const getEthBalance = async () => {
    const balance = provider ? await provider.getBalance("0xe0d6cd5aB38D39E21cb1ab017A54B5D532BAEEd5") : 0;
    return balance;
  }

  const getDAIBalance = async () => {
    const balance = provider ? await provider.getBalance("0xe0d6cd5aB38D39E21cb1ab017A54B5D532BAEEd5") : 0;
  }

  // const daiBalance = useTokenBalance(legos.erc20.dai.address, account);

  return (
    <div>
        <h3>Deposit Stabelcoins to Earn Yield!</h3>
        <button onClick={handleConnectWallet}>{connButtonText}</button>

        <p>{getEthBalance()}</p>
        <p>{getDAIBalance()}</p>
        {errorMessage}
    </div>
  );

  // return account ? (
  //   <div>
  //     <p>
  //     {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH
  //     </p>
  //     <p>
  //     {daiBalance && parseFloat(formatEther(daiBalance)).toFixed(3)} DAI
  //     </p>
  //   </div>
  // ) : (
  //   <button onClick={handleConnectWallet}>{connButtonText}</button>
  // );
}
