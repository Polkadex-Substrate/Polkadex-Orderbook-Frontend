import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Typography, Icon, Illustrations, Interaction } from "@polkadex/ux";

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
    <Interaction className="gap-10 pt-2" withAnimation={false}>
      <Interaction.Title
        className="-mb-8 [&>button>svg]:scale-125"
        onClose={onClose}
      />
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
                <Typography.Paragraph variant="primary">
                  Think of your wallet as your bank account, handling your
                  funds, and a trading account as a secure virtual debit card
                  exclusively for trading.
                </Typography.Paragraph>
                <Typography.Paragraph variant="primary">
                  Orderbook simplifies token transfers between your wallet and
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
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Interaction.Content>
      <Interaction.Footer>
        <Interaction.Action onClick={onContinue}>Continue</Interaction.Action>
        <Interaction.Close onClick={onBack}>Back</Interaction.Close>
      </Interaction.Footer>
    </Interaction>
  );
};
