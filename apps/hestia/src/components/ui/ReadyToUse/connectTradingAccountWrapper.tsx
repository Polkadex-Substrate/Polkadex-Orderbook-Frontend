import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { Button, GenericMessage } from "@polkadex/ux";

export const ConnectTradingAccountWrapper = () => {
  const { onToogleConnectTrading } = useSettingsProvider();
  return (
    <>
      <GenericMessage
        title="Connect your trading account to start trading."
        illustration="ConnectAccount"
      >
        <Button.Solid onClick={() => onToogleConnectTrading()}>
          Connect Trading Account
        </Button.Solid>
      </GenericMessage>
    </>
  );
};
