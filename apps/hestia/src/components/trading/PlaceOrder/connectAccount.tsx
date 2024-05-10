import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { Button } from "@polkadex/ux";
import { useMemo } from "react";

const ConnectAccount = () => {
  const {
    selectedAddresses: { mainAddress, tradeAddress },
  } = useProfile();
  const {
    onToogleConnectTrading,
    onToogleConnectExtension,
    onToogleFundWallet,
  } = useSettingsProvider();
  const { mainProxiesAccounts } = useConnectWalletProvider();

  const isFundingButton = useMemo(() => {
    if (!mainAddress) return true;
    if (!tradeAddress) return false;
    return true;
  }, [mainAddress, tradeAddress]);

  if (mainProxiesAccounts.length === 0) {
    return (
      <Button.Solid
        type="button"
        appearance="secondary"
        onClick={() => onToogleFundWallet(true)}
      >
        Fund Account
      </Button.Solid>
    );
  }

  return (
    <Button.Solid
      type="button"
      appearance="secondary"
      onClick={() =>
        isFundingButton
          ? onToogleConnectExtension(true)
          : onToogleConnectTrading(true)
      }
    >
      Connect {isFundingButton ? "Funding" : "Trading"} Account
    </Button.Solid>
  );
};

export default ConnectAccount;
