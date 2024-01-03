import { useSettingsProvider } from "@orderbook/core/providers/public/settings";

import { Profile } from "./profile";

import { ConnectWalletInteraction } from "@/ui/templates/ConnectWalletInteraction";

const ConnectWallet = ({
  showFundingWallet = false,
}: {
  showFundingWallet?: boolean;
}) => {
  const { connectWallet, onToogleConnectWallet } = useSettingsProvider();
  return (
    <>
      <ConnectWalletInteraction />
      <Profile
        onClick={() => onToogleConnectWallet(!connectWallet)}
        showFundingWallet={showFundingWallet}
      />
    </>
  );
};

export default ConnectWallet;
