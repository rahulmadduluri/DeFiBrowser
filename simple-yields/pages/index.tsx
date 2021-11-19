import Head from 'next/head'

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

import useWalletBalance from '../hooks/WalletBalanceProvider';
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
// import { YieldOptionsListView } from "../components/YieldOptionsListView";

const Home = () => {
  const [balance] = useWalletBalance();
  const wallet = useWallet();

  return (
    <main className="p-5">
      <Head>
        <title>Simple Yields</title>
        <meta name="description" content="SimpleYields helps you get yields as easily as possible." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h3>Make Up to 20% APY</h3>

      {wallet.connected &&
        <>
          <p>Balance: {(balance || 0).toLocaleString()} SOL</p>
        </>
      }

      <div className="flex float-right space-x-5">
        <WalletMultiButton />
      </div>

      <div className="app-body-mid">
        {/* <YieldOptionsListView /> */}
      </div>

    </main>
  );
};

export default Home;
