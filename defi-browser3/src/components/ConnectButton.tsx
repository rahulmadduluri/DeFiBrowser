// ConnectButton.tsx
import { useEthers, useEtherBalance } from "@usedapp/core";

export default function ConnectButton() {
  const {activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  function handleConnectWallet() {
    activateBrowserWallet();
  }

  return account ? (
    <div>
      <p>
        {etherBalance && etherBalance} ETH
      </p>
    </div>
  ) : (
    <button onClick={handleConnectWallet}>Connect to a wallet</button>
  );
}
