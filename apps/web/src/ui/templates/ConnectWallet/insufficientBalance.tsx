import {
  Accordion,
  Typography,
  Illustrations,
  Interaction,
} from "@polkadex/ux";

import { GenericInfoCard, GenericExternalCard } from "../ReadyToUse";

export const InsufficientBalance = ({
  onClose,
  balance,
  fee = 1,
}: {
  balance?: number;
  fee?: number;
  onClose: () => void;
}) => {
  return (
    <Interaction>
      <Interaction.Content className="flex flex-col gap-6 flex-1">
        <div className="flex flex-col gap-2 border-b border-primary">
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
            <GenericInfoCard label="Your balance">
              {balance} PDEX
            </GenericInfoCard>
            <GenericInfoCard label="Fees">{fee} PDEX</GenericInfoCard>
          </div>
        </div>
        <Accordion type="single" defaultValue="accordion1">
          <Accordion.Item value="accordion1">
            <Accordion.Trigger>
              <Typography.Heading type="h4" size="xs">
                Explore ways to get PDEX
              </Typography.Heading>
            </Accordion.Trigger>
            <Accordion.Content>
              <div className="flex flex-col gap-3">
                <GenericExternalCard
                  href="https://thea.polkadex.trade/"
                  icon="DecentralizedBridge"
                >
                  Decentralized bridge
                </GenericExternalCard>
                <GenericExternalCard
                  href="https://www.kucoin.com/trade/PDEX-USDT"
                  icon="Exchange"
                >
                  Centralized exchanges
                </GenericExternalCard>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </Interaction.Content>
      <Interaction.Footer>
        <Interaction.Close onClick={onClose}>Close</Interaction.Close>
      </Interaction.Footer>
    </Interaction>
  );
};
