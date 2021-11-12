// ConnectButton.tsx
import { useEthers, useEtherBalance, useTokenBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import { legos } from "@studydefi/money-legos";
import uniswap from "@studydefi/money-legos/uniswap";
import curve from "@studydefi/money-legos/curvefi";

export default function ConnectButton() {
  const {activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);
  console.log(etherBalance);

  function handleConnectWallet() {
    activateBrowserWallet();
  }

  const daiBalance = useTokenBalance(legos.erc20.dai.address, account);

  const daiBalance = useTokenBalance(legos.erc20.dai.address, account)

  return account ? (
    <div>
      <p>
      {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH
      </p>
      <p>
      {daiBalance && parseFloat(formatEther(daiBalance)).toFixed(3)} DAI
      </p>
    </div>
  ) : (
    <button onClick={handleConnectWallet}>Connect to a wallet</button>
  );
}
