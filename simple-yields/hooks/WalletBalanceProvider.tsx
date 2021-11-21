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
        console.log("2");
        const usdcPublicKey = new PublicKey("zVzi5VAf4qMEwzv7NXECVx5v2pQ7xnqVVjCXZwS9XzA"); // note: not on devnet
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
