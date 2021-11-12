import { useState, useEffect } from "react";
import { useContractCall } from "@usedapp/core";
import { ethers } from 'ethers';
import erc20_abi from "../abi/erc20.json";

type Props = {
    account: string | null | undefined
    setResults: (arg0: any) => void;
}

export default function ContractCaller(props: Props){


  // swap stablecoin for curve and then place yearn transaction
  const results = useContractCall({
    abi: new ethers.utils.Interface(erc20_abi),
    address: "0xdA816459F1AB5631232FE5e97a05BBBb94970c95", // dai vault address,
    method: "approve",
    args: [props.account, 1],
  });

  useEffect(() => {
    if (results) props.setResults(results);
  }, [results]);

  return null;
}