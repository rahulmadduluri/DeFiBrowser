import Head from 'next/head'

import { useState, useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useTable } from "react-table";
import useWalletBalances from '../hooks/WalletBalanceProvider';
import { WalletDisconnectButton, WalletMultiButton, WalletConnectButton } from '@solana/wallet-adapter-react-ui';
import useDeFiOptions, { DeFiOption } from '../hooks/DeFiOptionsProvider';

const Home = () => {
  // balance of SOL
  const [balances] = useWalletBalances();

  // array of DeFi options
  const [defiOptions] = useDeFiOptions();

  // connected wallet
  const wallet = useWallet();

  // Table Info 
  const defiTableColumns = useMemo(() => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Current APY',
        accessor: 'currentAPY',
      },
      {
        Header: 'Existing Deposit',
        accessor: 'existingDeposit',
      },
      {
        Header: '', // Deposit Action Button,
        accessor: 'deposit',
        Cell: (props: any) => <button onClick={() => { 
          props.cell.row.original.deposit(0.1);
        } }>Deposit</button>,
      }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
   } = useTable({ columns: defiTableColumns, data: defiOptions });
      
  return (
    <main>
      <Head>
        <title>Simple Yields</title>
        <meta name="description" content="SimpleYields helps you get yields as easily as possible." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Beat Inflation</h1>
      <h3>Deposit your cryptocurrency. Make Up to 20% APY</h3>

      {wallet.connected &&
        <>
          <p>SOL Balance: {(balances?.solBalance || 0).toLocaleString()} SOL</p>
          <p>USDC Balance: {(balances?.usdcBalance || 0).toLocaleString()} USDC</p>
        </>
      }

      <div>
        <WalletMultiButton />
      </div>

      <br/>

      <div>

        <table {...getTableProps()}>
          <thead>
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row: any) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell: any) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        
      </div>

    </main>
  );
};

export default Home;
