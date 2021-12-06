import { Connection, PublicKey } from "@solana/web3.js";
import { getOrca, Network, OrcaFarmConfig, OrcaPoolConfig } from "@orca-so/sdk";
import Decimal from "decimal.js";


export const swapSolToUSDC = async (connection: Connection, walletPublicKey: PublicKey, solAmountNum: number) => {
    // use devnet for now
    const orca = getOrca(connection, Network.DEVNET);

    try {
        /*** Swap ***/
        // 3. We will be swapping SOL for some USDC
        const solUSDCPool = orca.getPool(OrcaPoolConfig.SOL_USDC);
        const solToken = solUSDCPool.getTokenA();
        const solAmount = new Decimal(solAmountNum);
        const quote = await solUSDCPool.getQuote(solToken, solAmount);
        const usdcAmount = quote.getMinOutputAmount();
    
        console.log(`Swap ${solAmount.toString()} SOL for at least ${usdcAmount.toNumber()} USDC`);
        // const swapPayload = await solUSDCPool.swap(owner, solToken, solAmount, usdcAmount);
        const swapPayload = await solUSDCPool.swap(walletPublicKey, solToken, solAmount, usdcAmount);
        const swapTxId = await swapPayload.execute();
        console.log("Swapped:", swapTxId, "\n");
    } catch (err) {
        console.warn(err);
    }
};
