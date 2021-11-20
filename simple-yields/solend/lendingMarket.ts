const { AccountInfo, PublicKey } = require("@solana/web3.js");
const BufferLayout = require("buffer-layout");
const Layout = require("./layout");
const { LastUpdateLayout } = require("./lastUpdate");

export const LENDING_MARKET_LEN = 290;

export const LendingMarketLayout = BufferLayout.struct([
  BufferLayout.u8("version"),
  BufferLayout.u8("bumpSeed"),
  Layout.publicKey("owner"),
  Layout.publicKey("quoteTokenMint"),
  Layout.publicKey("tokenProgramId"),
  Layout.publicKey("oracleProgramId"),
  Layout.publicKey("switchboardOracleProgramId"),

  BufferLayout.blob(128, "padding"),
]);

export const LendingMarketParser = (pubkey: any, info: { data: WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>; }) => {
  const buffer = Buffer.from(info.data);
  const lendingMarket = LendingMarketLayout.decode(buffer);

  const details = {
    pubkey,
    account: {
      ...info,
    },
    info: lendingMarket,
  };

  return details;
};

export function lendingMarketToString(lendingMarket: any) {
  return JSON.stringify(
    lendingMarket,
    (key, value) => {
      if (key === "padding") {
        return null;
      }
      switch (value.constructor.name) {
        case "PublicKey":
          return value.toBase58();
        case "BN":
          return value.toString();
        default:
          return value;
      }
    },
    2
  );
}
