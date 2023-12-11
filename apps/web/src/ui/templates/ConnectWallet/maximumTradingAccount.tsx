import {
  Accordion,
  Typography,
  Illustrations,
  Interaction,
} from "@polkadex/ux";

import { RemoveWalletCard } from "../ReadyToUse";

export const MaximumTradingAccount = () => {
  return (
    <Interaction className="gap-10">
      <Interaction.Content className="flex flex-col gap-6 flex-1">
        <div className="py-6 flex flex-col gap-5 items-center text-center border-b border-primary pb-8">
          <div className="max-w-[8rem]">
            <Illustrations.Error className="max-w-[6rem] w-full" />
          </div>
          <div className="flex flex-col gap-2">
            <Typography.Text bold size="xl">
              Maximum 3 accounts allowed
            </Typography.Text>
            <Typography.Text variant="primary">
              Each Funding account within the Orderbook can be linked to a
              maximum of 3 distinct Trading accounts.
            </Typography.Text>
          </div>
        </div>
        <Accordion type="multiple">
          <Accordion.Item value="accordion1">
            <Accordion.Trigger>
              <Typography.Text variant="secondary">
                Trading wallets
              </Typography.Text>
            </Accordion.Trigger>
            <Accordion.Content>
              <div className="flex flex-col gap-4">
                <RemoveWalletCard
                  address="5Cz5p3auaFUFN8FdToic5iVKnrXcnqrMbDs1ZUafzQFYyRw"
                  onClick={() => window.alert("remove")}
                />
                <RemoveWalletCard
                  address="5GC6vwNE8FdToic5iVKnrZrycMLnGJBJVSdXcnqrMbDs1LJC"
                  onClick={() => window.alert("remove")}
                />
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </Interaction.Content>
      <Interaction.Footer>
        <Interaction.Close>Back</Interaction.Close>
      </Interaction.Footer>
    </Interaction>
  );
};
