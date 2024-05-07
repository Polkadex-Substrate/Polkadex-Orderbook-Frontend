import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { Button } from "@polkadex/ux";
import { useMemo } from "react";

const ConnectAccount = () => {
  const {
    selectedAddresses: { mainAddress, tradeAddress },
  } = useProfile();
  const { onToogleConnectTrading, onToogleConnectExtension } =
    useSettingsProvider();

  const isFundingButton = useMemo(() => {
    if (!mainAddress) return true;
    if (!tradeAddress) return false;
    return true;
  }, [mainAddress, tradeAddress]);

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
