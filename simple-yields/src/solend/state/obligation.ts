import { AccountInfo, PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import * as BufferLayout from 'buffer-layout';
import * as Layout from '../utils/layout';
import { LastUpdate, LastUpdateLayout } from './lastUpdate';

export interface Obligation {
  version: number;
  lastUpdate: LastUpdate;
  lendingMarket: PublicKey;
  owner: PublicKey;
  // @FIXME: check usages
  deposits: ObligationCollateral[];
  // @FIXME: check usages
  borrows: ObligationLiquidity[];
  depositedValue: BN; // decimals
  borrowedValue: BN; // decimals
  allowedBorrowValue: BN; // decimals
  unhealthyBorrowValue: BN; // decimals
}

// BN defines toJSON property, which messes up serialization
// @ts-ignore
BN.prototype.toJSON = undefined;

export function obligationToString(obligation: Obligation) {
  return JSON.stringify(
    obligation,
    (key, value) => {
      // Skip padding
      if (key === 'padding') {
        return null;
      }
      switch (value.constructor.name) {
        case 'PublicKey':
          return value.toBase58();
        case 'BN':
          return value.toString();
        default:
          return value;
      }
    },
    2,
  );
}

export interface ObligationCollateral {
  depositReserve: PublicKey;
  depositedAmount: BN;
  marketValue: BN; // decimals
}

export interface ObligationLiquidity {
  borrowReserve: PublicKey;
  cumulativeBorrowRateWads: BN; // decimals
  borrowedAmountWads: BN; // decimals
  marketValue: BN; // decimals
}

export const ObligationLayout = BufferLayout.struct<ProtoObligation> (
[
    BufferLayout.u8('version'),

    LastUpdateLayout,

    Layout.publicKey('lendingMarket'),
    Layout.publicKey('owner'),
    Layout.u128('depositedValue'),
    Layout.u128('borrowedValue'),
    Layout.u128('allowedBorrowValue'),
    Layout.u128('unhealthyBorrowValue'),
    BufferLayout.blob(64, '_padding'),

    BufferLayout.u8('depositsLen'),
    BufferLayout.u8('borrowsLen'),
    BufferLayout.blob(1096, 'dataFlat'),
  ]);

export const ObligationCollateralLayout = BufferLayout.struct<ObligationCollateral>([
    Layout.publicKey('depositReserve'),
    Layout.u64('depositedAmount'),
    Layout.u128('marketValue'),
    BufferLayout.blob(32, 'padding'),
  ]);

export const ObligationLiquidityLayout = BufferLayout.struct<ObligationLiquidity>([
    Layout.publicKey('borrowReserve'),
    Layout.u128('cumulativeBorrowRateWads'),
    Layout.u128('borrowedAmountWads'),
    Layout.u128('marketValue'),
    BufferLayout.blob(32, 'padding'),
  ]);

export const OBLIGATION_SIZE = ObligationLayout.span;

export const isObligation = (info: AccountInfo<Buffer>) =>
  info.data.length === ObligationLayout.span;

export interface ProtoObligation {
  version: number;
  lastUpdate: LastUpdate;
  lendingMarket: PublicKey;
  owner: PublicKey;
  depositedValue: BN; // decimals
  borrowedValue: BN; // decimals
  allowedBorrowValue: BN; // decimals
  unhealthyBorrowValue: BN; // decimals
  depositsLen: number;
  borrowsLen: number;
  dataFlat: Buffer;
}

export const parseObligation = (
  pubkey: PublicKey,
  info: AccountInfo<Buffer>,
) => {
  const { data } = info;
  const buffer = Buffer.from(data);
  const {
    version,
    lastUpdate,
    lendingMarket,
    owner,
    depositedValue,
    borrowedValue,
    allowedBorrowValue,
    unhealthyBorrowValue,
    depositsLen,
    borrowsLen,
    dataFlat,
  } = ObligationLayout.decode(buffer) as ProtoObligation;

  // NOTE: modified
  // if (lastUpdate.slot.isZero()) {
  //   return null;
  // }
  const slot = new BN(lastUpdate.slot);
  if (slot.isZero()) {
    return null;
  }

  const depositsBuffer = dataFlat.slice(
    0,
    depositsLen * ObligationCollateralLayout.span,
  );
  const deposits = BufferLayout.seq(
    ObligationCollateralLayout,
    depositsLen,
  ).decode(depositsBuffer) as ObligationCollateral[];

  const borrowsBuffer = dataFlat.slice(
    depositsBuffer.length,
    depositsLen * ObligationCollateralLayout.span +
      borrowsLen * ObligationLiquidityLayout.span,
  );
  const borrows = BufferLayout.seq(
    ObligationLiquidityLayout,
    borrowsLen,
  ).decode(borrowsBuffer) as ObligationLiquidity[];

  const obligation = {
    version,
    lastUpdate,
    lendingMarket,
    owner,
    depositedValue,
    borrowedValue,
    allowedBorrowValue,
    unhealthyBorrowValue,
    deposits,
    borrows,
  } as Obligation;

  const details = {
    pubkey,
    account: {
      ...info,
    },
    info: obligation,
  };

  return details;
};
