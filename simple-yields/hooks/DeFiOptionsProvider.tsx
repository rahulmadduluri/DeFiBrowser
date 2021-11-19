
import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import React, { FC, createContext, useContext, useEffect, useState } from 'react';

// import { ObligationParser } from "../helpers/solendObligation";

const DeFiOptionsContext = createContext(null);

export default function useDeFiOptions() {
  const [defiOptions, setDefiOptions]: any = useContext(DeFiOptionsContext);
  return [defiOptions, setDefiOptions]
}

export const DeFiOptionsProvider: React.FC<{}> = ({ children }) => {
    const { connection } = useConnection();
    const wallet = useWallet();
    
    useEffect(() => {
        (async () => {
          if (wallet?.publicKey) {
            // fetch DeFi Options (eventually from server)
          }
        })();
    }, [wallet, connection]);

    return <DeFiOptionsContext.Provider
      value={[defiOptions, setDefiOptions] as any}>
      {children}
    </DeFiOptionsContext.Provider>
}

// export const YieldOptionsListView: FC = () => {
//     const { connection } = useConnection();
//     const { publicKey } = useWallet();

//     // MAIN NET
//     // const SOLEND_PROGRAM_ID = "So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo";
//     // const LENDING_MARKET_MAIN = "4UpD2fh7xH3VP9QQaXtsS1YY3bxzWhtfpks7FatyKvdY";
//     // DEVENT
//     const SOLEND_PROGRAM_ID = "ALend7Ketfx5bxh6ghsCDXAoDrhvEmsXT3cynB6aPLgx"
//     const LENDING_MARKET_MAIN = "GvjoVKNjBvQcFaSKUW1gTE7DxhSpjHbE69umVR5nPuQp"

//     const OBLIGATION_LEN = 1300;
//     const RESERVES_TO_ASSET_MAP: { [key: string]: string } = {
//       "8PbodeaosQP19SjYFx855UMqWxH2HynZLdBXmsrbac36": "SOL",
//       "BgxfHJDzm44T7XG68MYKx7YisTjZu73tVovyZSjJMpmw": "USDC",
//     };

//     // const onClick = useCallback(async () => {
//     //     if (!publicKey) throw new WalletNotConnectedError();

//     //     const transaction = new Transaction().add(
//     //         SystemProgram.transfer({
//     //             fromPubkey: publicKey,
//     //             toPubkey: Keypair.generate().publicKey,
//     //             lamports: 1,
//     //         })
//     //     );

//     //     const signature = await sendTransaction(transaction, connection);

//     //     await connection.confirmTransaction(signature, 'processed');
//     // }, [publicKey, sendTransaction, connection]);

//     async function getObligations() {
//         const accounts = await connection.getProgramAccounts(
//           new PublicKey(SOLEND_PROGRAM_ID),
//           {
//             commitment: connection.commitment,
//             filters: [
//               {
//                 memcmp: {
//                   offset: 10,
//                   bytes: LENDING_MARKET_MAIN,
//                 },
//               },
//               {
//                 dataSize: OBLIGATION_LEN,
//               },
//             ],
//             encoding: "base64",
//           }
//         );
//         console.log("Number of users:", accounts.length);
//         const obligations = accounts.map((account) =>
//           ObligationParser(account.pubkey, account.account)
//         );
//         return obligations;
//       }
      
//       async function getTotalDeposits() {
//         const obligations = await getObligations();
//         let totalDeposits: { [key: string]: BN } = {};
//         for (const obligation of obligations) {
//           if (obligation === null) {
//               continue;
//           }
//           for (const deposit of obligation.info.deposits) {
//             const reserve = deposit.depositReserve.toBase58();
//             if (!(reserve in RESERVES_TO_ASSET_MAP)) {
//               console.log(
//                 "WARNING: Unrecognized reserve. Update RESERVES_TO_ASSET_MAP."
//               );
//               continue;
//             }
//             const asset = RESERVES_TO_ASSET_MAP[reserve];
//             if (!(asset in totalDeposits)) {
//               totalDeposits[asset] = new BN(0);
//             }
//             // totalDeposits[asset] = totalDeposits[asset].add(deposit.depositedAmount);
//             totalDeposits[asset] = totalDeposits[asset] + deposit.depositedAmount;
//           }
//         }
      
//         return totalDeposits;
//       }
      
      
//     return (
//         <div className="flexbox-container">
//             <div>
//                 Total Deposits
//                 <br/>
//                 DEPOSIT_AMOUNT
//             </div>
//             <div>
//                 APY
//                 <br/>
//                 APY_AMOUNT
//             </div>
//             <div>
//                 <button /*onClick={onClick}*/ disabled={!publicKey}>
//                     Deposit
//                 </button>
//             </div>
//         </div>
//     );
// };
