import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { Button, Dropdown } from "@polkadex/ux";

export const ActionsCard = () => (
  <div className="flex items-center gap-2">
    <Button.Solid size="sm" appearance="secondary">
      Trade
    </Button.Solid>
    <Dropdown>
      <Dropdown.Trigger className="group">
        <EllipsisVerticalIcon className="w-6 h-6 text-primary group-hover:text-current transition-colors duration-300" />
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item>Withdraw</Dropdown.Item>
        <Dropdown.Item>Deposit</Dropdown.Item>
        <Dropdown.Item>Transfer</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  </div>
);
