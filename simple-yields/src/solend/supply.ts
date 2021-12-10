export async function supply() {}

import {
    ASSOCIATED_TOKEN_PROGRAM_ID,
    Token,
    TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import {
    Connection,
    PublicKey,
    SystemProgram,
    Transaction,
    TransactionInstruction,
    TransactionSignature,
} from '@solana/web3.js';
import { find } from 'lodash';
import BN from 'bn.js';
import getConfig from "./configs";
// import { OBLIGATION_LEN } from './common';
import {
    initObligationInstruction,
    refreshReserveInstruction,
    depositReserveLiquidityAndObligationCollateralInstruction,
} from './instructions';
import { getTokenInfo, toBaseUnit } from './common';
import { createAndCloseWSOLAccount } from './instructions/createAndCloseWSOLAccount';

import { parseObligation } from './state/obligation';

export async function fetchSupply(
  connection: Connection,
  publicKey: PublicKey,
): Promise<number> {
  // fetch solend existing deposit
  const solendInfo = getConfig();
  const lendingMarket = find(solendInfo.markets, {
      name: 'main',
  });
  if (!lendingMarket) {
      throw new Error('Could not find main lending market');
  }            
  const seed = lendingMarket!.address.slice(0, 32);
  const obligationAddress = await PublicKey.createWithSeed(
      publicKey,
      seed,
      new PublicKey(solendInfo.programID),
  );
  const obligationAccountInfo = await connection.getAccountInfo(
      obligationAddress,
  );
  if (obligationAccountInfo) {
      const obligation = parseObligation(publicKey, obligationAccountInfo);
      const obligationAmount = obligation?.info.depositedValue.toNumber();
      if (obligationAmount) {
        return obligationAmount;
      }
  }

  // if could not find actual obligation amount
  return 0;
}
  
// export async function supply(
//     connection: Connection,
//     publicKey: PublicKey,
//     sendTransaction: Function,
//     amount: string,
//     symbol: string,
//   ) {
//     const amountBase = toBaseUnit(amount, symbol);
  
//     const solendInfo = getConfig();
//     const lendingMarket = find(solendInfo.markets, {
//       name: 'main',
//     });
//     if (!lendingMarket) {
//       throw new Error('Could not find main lending market');
//     }
//     const reserve = find(lendingMarket!.reserves, { asset: symbol });
//     if (!reserve) {
//       throw new Error(`Could not find asset ${symbol} in reserves`);
//     }
//     const tokenInfo = getTokenInfo(symbol);
//     const oracleInfo = find(solendInfo.oracles.assets, { asset: symbol });
//     if (!oracleInfo) {
//       throw new Error(`Could not find oracle for ${symbol}`);
//     }
  
//     let ixs: TransactionInstruction[] = [];
//     let cleanupIxs: TransactionInstruction[] = [];
  
//     if (symbol === 'SOL') {
//       const [createWSOLAccountIxs, closeWSOLAccountIxs] =
//         await createAndCloseWSOLAccount(
//           connection,
//           publicKey,
//           sendTransaction,
//           amountBase,
//         );
//       ixs = ixs.concat(createWSOLAccountIxs);
//       cleanupIxs = cleanupIxs.concat(closeWSOLAccountIxs);
//     }
  
//     const refreshReserveIx = refreshReserveInstruction(
//       new PublicKey(reserve.address),
//       new PublicKey(oracleInfo.priceAddress),
//       new PublicKey(oracleInfo.switchboardFeedAddress),
//     );
//     ixs.push(refreshReserveIx);
  
//     // Get or create user collateral token account
//     const userCollateralAccountAddress = await Token.getAssociatedTokenAddress(
//       ASSOCIATED_TOKEN_PROGRAM_ID,
//       TOKEN_PROGRAM_ID,
//       new PublicKey(reserve.collateralMintAddress),
//       publicKey,
//     );
//     const userCollateralAccountInfo = await connection.getAccountInfo(
//       userCollateralAccountAddress,
//     );
//     if (!userCollateralAccountInfo) {
//       const createUserCollateralAccountIx =
//         Token.createAssociatedTokenAccountInstruction(
//           ASSOCIATED_TOKEN_PROGRAM_ID,
//           TOKEN_PROGRAM_ID,
//           new PublicKey(reserve.collateralMintAddress),
//           userCollateralAccountAddress,
//           publicKey,
//           publicKey,
//         );
//       ixs.push(createUserCollateralAccountIx);
//     }
  
//     const userTokenAccountAddress = await Token.getAssociatedTokenAddress(
//       ASSOCIATED_TOKEN_PROGRAM_ID,
//       TOKEN_PROGRAM_ID,
//       new PublicKey(tokenInfo.mintAddress),
//       publicKey,
//     );
//     console.log(
//       'ASSOCIATED USER TOKEN ACCOUNT ADDRESS',
//       userTokenAccountAddress.toBase58(),
//     );
  
//     const seed = lendingMarket!.address.slice(0, 32);
//     const obligationAddress = await PublicKey.createWithSeed(
//       publicKey,
//       seed,
//       new PublicKey(solendInfo.programID),
//     );
//     const obligationAccountInfo = await connection.getAccountInfo(
//       obligationAddress,
//     );
//     if (!obligationAccountInfo) {
//       const obligationInfoRentExempt =
//         await connection.getMinimumBalanceForRentExemption(OBLIGATION_LEN);
//       console.log(`Creating new obligation ${obligationAddress}`);
//       ixs.push(
//         SystemProgram.createAccountWithSeed({
//           fromPubkey: publicKey,
//           newAccountPubkey: obligationAddress,
//           basePubkey: publicKey,
//           seed,
//           lamports: obligationInfoRentExempt,
//           space: OBLIGATION_LEN,
//           programId: new PublicKey(solendInfo.programID),
//         }),
//       );
//       const initObligationIx = initObligationInstruction(
//         obligationAddress,
//         new PublicKey(lendingMarket.address),
//         publicKey,
//       );
//       ixs.push(initObligationIx);
//     } else {
//       console.log(`Obligation account ${obligationAddress} already exists`);
//     }
  
//     console.log('depositReserveLiquidityAndObligationCollateralInstruction');
//     const depositReserveLiquidityAndObligationCollateralIx =
//       depositReserveLiquidityAndObligationCollateralInstruction(
//         new BN(amountBase),
//         userTokenAccountAddress,
//         userCollateralAccountAddress,
//         new PublicKey(reserve.address),
//         new PublicKey(reserve.liquidityAddress),
//         new PublicKey(reserve.collateralMintAddress),
//         new PublicKey(lendingMarket.address),
//         new PublicKey(lendingMarket.authorityAddress),
//         new PublicKey(reserve.collateralSupplyAddress), // destinationCollateral
//         obligationAddress, // obligation
//         publicKey, // obligationOwner
//         new PublicKey(oracleInfo.priceAddress),
//         new PublicKey(oracleInfo.switchboardFeedAddress),
//         publicKey, // transferAuthority
//       );
//     ixs.push(depositReserveLiquidityAndObligationCollateralIx);
  
//     const tx = new Transaction().add(...ixs, ...cleanupIxs);
//     const { blockhash } = await connection.getRecentBlockhash();
//     tx.recentBlockhash = blockhash;
//     tx.feePayer = publicKey;
//     let signature: TransactionSignature = '';
  
//     signature = await sendTransaction(tx, connection);
//     console.log(`submitted tx ${signature}`);
//     await connection.confirmTransaction(signature);
//     console.log(`confirmed tx ${signature}`);
//     return signature;
// }
  