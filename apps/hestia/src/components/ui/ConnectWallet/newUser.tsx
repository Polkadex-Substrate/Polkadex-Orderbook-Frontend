import { Typography, Icon, Illustrations, Interaction } from "@polkadex/ux";
import { RiArrowRightSLine } from "@remixicon/react";

export const NewUser = ({
  onContinue,
  onReadMore,
  onBack,
  onClose,
}: {
  onContinue: () => void;
  onReadMore: () => void;
  onBack: () => void;
  onClose: () => void;
}) => {
  return (
    <Interaction className="gap-10 pt-2 w-full md:max-w-[24rem]">
      <Interaction.Title className="-mb-8 mt-" onBack={{ onClick: onBack }} />
      <Interaction.Content
        className="flex flex-col gap-1 flex-1"
        withPadding={false}
      >
        <div className="flex flex-col gap-8">
          <div className="w-full">
            <Illustrations.NewUser />
          </div>
          <div className="flex flex-col gap-5 px-7">
            <div className="flex flex-col gap-1">
              <Typography.Text bold size="xl">
                To start trading, you need to create a trading account
              </Typography.Text>
              <div className="flex flex-col gap-4">
                <Typography.Paragraph size="sm" appearance="primary">
                  Think of your funding account as your bank account, handling
                  your funds, and a trading account as a secure virtual debit
                  card exclusively for trading.
                </Typography.Paragraph>
                <Typography.Paragraph size="sm" appearance="primary">
                  Orderbook simplifies token transfers between your funding and
                  trading account so you can focus on trading.
                </Typography.Paragraph>
              </div>
            </div>
            <button
              onClick={onReadMore}
              className="flex items-center gap-2 text-primary-base"
            >
              <Icon name="Wallet" className="w-4 h-4" />
              <Typography.Text className="text-primary-base">
                Read More
              </Typography.Text>
              <RiArrowRightSLine className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Interaction.Content>
      <Interaction.Footer>
        <Interaction.Action className="w-full" onClick={onContinue}>
          Continue
        </Interaction.Action>
        <Interaction.Close onClick={onClose}>Skip</Interaction.Close>
      </Interaction.Footer>
    </Interaction>
  );
};
