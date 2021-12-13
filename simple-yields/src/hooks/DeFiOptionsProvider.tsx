import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import React, { FC, createContext, useContext, useEffect, useState } from 'react';

import { swapSolToUSDC } from '../orca/orca';
import { calculateSupplyAPY } from "../solend/apy";
import { fetchSupply, supply } from "../solend/supply";
import { isReserve, ReserveParser } from "../solend/state/reserve";
import { parseObligation, isObligation, obligationToString } from "../solend/state/obligation";

const DeFiOptionsContext = createContext(null);

export interface DeFiOption {
  name: string;
  currentAPY: number;
  deposit(amount: number): boolean;
  existingDeposit: string;
}

export default function useDeFiOptions() {
  const [defiOptions, setDefiOptions]: any = useContext(DeFiOptionsContext);
  return [defiOptions, setDefiOptions]
}

export const DeFiOptionsProvider: FC<{}> = ({ children }) => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [defiOptions, setDefiOptions] = useState<DeFiOption[]>([]);

  const depositPressedSolend = (amount: number) => {

    if (wallet?.publicKey) {
      // swapSolToUSDC(connection, wallet, amount);

      supply(connection, wallet?.publicKey, wallet.sendTransaction, amount.toString(), "USDC");
    }

    console.log("deposit tapped SOLEND");
    return true;
  };

  const depositPressedJet = (amount: number) => {
    console.log("deposit tapped JET");
    return true;
  };
  
  useEffect(() => {
      (async () => {
        if (wallet?.publicKey) {
          // fetch DeFi Options
          // 1. fetch current APY (async)
          // 2. fetch existing deposit (async)

          var solendOption = {
            name: "Solend",
            currentAPY: 3.4,
            existingDeposit: "0",
            deposit: depositPressedSolend,
          };

          // fetch solend APY
          const usdcPubKeyRaw = process.env.NODE_ENV === "development" ? "FNNkz4RCQezSSS71rW2tvqZH1LCkTzaiG7Nd1LeA5x5y" : "BgxfHJDzm44T7XG68MYKx7YisTjZu73tVovyZSjJMpmw";
          const usdcPubKey = new PublicKey(usdcPubKeyRaw);
          const solendUSDCAccount = await connection.getAccountInfo(usdcPubKey);
          if (solendUSDCAccount) {
            const solendUSDCReserve = ReserveParser(usdcPubKey, solendUSDCAccount);
            if (solendUSDCReserve && solendUSDCReserve.info) {
              const apy = calculateSupplyAPY(solendUSDCReserve.info);
              solendOption.currentAPY = Math.round(apy * 10000) / 100;
            }

            // fetch solend existing deposit
            const existingDepositSolend = await fetchSupply(connection, wallet.publicKey);
            solendOption.existingDeposit = existingDepositSolend.toString();
          }

          const jetOption = {
            name: "Jet",
            currentAPY: 5.0,
            existingDeposit: "0",
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
