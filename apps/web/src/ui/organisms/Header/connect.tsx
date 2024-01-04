import { useSettingsProvider } from "@orderbook/core/providers/public/settings";

import { Profile } from "./profile";

import { ConnectWalletInteraction } from "@/ui/templates/ConnectWalletInteraction";

const ConnectWallet = ({
  showFundingWallet = false,
}: {
  showFundingWallet?: boolean;
}) => {
  const { connectExtension, onToogleConnectExtension } = useSettingsProvider();
  return (
    <>
      <ConnectWalletInteraction />
      <Profile
        onClick={() => onToogleConnectExtension(!connectExtension)}
        showFundingWallet={showFundingWallet}
      />
    </>
  );
};

export default ConnectWallet;
