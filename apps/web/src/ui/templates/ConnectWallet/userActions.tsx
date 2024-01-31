import { Interaction } from "@polkadex/ux";

import { GenericHorizontalCard } from "../ReadyToUse";

export const UserActions = ({
  onClose,
  onNewTradingAccount,
  onImportTradingAccount,
  onTradingAccountList,
  fundWalletIsPresent,
  registeredProxies,
}: {
  onClose: () => void;
  onNewTradingAccount: () => void;
  onImportTradingAccount: () => void;
  onTradingAccountList: () => void;
  fundWalletIsPresent: boolean;
  registeredProxies: string[];
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
          title="Import trading account"
          icon="Recover"
          onClick={onImportTradingAccount}
        />
        <GenericHorizontalCard
          title={`Registered trading accounts (${registeredProxies.length})`}
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
