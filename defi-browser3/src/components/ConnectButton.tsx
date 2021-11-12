// ConnectButton.tsx
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";

export default function ConnectButton() {
  const {activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);
  console.log(etherBalance);

  function handleConnectWallet() {
    activateBrowserWallet();
  }

  return account ? (
    <div>
      <p>
      {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH
      </p>
    </div>
  ) : (
    <button onClick={handleConnectWallet}>Connect to a wallet</button>
  );
}
