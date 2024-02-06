import classNames from "classnames";

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
    <button
      onClick={action}
      className={classNames(
        !active && "opacity-50",
        "w-[1.8rem] h-[1.8rem] p-[0.25rem] hover:bg-level-1 transition-colors duration-300 rounded opacity-100"
      )}
    >
      <IconComponent />
    </button>
  );
};
