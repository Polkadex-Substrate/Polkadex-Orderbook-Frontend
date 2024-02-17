import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { Button, GenericMessage } from "@polkadex/ux";

export const ConnectAccountWrapper = ({
  funding = false,
}: {
  funding?: boolean;
}) => {
  const { onToogleConnectTrading, onToogleConnectExtension } =
    useSettingsProvider();
  return (
    <>
      {funding ? (
        <GenericMessage
          title="Connect your Funding account to proceed."
          illustration="ConnectAccount"
        >
          <Button.Solid onClick={() => onToogleConnectExtension()}>
            Connect Funding Account
          </Button.Solid>
        </GenericMessage>
      ) : (
        <GenericMessage
          title="Connect your Trading account to proceed."
          illustration="ConnectAccount"
        >
          <Button.Solid onClick={() => onToogleConnectTrading()}>
            Connect Trading Account
          </Button.Solid>
        </GenericMessage>
      )}
    </>
  );
};
