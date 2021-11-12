import { useEthers, useEtherBalance, useTokenBalance, useContractCall } from "@usedapp/core";
import ConnectButton from "./components/ConnectButton";
import { legos } from "@studydefi/money-legos";
import uniswap from "@studydefi/money-legos/uniswap";
import { Dai } from "@usedapp/core";
import { useState, useEffect} from "react";
import ContractCaller from "./components/ContractCaller";
import { ethers } from 'ethers';
import erc20_abi from "./abi/erc20.json";

export default function App() {

  // const {activateBrowserWallet, account } = useEthers();
  // const [isDepositing, setIsDepositing] = useState<boolean>();
  // const [results, setResults] = useState<any>();

  // useEffect(() => {
  //   if(isDepositing && results){
  //     setIsDepositing(false);
  //   }

  // }, [isDepositing, results]);

  // console.log("IS DEPOSITING:" + isDepositing);
  // console.log("RESULTS: " + typeof results);

  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  // @ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  // The MetaMask plugin also allows signing transactions to
  // send ether and pay to change state within the blockchain.
  // For this, you need the account signer...
  const signer = provider.getSigner()

  useEffect(() => {
    async function doWork(){
      const balance = await provider.getBalance("0xe0d6cd5aB38D39E21cb1ab017A54B5D532BAEEd5")
      console.log(balance);
    }
    doWork();
  })

  useEffect(() => {
    async function doHappyThings(){
      const daiContract = new ethers.Contract(legos.erc20.dai.address, erc20_abi, provider);
      const balance = await daiContract.balanceOf(await signer.getAddress());
      console.log("DAI BALANCE:" + balance);
      
      // Approve yearn to spend dai UNCOMMENT THESE THREE LINES TO APPROVE
      // const daiContractWithSigner = daiContract.connect(signer);
      // const txApprove = await daiContractWithSigner.approve("0xdA816459F1AB5631232FE5e97a05BBBb94970c95", ethers.utils.parseUnits("50.0", 18));
      // console.log("TX Approve: " + JSON.stringify(txApprove));

      // Deposit dai into yearn - UNCOMMENT NEXT FOUR LINES TO DEPOSIT
      // const yearnContract = new ethers.Contract("0xdA816459F1AB5631232FE5e97a05BBBb94970c95", erc20_abi, provider);
      // const yearnContractWithSigner = yearnContract.connect(signer);
      // const tx = await yearnContractWithSigner.deposit( ethers.utils.parseEther('10.0'))
      // console.log("TX DEPOSIT: " + JSON.stringify(tx))

    }

    doHappyThings();

  })


  return (
    <div>
      <div>
        {/* <ConnectButton /> */}
        {/* {isDepositing && <ContractCaller account={account} setResults={setResults}/>} */}
        {/* <button onClick={() => setIsDepositing((oldIsDepositing) => !oldIsDepositing)}>Deposit</button> */}
      </div>
    </div>
  )
}

