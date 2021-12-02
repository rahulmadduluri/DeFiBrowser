import { Reserve } from './reserve';
import BigNumber from 'bignumber.js';

export const calculateSupplyAPY = (reserve: Reserve) => {
    const currentUtilization = calculateUtilizationRatio(reserve);
  
    const borrowAPY = calculateBorrowAPY(reserve);
    return currentUtilization * borrowAPY;
};
  
export const calculateUtilizationRatio = (reserve: Reserve) => {
    const borrowedAmount = new BigNumber(
      reserve.liquidity.borrowedAmountWads.toString(),
      18,
    );

    // NOTE: Modification

    // const totalSupply = add(
    //   borrowedAmount,
    //   new BigNumber(reserve.liquidity.availableAmount.toString(), 0),
    // );
    // const currentUtilization = divide(borrowedAmount, totalSupply);
    const totalSupply = borrowedAmount.plus(new BigNumber(reserve.liquidity.availableAmount.toString(), 0));
    const currentUtilization = borrowedAmount.div(totalSupply);
  
    // TODO: Demo'ing the arithmetic utils but we should keep it as as string in the future
    // return parseFloat(currentUtilization.toHuman());
    return parseFloat(currentUtilization.toString());
};
  
export const calculateBorrowAPY = (reserve: Reserve) => {
    const currentUtilization = calculateUtilizationRatio(reserve);
    const optimalUtilization = reserve.config.optimalUtilizationRate / 100;
  
    let borrowAPY;
    if (optimalUtilization === 1.0 || currentUtilization < optimalUtilization) {
      const normalizedFactor = currentUtilization / optimalUtilization;
      const optimalBorrowRate = reserve.config.optimalBorrowRate / 100;
      const minBorrowRate = reserve.config.minBorrowRate / 100;
      borrowAPY =
        normalizedFactor * (optimalBorrowRate - minBorrowRate) + minBorrowRate;
    } else {
      const normalizedFactor =
        (currentUtilization - optimalUtilization) / (1 - optimalUtilization);
      const optimalBorrowRate = reserve.config.optimalBorrowRate / 100;
      const maxBorrowRate = reserve.config.maxBorrowRate / 100;
      borrowAPY =
        normalizedFactor * (maxBorrowRate - optimalBorrowRate) +
        optimalBorrowRate;
    }
  
    return borrowAPY;
};
  