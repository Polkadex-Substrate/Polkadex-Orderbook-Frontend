import { Interaction, ProviderCard, Typography } from "@polkadex/ux";
import { ExtensionsArray } from "@polkadot-cloud/assets/extensions";
import { ExtensionStatus } from "@polkadex/react-providers";
import { ExtensionDetails } from "@polkadex/types";

const ExtensionsArrayWhitelist = ExtensionsArray?.filter(
  (item) => item.id !== "metamask-polkadot-snap"
);
export const ConnectExtensionAccount = ({
  onClose,
  installedExtensions,
  onConnectProvider,
  onConnectCallback,
}: {
  onClose: () => void;
  installedExtensions: Record<string, ExtensionStatus>;
  onConnectProvider: (value: ExtensionDetails) => void;
  onConnectCallback: () => void;
}) => {
  return (
    <Interaction>
      <Interaction.Title onClose={onClose}>Connect wallet</Interaction.Title>
      <Interaction.Content withPadding={false}>
        <div className="flex flex-col gap-1">
          <Typography.Text variant="secondary" size="xs" className="px-7">
            Wallets available on the Polkadot chain
          </Typography.Text>
          <div className="flex flex-col px-3 max-h-[16rem] overflow-auto">
            {ExtensionsArrayWhitelist?.sort(
              (a, b) =>
                Number(!!installedExtensions[b.id]) -
                Number(!!installedExtensions[a.id])
            )?.map((value) => (
              <ProviderCard
                key={value.id}
                title={value.title}
                icon={value.id}
                action={() => {
                  onConnectProvider(value);
                  onConnectCallback();
                }}
                href={(value.website as string) ?? value.website[0]}
                installed={!!installedExtensions?.[value.id]}
              />
            ))}
          </div>
        </div>
      </Interaction.Content>
      <Interaction.Footer>
        <Interaction.Close onClick={onClose}>Back</Interaction.Close>
      </Interaction.Footer>
    </Interaction>
  );
};
