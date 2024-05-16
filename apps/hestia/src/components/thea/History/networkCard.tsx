import { Chain, HoverCard, Typography } from "@polkadex/ux";
import { RiInformationFill } from "@remixicon/react";

export const NetworkCard = ({
  name = "",
  isPolkadotEcosystem,
}: {
  name?: string;
  isPolkadotEcosystem?: boolean;
}) => {
  if (isPolkadotEcosystem)
    return (
      <div className="flex items-center gap-1">
        <Chain name={name} />
        <Typography.Text size="sm">{name}</Typography.Text>
      </div>
    );
  return (
    <HoverCard>
      <HoverCard.Trigger>
        <div className="flex items-center gap-1">
          <Chain name={name} />
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
