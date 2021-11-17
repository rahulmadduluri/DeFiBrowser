import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import React, { FC, useCallback, useState, useEffect } from 'react';
import BN from "bn.js";
import { publicKey } from '../helpers/layout';

export const Balances: FC = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    const [currentBalance, setCurrentBalance] = useState<number>();

    const DECIMAL_OFFSET = 1000000000;

    useEffect(() => {
        if (!publicKey) {
            console.log("LSKJDKF");
            return;
        }
        console.log("2");
        connection.getBalance(publicKey).then((balance) => {
            setCurrentBalance(balance / DECIMAL_OFFSET);
        })
        .catch((err) => {
            setCurrentBalance(0);
        });
    }, [connection, publicKey]);

    return (
        <div>
            Balance: { currentBalance }
        </div>
    );
};
