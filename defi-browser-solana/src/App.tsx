import { Connection } from "@solana/web3.js";
import React, { useEffect, useState, FC, useCallback } from "react";
import { Balances } from "./components/Balances";
import { YieldOptionsListView } from "./components/YieldOptionsListView";
import { Wallet } from "./components/ConnectWallet";
// import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
// import { useConnection, useWallet } from '@solana/wallet-adapter-react';
// import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';


function App() {
  // const [transactions, setTransactions] =
  //   useState<Array<TransactionWithSignature>>();
    
  // const conn = React.useRef<Connection>();
  // const wall = React.useRef<WalletAdapter>();

  // useEffect(() => {
  //   initWallet().then(([connection, wallet]: [Connection, WalletAdapter]) => {
  //     conn.current = connection;
  //     wall.current = wallet;
  //     if (wallet.publicKey) {
  //       getTransactions(connection, wallet.publicKey).then((trans) => {
  //         setTransactions(trans);
  //       });
  //     }
  //   });
  // }, []);

  // const didSendMoney = () => {
  //   getTransactions(conn.current!, wall.current!.publicKey!).then((trans) => {
  //     setTransactions(trans);
  //   });
  // };

  return (
    <div className="app-body">
      <div className="app-body-top">
        <h3>Make Up to 20% APY</h3>
        <Wallet/>
        <Balances />
      </div>
      <div className="app-body-mid">
        <YieldOptionsListView />
      </div>
    </div>
  );
}

export default App;
