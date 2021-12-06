import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import React, { FC, createContext, useContext, useEffect, useState } from 'react';

import { swapSolToUSDC } from '../orca/orca';
import { calculateSupplyAPY } from "../solend/apy";
import { depositReserveLiquidityAndObligationCollateralInstruction } from "../solend/deposit";
import { isReserve, ReserveParser } from "../solend/reserve";
import { parseObligation, isObligation, obligationToString } from "../solend/obligation";

const DeFiOptionsContext = createContext(null);

export interface DeFiOption {
  name: string;
  currentAPY: number;
  deposit(amount: number): boolean;
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

  const depositPressedSolend = (amount: number) => {

    if (wallet?.publicKey) {
      swapSolToUSDC(connection, wallet.publicKey, amount);
    }

    // depositReserveLiquidityAndObligationCollateralInstruction(
    //   liquidityAmount: number | BN,
    //   sourceLiquidity: PublicKey,
    //   sourceCollateral: PublicKey,
    //   reserve: PublicKey,
    //   reserveLiquiditySupply: PublicKey,
    //   reserveCollateralMint: PublicKey,
    //   lendingMarket: PublicKey,
    //   lendingMarketAuthority: PublicKey,
    //   destinationCollateral: PublicKey,
    //   obligation: PublicKey,
    //   obligationOwner: PublicKey,
    //   pythOracle: PublicKey,
    //   switchboardFeedAddress: PublicKey,
    //   transferAuthority: PublicKey,
    // );  

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

          // get reserve for USDC devnet account: FNNkz4RCQezSSS71rW2tvqZH1LCkTzaiG7Nd1LeA5x5y

          var solendOption = {
            name: "Solend",
            currentAPY: 3.4,
            existingDeposit: 0,
            deposit: depositPressedSolend,
          };

          // fetch solend APY
          // devnet public key
          const usdcPubKey = new PublicKey("FNNkz4RCQezSSS71rW2tvqZH1LCkTzaiG7Nd1LeA5x5y");
          const solendUSDCAccount = await connection.getAccountInfo(usdcPubKey);
          if (solendUSDCAccount) {
            console.log("1");
            console.log(isReserve(solendUSDCAccount));
            const solendUSDCReserve = ReserveParser(usdcPubKey, solendUSDCAccount);
            if (solendUSDCReserve && solendUSDCReserve.info) {
              console.log("2");
              const apy = calculateSupplyAPY(solendUSDCReserve.info);
              solendOption.currentAPY = Math.round(apy * 1000) / 10;
            }

            // fetch solend existing deposit
            /*
            const solendUserAccount = await connection.getAccountInfo()
            const obligation = parseObligation(wallet.publicKey, userAccount);
            console.log(isObligation(solend))
            */
          }


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
