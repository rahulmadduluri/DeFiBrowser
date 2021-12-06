import { AccountInfo, PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import { blob, struct, u8 } from 'buffer-layout';
import { decimal, Parser, publicKey, u128, u64 } from './layout';
import { LastUpdate, LastUpdateLayout } from './lastUpdate';

export interface Reserve {
    version: number;
    lastUpdate: LastUpdate;
    lendingMarket: PublicKey;
    liquidity: ReserveLiquidity;
    collateral: ReserveCollateral;
    config: ReserveConfig;
}

// default version
// export interface ReserveLiquidity {
//     mintPubkey: PublicKey;
//     mintDecimals: number;
//     supplyPubkey: PublicKey;
//     feeReceiver: PublicKey;
//     oraclePubkey: PublicKey;
//     availableAmount: bigint;
//     borrowedAmountWads: BigNumber;
//     cumulativeBorrowRateWads: BigNumber;
//     marketPrice: BigNumber;
// }

// solend version

export interface ReserveLiquidity {
  mintPubkey: PublicKey;
  mintDecimals: number;
  supplyPubkey: PublicKey;
  // @FIXME: oracle option
  oracleOption: number;
  pythOraclePubkey: PublicKey;
  switchboardOraclePubkey: PublicKey;
  availableAmount: BN;
  borrowedAmountWads: BN;
  cumulativeBorrowRateWads: BN;
  marketPrice: BN;
}


export interface ReserveCollateral {
    mintPubkey: PublicKey;
    mintTotalSupply: bigint;
    supplyPubkey: PublicKey;
}

export interface ReserveConfig {
    optimalUtilizationRate: number;
    loanToValueRatio: number;
    liquidationBonus: number;
    liquidationThreshold: number;
    minBorrowRate: number;
    optimalBorrowRate: number;
    maxBorrowRate: number;
    // default
    // fees: ReserveFees;
    // solend mod
    fees: {
        borrowFeeWad: BN;
        hostFeePercentage: number;
    };
    depositLimit: BN;
}

export const ReserveLayout = struct<Reserve> (
    [
      u8('version'),
  
      LastUpdateLayout,
  
      publicKey('lendingMarket'),
  
      struct(
        [
          publicKey('mintPubkey'),
          u8('mintDecimals'),
          publicKey('supplyPubkey'),
          // @FIXME: oracle option
          // TODO: replace u32 option with generic equivalent
          // BufferLayout.u32('oracleOption'),
          publicKey('pythOracle'),
          publicKey('switchboardOracle'),
          u64('availableAmount'),
          u128('borrowedAmountWads'),
          u128('cumulativeBorrowRateWads'),
          u128('marketPrice'),
        ],
        'liquidity',
      ),
  
      struct(
        [
          publicKey('mintPubkey'),
          u64('mintTotalSupply'),
          publicKey('supplyPubkey'),
        ],
        'collateral',
      ),
  
      struct(
        [
          u8('optimalUtilizationRate'),
          u8('loanToValueRatio'),
          u8('liquidationBonus'),
          u8('liquidationThreshold'),
          u8('minBorrowRate'),
          u8('optimalBorrowRate'),
          u8('maxBorrowRate'),
          struct(
            [
              u64('borrowFeeWad'),
              u64('flashLoanFeeWad'),
              u8('hostFeePercentage'),
            ],
            'fees',
          ),
          u64('depositLimit'),
          u64('borrowLimit'),
          publicKey('feeReceiver'),
        ],
        'config',
      ),
  
      blob(256, 'padding'),
    ],
);

export const RESERVE_SIZE = ReserveLayout.span;

export const isReserve = (info: AccountInfo<Buffer>): boolean => {
    return info.data.length === RESERVE_SIZE;
};

export const ReserveParser = (pubkey: PublicKey, info: AccountInfo<Buffer>) => {
    const { data } = info;
    const buffer = Buffer.from(data);
    const reserve = ReserveLayout.decode(buffer) as Reserve;
  
    if (reserve.lastUpdate.slot.isZero()) {
      return null;
    }

    const details = {
      pubkey,
      account: {
        ...info,
      },
      info: reserve,
    };
  
    return details;
};
