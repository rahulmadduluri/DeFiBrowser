import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import React, { FC, useCallback } from 'react';

export const Balances: FC = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    return (
        <div>
            { publicKey ? connection.getBalance(publicKey) : "Connect Wallet to See Balance" }
        </div>
    );
};
