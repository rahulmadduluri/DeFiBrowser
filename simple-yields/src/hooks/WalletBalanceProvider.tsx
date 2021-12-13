import { useWallet, useConnection, } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { createContext, useContext, useEffect, useState, useCallback} from "react";
import * as anchor from "@project-serum/anchor";

type Balances = {
  solBalance: number, 
  usdcBalance: number,
};

interface WalletBalances {
  balances: Balances;
  setBalances?: (solBalance: number, usdcBalance: number) => void;
  loading: boolean;
  refreshBalances?: () => Promise<Balances>;
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

  const getBalances = useCallback(async () => {
    if (wallet?.publicKey) {
      const balance = await connection.getBalance(wallet.publicKey);
      var solBalance = balance / LAMPORTS_PER_SOL;
      // NOTE: this is public key of devnet SOLEND usdc 
      const usdcAddress = process.env.NODE_ENV === "development" ? "zVzi5VAf4qMEwzv7NXECVx5v2pQ7xnqVVjCXZwS9XzA" : "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
      const usdcPublicKey = new PublicKey(usdcAddress);
      const usdcAccount = await connection.getTokenAccountsByOwner(wallet.publicKey, { mint: usdcPublicKey } );
      var usdcBalance;
      if (usdcAccount.value[0]){
        const usdcBalanceWrapped = await connection.getTokenAccountBalance(usdcAccount.value[0].pubkey);
        usdcBalance = usdcBalanceWrapped.value.uiAmount ? usdcBalanceWrapped.value.uiAmount : 0;
      } else {
        usdcBalance = 0;
      }
      
      setBalances({solBalance, usdcBalance});
      setLoading(false);
      return {solBalance, usdcBalance};
    }
  }, [wallet, connection, setLoading, setBalances]);

  useEffect(() => {
    setLoading(true);
    getBalances();
  }, [wallet, connection]);

  return <BalanceContext.Provider
    value={{balances, setBalances, loading, refreshBalances: () => getBalances()} as WalletBalances}>
    {children}
  </BalanceContext.Provider>

}
