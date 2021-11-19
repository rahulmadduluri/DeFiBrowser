import '../styles/globals.css'
import { ReactNode } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
require('@solana/wallet-adapter-react-ui/styles.css');
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletBalanceProvider } from '../hooks/WalletBalanceProvider';
import dynamic from 'next/dynamic';

const WalletConnectionProvider = dynamic<{ children: ReactNode }>(
  () =>
      import('../hooks/WalletConnectionProvider').then(
          ({ WalletConnectionProvider }) => WalletConnectionProvider
      ),
  {
      ssr: false,
  }
);

const App = ({ Component, pageProps }: any) => {

  return (
    <WalletConnectionProvider>
        <WalletModalProvider>
          <WalletBalanceProvider>
            <Component  {...pageProps} />
          </WalletBalanceProvider>
        </WalletModalProvider>
    </WalletConnectionProvider>
  );
};

export default App;
