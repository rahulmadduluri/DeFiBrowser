/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')([
  '@blocto/sdk',
  '@project-serum/sol-wallet-adapter',
  '@solana/wallet-adapter-base',
  '@solana/wallet-adapter-react',
  '@solana/wallet-adapter-wallets',
  '@solana/wallet-adapter-react-ui',
  '@solana/wallet-adapter-bitkeep',
  '@solana/wallet-adapter-bitpie',
  '@solana/wallet-adapter-blocto',
  '@solana/wallet-adapter-clover',
  '@solana/wallet-adapter-coin98',
  '@solana/wallet-adapter-ledger',
  '@solana/wallet-adapter-mathwallet',
  '@solana/wallet-adapter-phantom',
  '@solana/wallet-adapter-safepal',
  '@solana/wallet-adapter-slope',
  '@solana/wallet-adapter-solflare',
  '@solana/wallet-adapter-sollet',
  '@solana/wallet-adapter-solong',
  '@solana/wallet-adapter-torus',
]);

module.exports = withTM({
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, os: false, path: false, crypto: false, http: false, https: false, querystring: false };
    return config;
  }
});
