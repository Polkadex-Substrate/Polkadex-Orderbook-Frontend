import {
  Accordion,
  Interaction,
  Typography,
  WalletCard,
  Illustrations,
} from "@polkadex/ux";

export const FundAccountNotFound = () => {
  return (
    <Interaction className="gap-10">
      <Interaction.Content className="flex flex-col gap-6 flex-1">
        <div className="py-6 flex flex-col gap-5 items-center text-center border-b border-primary pb-8">
          <div className="max-w-[8rem]">
            <Illustrations.Error className="max-w-[6rem] w-full" />
          </div>
          <div className="flex flex-col gap-2">
            <Typography.Text bold size="xl">
              Funding wallet not found here
            </Typography.Text>
            <Typography.Text variant="primary">
              Are you sure your wallet was here? Check SubWallet to ensure your
              wallet is visible and try once more.
            </Typography.Text>
          </div>
        </div>
        <Accordion type="multiple">
          <Accordion.Item value="accordion1">
            <Accordion.Trigger>
              <Typography.Text variant="secondary">
                Wallets in this extension
              </Typography.Text>
            </Accordion.Trigger>
            <Accordion.Content>
              <div className="flex flex-col gap-3">
                <WalletCard
                  name="Alice"
                  address="5Cz5p3auaFUFN8FdToic5iVKnrXcnqrMbDs1ZUafzQFYyRw"
                />
                <WalletCard
                  name="Bob"
                  address="5GC6vwNE8FdToic5iVKnrZrycMLnGJBJVSdXcnqrMbDs1LJC"
                />
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </Interaction.Content>
      <Interaction.Footer>
        <Interaction.Action appearance="secondary">Refresh</Interaction.Action>
        <Interaction.Close>Connect other wallet</Interaction.Close>
      </Interaction.Footer>
    </Interaction>
  );
};
