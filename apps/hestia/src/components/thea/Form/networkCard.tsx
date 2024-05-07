import { Button, Typography } from "@polkadex/ux";
import { RiArrowDownSLine } from "@remixicon/react";

import * as Icons from "@/components/ui/ChainIcons";

type Props = {
  onOpenModal: () => void;
  name: string;
  icon: string;
};
export const NetworkCard = ({ onOpenModal, name, icon }: Props) => {
  const IconComponent = Icons[icon as keyof typeof Icons] ?? null;

  return (
    <Button.Outline
      appearance="secondary"
      className="gap-1 px-2 py-7 justify-between"
      onClick={onOpenModal}
    >
      <div className="flex items-center gap-2">
        {IconComponent ? (
          <div className="flex items-center justify-center w-9 h-9 p-1.5">
            <IconComponent className="text-white" />
          </div>
        ) : (
          <div className="w-7 h-7 rounded-full bg-level-2" />
        )}
        <Typography.Text size="lg" bold>
          {name ?? "Select"}
        </Typography.Text>
      </div>
      <RiArrowDownSLine className="w-4 h-4" />
    </Button.Outline>
  );
};
