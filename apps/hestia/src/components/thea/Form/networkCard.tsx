"use client";
import { Typography, Chain, Button } from "@polkadex/ux";
import { RiArrowDownSLine } from "@remixicon/react";

type Props = {
  onOpenModal: () => void;
  name: string;
  icon: string;
};
export const NetworkCard = ({ onOpenModal, name, icon }: Props) => (
  <Button.Outline
    type="button"
    appearance="quaternary"
    className="gap-1 px-2 py-7 justify-between"
    onClick={onOpenModal}
  >
    <div className="flex items-center gap-2">
      <Chain name={icon} />
      <Typography.Text size="lg" bold>
        {name ?? "Select"}
      </Typography.Text>
    </div>
    <RiArrowDownSLine className="w-4 h-4" />
  </Button.Outline>
);
