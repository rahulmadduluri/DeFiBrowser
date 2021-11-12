import { useEthers, useEtherBalance, useTokenBalance } from "@usedapp/core";
import ConnectButton from "./components/ConnectButton";
import { legos } from "@studydefi/money-legos";
import uniswap from "@studydefi/money-legos/uniswap";
import { Dai } from "@usedapp/core";
import { useState, useEffect} from "react";
import ContractCaller from "./components/ContractCaller";

export default function App() {

  const {activateBrowserWallet, account } = useEthers();
  const [isDepositing, setIsDepositing] = useState<boolean>();
  const [results, setResults] = useState<any>();

  useEffect(() => {
    if(isDepositing && results){
      setIsDepositing(false);
    }

  }, [isDepositing, results]);

  console.log(results);

  return (
    <div>
      <div>
        <ConnectButton />
        {isDepositing && <ContractCaller account={account} setResults={setResults}/>}
        <button onClick={() => setIsDepositing((oldIsDepositing) => !oldIsDepositing)}>Deposit</button>
      </div>
    </div>
  )
}

