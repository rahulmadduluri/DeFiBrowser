import ConnectButton from "./components/ConnectButton";

export default function App() {

  function handleDeposit() {
    // swap stablecoin for curve and then place yearn transaction
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
