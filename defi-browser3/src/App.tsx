import ConnectButton from "./components/ConnectButton";
import { legos } from "@studydefi/money-legos";
import uniswap from "@studydefi/money-legos/uniswap";

export default function App() {

  function handleDeposit() {
    // swap stablecoin for curve and then place yearn transaction
    // useContractCall({
    //   abi: tokenFarmInterface,
    //   address: tokenFarmAddress,
    //   method: "newbalance",
    //   args: [],
    // }) ?? []
  }

  return (
    <div>
      <div>
        <ConnectButton />
        <button onClick={handleDeposit}>Deposit</button>
      </div>
    </div>
  )
}
