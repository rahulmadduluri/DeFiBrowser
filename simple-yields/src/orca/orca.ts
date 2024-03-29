import { Connection, PublicKey } from "@solana/web3.js";
import { getOrca, Network, OrcaFarmConfig, OrcaPoolConfig } from "@orca-so/sdk";
import Decimal from "decimal.js";
import { WalletContextState } from "@solana/wallet-adapter-react";

export const fetchSolToUSDCConversionRate = async (connection: Connection, solAmountNum: number): Promise<number> => {
    
    const orca = getOrca(connection, process.env.NODE_ENV === "development" ? Network.DEVNET : Network.MAINNET);

    try {
        const solUSDCPool = orca.getPool(OrcaPoolConfig.SOL_USDC);
        const solToken = solUSDCPool.getTokenA();
        const solAmount = new Decimal(solAmountNum);
        const quote = await solUSDCPool.getQuote(solToken, solAmount);
        const usdcAmount = quote.getMinOutputAmount();
        console.log(`Swap ${solAmount.toString()} SOL for at least ${usdcAmount.toNumber()} USDC`);
        return usdcAmount.toNumber();
    } catch (err) {
        console.log(err);
        return 0;
    }
}

export const swapSolToUSDC = async (connection: Connection, wallet: WalletContextState, solAmountNum: number, cb?: (success: boolean) => void) => {    

    if (!wallet.publicKey) {
        return;
    }

    // use devnet for now
    const orca = getOrca(connection, process.env.NODE_ENV === "development" ? Network.DEVNET : Network.MAINNET);

    try {
        /*** Swap ***/
        // 3. We will be swapping SOL for some USDC
        const solUSDCPool = orca.getPool(OrcaPoolConfig.SOL_USDC);
        const solToken = solUSDCPool.getTokenA();
        const solAmount = new Decimal(solAmountNum);
        const quote = await solUSDCPool.getQuote(solToken, solAmount);
        const usdcAmount = quote.getMinOutputAmount();
    
        console.log(`Swap ${solAmount.toString()} SOL for at least ${usdcAmount.toNumber()} USDC`);

        const swapPayload = await solUSDCPool.swap(wallet.publicKey, solToken, solAmount, usdcAmount);
        swapPayload.transaction.partialSign(...swapPayload.signers);
        const signedTransaction = wallet.signTransaction && await wallet.signTransaction(swapPayload.transaction);
        if (signedTransaction) {
            const rawTransaction = signedTransaction.serialize();
            let options = {
                       skipPreflight: true,
                       commitment: "confirmed",
                   };
           const txid = await connection.sendRawTransaction(rawTransaction, options);

           console.log("Swapped:", txid, "\n");
           if (cb) cb(true);
        }
    } catch (err) {
        console.warn(err);
        if(cb) cb(false);
    }
};
