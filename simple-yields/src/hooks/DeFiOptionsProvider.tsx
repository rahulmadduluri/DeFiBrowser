import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import React, { FC, createContext, useContext, useEffect, useState } from 'react';

const DeFiOptionsContext = createContext(null);

export interface DeFiOption {
  name: string;
  currentAPY: number;
  deposit(): boolean;
  existingDeposit: number;
}

export default function useDeFiOptions() {
  const [defiOptions, setDefiOptions]: any = useContext(DeFiOptionsContext);
  return [defiOptions, setDefiOptions]
}

export const DeFiOptionsProvider: FC<{}> = ({ children }) => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [defiOptions, setDefiOptions] = useState<DeFiOption[]>([]);

  const depositPressedSolend = () => {
    console.log("deposit tapped SOLEND");
        
    return true;
  };

  const depositPressedJet = () => {
    console.log("deposit tapped JET");
    return true;
  };
    
  useEffect(() => {
      (async () => {
        if (wallet?.publicKey) {
          // fetch DeFi Options
          // 1. fetch current APY (async)
          // 2. fetch existing deposit (async)

          // get reserve for USDC devnet account: FNNkz4RCQezSSS71rW2tvqZH1LCkTzaiG7Nd1LeA5x5y
          // const solendReserve = wallet?.
          const solendOption = {
            name: "Solend",
            currentAPY: 3.4,
            existingDeposit: 0,
            deposit: depositPressedSolend,
          };


          const jetOption = {
            name: "Jet",
            currentAPY: 5.0,
            existingDeposit: 0,
            deposit: depositPressedJet,
          };
          setDefiOptions([solendOption, jetOption]);
        }
      })();
    }, [wallet, connection]);

    return <DeFiOptionsContext.Provider
      value={[defiOptions, setDefiOptions] as any}>
      {children}
    </DeFiOptionsContext.Provider>
}
