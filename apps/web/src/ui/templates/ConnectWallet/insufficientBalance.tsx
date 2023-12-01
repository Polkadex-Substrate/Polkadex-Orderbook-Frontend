import {
  Accordion,
  Interaction,
  Typography,
  Illustrations,
} from "@polkadex/ux";

import { GenericInfoCard, GenericExternalCard } from "../ReadyToUse";

export const InsufficientBalance = ({
  onClose,
  onTryAgain,
}: {
  onClose: () => void;
  onTryAgain: () => void;
}) => {
  return (
    <Interaction className="gap-10">
      <Interaction.Content className="flex flex-col gap-6 flex-1">
        <div className="flex flex-col gap-2 border-b border-primary pb-8">
          <div className="py-6 flex flex-col gap-5 items-center text-center">
            <div className="max-w-[8rem]">
              <Illustrations.Error className="max-w-[6rem] w-full" />
            </div>
            <Typography.Text variant="primary">
              It seems that you don&lsquo;t have enough funds to cover the
              transaction fees.
            </Typography.Text>
          </div>
          <div className="flex flex-col gap-2">
            <GenericInfoCard label="Your balance">2.9840201000</GenericInfoCard>
            <GenericInfoCard label="Fees">1 PDEX</GenericInfoCard>
          </div>
        </div>
        <Accordion type="multiple">
          <Accordion.Item value="accordion1">
            <Accordion.Trigger>
              <Typography.Heading type="h4" size="xs">
                Explore ways to get PDEX coins
              </Typography.Heading>
            </Accordion.Trigger>
            <Accordion.Content>
              <div className="flex flex-col gap-3">
                <GenericExternalCard href="/" icon="Free">
                  Get 1 PDEX for free
                </GenericExternalCard>
                <GenericExternalCard href="/" icon="CreditCard">
                  Credit card
                </GenericExternalCard>
                <GenericExternalCard href="/" icon="DecentralizedBridge">
                  Decentralized bridge
                </GenericExternalCard>
                <GenericExternalCard href="/" icon="Exchange">
                  Centralized exchanges
                </GenericExternalCard>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </Interaction.Content>
      <Interaction.Footer>
        <Interaction.Action onClick={onTryAgain} appearance="secondary">
          Try again
        </Interaction.Action>
        <Interaction.Close onClick={onClose}>Close</Interaction.Close>
      </Interaction.Footer>
    </Interaction>
  );
};
