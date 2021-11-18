import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    getLedgerWallet,
    getPhantomWallet,
    getSlopeWallet,
    getSolflareWallet,
    getSolletExtensionWallet,
    getSolletWallet,
    getTorusWallet,
} from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletBalanceProvider } from "./components/WalletBalanceProvider";
import { YieldOptionsListView } from "./components/YieldOptionsListView";

function App() {

  return (
    <div className="app-body">
      <div className="app-body-top">
        <h3>Make Up to 20% APY</h3>
        <Wallet/>
        <br/>
        <Balances />
        <br/>
      </div>
      <div className="app-body-mid">
        <YieldOptionsListView />
      </div>
    </div>
  );
}

export default App;
