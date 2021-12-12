import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { createContext, useContext, useEffect, useState } from "react";
import * as anchor from "@project-serum/anchor";

interface WalletBalances {
  balances: {solBalance: number, usdcBalance: number} ;
  setBalances?: (solBalance: number, usdcBalance: number) => void;
  loading: boolean;
}

const BalanceContext = createContext<WalletBalances>({balances: {solBalance: -1, usdcBalance: -1}, loading: true});

export default function useWalletBalances(): WalletBalances  {
  const context: WalletBalances = useContext(BalanceContext);
  return context;
}

export const WalletBalanceProvider: React.FC<{}> = ({ children }) => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [balances, setBalances] = useState<{solBalance: number, usdcBalance: number} | any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    (async () => {
      if (wallet?.publicKey) {
        const balance = await connection.getBalance(wallet.publicKey);
        // NOTE: this is public key of devnet SOLEND usdc 
        const usdcPublicKey = new PublicKey("zVzi5VAf4qMEwzv7NXECVx5v2pQ7xnqVVjCXZwS9XzA");
        const usdcAccount = await connection.getTokenAccountsByOwner(wallet.publicKey, { mint: usdcPublicKey } );
        const usdcBalanceWrapped = await connection.getTokenAccountBalance(usdcAccount.value[0].pubkey);
        var solBalance = balance / LAMPORTS_PER_SOL;
        var usdcBalance = usdcBalanceWrapped.value.uiAmount ? usdcBalanceWrapped.value.uiAmount : 0;
        setBalances({solBalance, usdcBalance});
        setLoading(false);
      }
    })();
  }, [wallet, connection]);

  return <BalanceContext.Provider
    value={{balances, setBalances, loading} as WalletBalances}>
    {children}
  </BalanceContext.Provider>

}
