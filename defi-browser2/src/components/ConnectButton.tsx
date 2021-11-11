// ConnectButton.tsx
import { Button, Box, Text } from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";

export default function ConnectButton() {
  const {activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  return account ? (
    <Box>
      <Text color="white" fontSize="md">
        {etherBalance && etherBalance} ETH
      </Text>
    </Box>
  ) : (
    <Button>Connect to a wallet</Button>
  );
}
