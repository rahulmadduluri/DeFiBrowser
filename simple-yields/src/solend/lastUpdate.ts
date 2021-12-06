import { struct } from 'buffer-layout';
import { bool, u64 } from './layout';
import BN from 'bn.js';

export interface LastUpdate {
    slot: BN;
    stale: boolean;
}

/** @internal */
export const LastUpdateLayout = struct<LastUpdate>([u64('slot'), bool('stale')], 'lastUpdate');
