import { Interaction } from "@polkadex/ux";

import { GenericHorizontalCard } from "../ReadyToUse";

export const UserActions = ({
  onClose,
  onNewTradingAccount,
  onImportTradingAccount,
}: {
  onClose: () => void;
  onNewTradingAccount: () => void;
  onImportTradingAccount: () => void;
}) => {
  return (
    <Interaction className="gap-10">
      <Interaction.Content className="flex flex-col gap-2 flex-1">
        <GenericHorizontalCard
          title="Create new trading account"
          icon="Plus"
          onClick={onNewTradingAccount}
        />
        <GenericHorizontalCard
          title="Recover trading account"
          icon="Recover"
          onClick={onImportTradingAccount}
        />
      </Interaction.Content>
      <Interaction.Footer>
        <Interaction.Close onClick={onClose}>Cancel</Interaction.Close>
      </Interaction.Footer>
    </Interaction>
  );
};
