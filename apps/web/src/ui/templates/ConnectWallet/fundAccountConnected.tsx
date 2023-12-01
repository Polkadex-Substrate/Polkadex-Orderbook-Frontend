import {
  Interaction,
  Typography,
  WalletCard,
  Illustrations,
} from "@polkadex/ux";

export const FundAccountConnected = () => {
  return (
    <Interaction className="gap-10">
      <Interaction.Content className="flex flex-col gap-6 flex-1">
        <div className="py-6 flex flex-col gap-5 items-center text-center border-b border-primary pb-8">
          <div className="max-w-[8rem]">
            <Illustrations.Successfull className="max-w-[6rem] w-full" />
          </div>
          <div className="flex flex-col gap-2">
            <Typography.Text bold size="xl">
              Connected
            </Typography.Text>
            <Typography.Text variant="primary">
              Excellent! You can now perform actions that require signing, such
              as transferring funds and managing your trading account.
            </Typography.Text>
          </div>
        </div>
        <WalletCard.Inverted
          name="Alice"
          address="5Cz5p3auaFUFN8FdToic5iVKnrXcnqrMbDs1ZUafzQFYyRw"
        />
      </Interaction.Content>
      <Interaction.Footer>
        <Interaction.Close>Close</Interaction.Close>
      </Interaction.Footer>
    </Interaction>
  );
};
