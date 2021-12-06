import { Connection, PublicKey } from "@solana/web3.js";
import { getOrca, OrcaFarmConfig, OrcaPoolConfig } from "@orca-so/sdk";
import Decimal from "decimal.js";


export const swapSolToUSDC = async (connection: Connection, walletPublicKey: PublicKey, solAmountNum: number) => {
    /*** Setup ***/
    // 1. Read secret key file to get owner keypair
    // const secretKeyString = await readFile("/Users/scuba/my-wallet/my-keypair.json", {
    //     encoding: "utf8",
    // }); 
    // const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
    // const owner = Keypair.fromSecretKey(secretKey);

    const orca = getOrca(connection);

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
