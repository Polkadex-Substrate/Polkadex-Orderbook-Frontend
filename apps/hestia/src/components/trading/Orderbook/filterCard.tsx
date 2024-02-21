import classNames from "classnames";
import { Button, Icon } from "@polkadex/ux";

import * as Icons from "@/components/ui/Icons";

export const FilterCard = ({
  icon,
  active = false,
  action,
}: {
  active?: boolean;
  icon: "Ask" | "Bid" | "AskAndBid";
  action: () => void;
}) => {
  const IconComponent = Icons[icon];
  return (
    <Button.Icon
      size="sm"
      appearance="secondary"
      variant="ghost"
      onClick={action}
      className={classNames("p-1", !active && "opacity-40")}
    >
      <IconComponent />
    </Button.Icon>
  );
};
