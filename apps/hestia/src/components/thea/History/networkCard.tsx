import { HoverCard, Typography } from "@polkadex/ux";
import { RiInformationFill } from "@remixicon/react";

import * as Icons from "@/components/ui/ChainIcons";

export const NetworkCard = ({
  name = "",
  isPolkadotEcosystem,
}: {
  name?: string;
  isPolkadotEcosystem?: boolean;
}) => {
  const IconComponent = name ? Icons[name as keyof typeof Icons] : null;

  if (isPolkadotEcosystem)
    return (
      <div className="flex items-center gap-1">
        {IconComponent && (
          <div className="flex items-center justify-center w-6 h-6 p-1 rounded-full border border-primary">
            <IconComponent />
          </div>
        )}
        <Typography.Text size="sm">{name}</Typography.Text>
      </div>
    );
  return (
    <HoverCard>
      <HoverCard.Trigger>
        <div className="flex items-center gap-1">
          {IconComponent && (
            <div className="flex items-center justify-center w-6 h-6 p-1 rounded-full border border-primary">
              <IconComponent />
            </div>
          )}
          <div className="flex flex-col">
            <Typography.Text size="sm">{name}</Typography.Text>
            <div className="flex items-center gap-1">
              <RiInformationFill className="w-2.5 h-2.5 text-actionInput" />
              <Typography.Text size="xs" appearance="primary">
                Ecosystem
              </Typography.Text>
            </div>
          </div>
        </div>
      </HoverCard.Trigger>
      <HoverCard.Content>Parachain within Polkadot ecosystem</HoverCard.Content>
    </HoverCard>
  );
};
