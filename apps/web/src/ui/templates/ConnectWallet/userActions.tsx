import { Interaction } from "@polkadex/ux";

import { GenericHorizontalCard } from "../ReadyToUse";

export const UserActions = ({ onClose }: { onClose: () => void }) => {
  return (
    <Interaction className="gap-10">
      <Interaction.Content className="flex flex-col gap-2 flex-1">
        <GenericHorizontalCard
          title="Create new trading account"
          icon="Plus"
          onClick={() => window.alert("GoToCreateTradingAccount")}
        />
        <GenericHorizontalCard
          title="Recover trading account"
          icon="Recover"
          onClick={() => window.alert("GoToRecoverTradingAccount")}
        />
      </Interaction.Content>
      <Interaction.Footer>
        <Interaction.Close onClick={onClose}>Cancel</Interaction.Close>
      </Interaction.Footer>
    </Interaction>
  );
};
