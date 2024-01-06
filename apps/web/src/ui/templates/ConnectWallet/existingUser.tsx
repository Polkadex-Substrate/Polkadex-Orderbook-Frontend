import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Typography, Icon, Illustrations, Interaction } from "@polkadex/ux";
import { TradeAccount } from "@orderbook/core/providers/types";

import { GenericHorizontalCard, TradingAccountCard } from "../ReadyToUse";

export const ExistingUser = ({
  onClose,
  onReadMore,
  onBack,
  onCreate,
  onRecover,
  onTradingAccountList,
  accounts,
  onSelect,
  onSelectCallback,
}: {
  onClose: () => void;
  onReadMore: () => void;
  onCreate: () => void;
  onTradingAccountList: () => void;
  onRecover: () => void;
  onBack: () => void;
  accounts?: TradeAccount[];
  onSelect: (e: TradeAccount) => void;
  onSelectCallback: () => void;
}) => {
  return (
    <Interaction className="gap-10 overflow-hidden">
      <Interaction.Content className="flex flex-col gap-1 flex-1">
        <div className="flex flex-col gap-8">
          <div className="w-full">
            <Illustrations.ExistingUserKey />
          </div>
          {accounts?.length ? (
            <div className="flex flex-col gap-3">
              <Typography.Text variant="secondary" size="xs">
                Available trading account(s)
              </Typography.Text>
              <div
                className="flex flex-col gap-3 max-h-[15rem] overflow-hidden hover:overflow-auto"
                style={{ scrollbarGutter: "stable" }}
              >
                {accounts.map((value, i) => (
                  <TradingAccountCard
                    key={i}
                    address={value.address}
                    name={value.meta.name as string}
                    type="Browser"
                    onSelect={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onSelect(value);
                      onSelectCallback();
                    }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <Typography.Text bold size="xl">
                  Oops, no trading account found
                </Typography.Text>
                <Typography.Paragraph variant="primary">
                  You must have a trading account to access Orderbook. Import
                  your current account or set up a new one.
                </Typography.Paragraph>
              </div>
              <button
                onClick={onReadMore}
                className="flex items-center gap-2 text-primary-base"
              >
                <Icon name="Wallet" className="w-4 h-4" />
                <Typography.Text className="text-primary-base">
                  Read More
                </Typography.Text>
                <ChevronRightIcon className="w-3 h-3" />
              </button>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <GenericHorizontalCard
              title="Create new trading account"
              icon="Plus"
              onClick={onCreate}
            />
            <GenericHorizontalCard
              title="Recover trading account"
              icon="Recover"
              onClick={onRecover}
            />
            <GenericHorizontalCard
              title="Trading accounts list"
              icon="History"
              onClick={onTradingAccountList}
            />
          </div>
        </div>
      </Interaction.Content>
      <Interaction.Footer>
        <Interaction.Action onClick={onClose}>
          Connect trading account later
        </Interaction.Action>
        <Interaction.Close onClick={onBack}>
          Connect other wallet
        </Interaction.Close>
      </Interaction.Footer>
    </Interaction>
  );
};
