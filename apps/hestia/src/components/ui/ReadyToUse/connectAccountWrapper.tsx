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
          title="Please Connect your Funding account."
          illustration="ConnectAccount"
          className="bg-level-0"
        >
          <Button.Solid onClick={() => onToogleConnectExtension()}>
            Connect Funding Account
          </Button.Solid>
        </GenericMessage>
      ) : (
        <GenericMessage
          title="Please Connect your Trading account."
          illustration="ConnectAccount"
          className="bg-level-0"
        >
          <Button.Solid onClick={() => onToogleConnectTrading()}>
            Connect Trading Account
          </Button.Solid>
        </GenericMessage>
      )}
    </>
  );
};
