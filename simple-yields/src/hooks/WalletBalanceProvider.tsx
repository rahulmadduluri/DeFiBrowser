import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { createContext, useContext, useEffect, useState } from "react";
import * as anchor from "@project-serum/anchor";

const BalanceContext = createContext(null);

export default function useWalletBalances(): {solBalance: number, usdcBalance: number} | any  {
  const [balances, setBalances]: {solBalance: number, usdcBalance: number} | any = useContext(BalanceContext);
  return [balances, setBalances]
}

export const WalletBalanceProvider: React.FC<{}> = ({ children }) => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [balances, setBalances] = useState<{solBalance: number, usdcBalance: number} | any>();

  useEffect(() => {
    (async () => {
      if (wallet?.publicKey) {
        const balance = await connection.getBalance(wallet.publicKey);
        // NOTE: this is public key of devnet SOLEND usdc 
        const usdcAddress = process.env.NODE_ENV === "development" ? "zVzi5VAf4qMEwzv7NXECVx5v2pQ7xnqVVjCXZwS9XzA" : "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
        const usdcPublicKey = new PublicKey(usdcAddress);
        const usdcAccount = await connection.getTokenAccountsByOwner(wallet.publicKey, { mint: usdcPublicKey } );
        const usdcBalanceWrapped = await connection.getTokenAccountBalance(usdcAccount.value[0].pubkey);
        var solBalance = balance / LAMPORTS_PER_SOL;
        var usdcBalance = usdcBalanceWrapped.value.uiAmount ? usdcBalanceWrapped.value.uiAmount : 0;
        setBalances({solBalance, usdcBalance});
      }
    })();
  }, [wallet, connection]);

  return <BalanceContext.Provider
    value={[balances, setBalances] as {solBalance: number, usdcBalance: number} | any}>
    {children}
  </BalanceContext.Provider>

}
