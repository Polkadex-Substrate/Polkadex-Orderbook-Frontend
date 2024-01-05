import { Interaction } from "@polkadex/ux";

import { GenericHorizontalCard } from "../ReadyToUse";

export const UserActions = ({
  onClose,
  onNewTradingAccount,
  onImportTradingAccount,
  onTradingAccountList,
  fundWalletIsPresent,
}: {
  onClose: () => void;
  onNewTradingAccount: () => void;
  onImportTradingAccount: () => void;
  onTradingAccountList: () => void;
  fundWalletIsPresent: boolean;
}) => {
  return (
    <Interaction>
      <Interaction.Title onClose={onClose}>Options</Interaction.Title>
      <Interaction.Content className="flex flex-col gap-2 flex-1">
        {fundWalletIsPresent && (
          <GenericHorizontalCard
            title="Create new trading account"
            icon="Plus"
            onClick={onNewTradingAccount}
          />
        )}
        <GenericHorizontalCard
          title="Recover trading account"
          icon="Recover"
          onClick={onImportTradingAccount}
        />
        <GenericHorizontalCard
          title="Trading accounts list"
          icon="History"
          onClick={onTradingAccountList}
        />
      </Interaction.Content>
      <Interaction.Footer>
        <Interaction.Close onClick={onClose}>Cancel</Interaction.Close>
      </Interaction.Footer>
    </Interaction>
  );
};
