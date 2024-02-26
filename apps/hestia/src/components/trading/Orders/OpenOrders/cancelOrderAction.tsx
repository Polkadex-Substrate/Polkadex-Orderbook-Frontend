import { TrashIcon } from "@heroicons/react/24/outline";
import { Button, PopConfirm } from "@polkadex/ux";
import React from "react";

export const CancelOrderAction = ({
  onCancel,
  responsive,
}: {
  onCancel: () => void;
  responsive?: boolean;
}) => {
  return (
    <PopConfirm>
      <PopConfirm.Trigger asChild>
        {responsive ? (
          <Button.Solid className="w-full" appearance="danger">
            Cancel Order
          </Button.Solid>
        ) : (
          <Button.Icon
            size="sm"
            appearance="danger"
            className="p-1"
            variant="ghost"
          >
            <TrashIcon />
          </Button.Icon>
        )}
      </PopConfirm.Trigger>
      <PopConfirm.Content>
        <PopConfirm.Title>Cancel order</PopConfirm.Title>
        <PopConfirm.Description>
          Are you sure you want to cancel this order?
        </PopConfirm.Description>
        <PopConfirm.Close>No</PopConfirm.Close>
        <PopConfirm.Button appearance="danger" onClick={onCancel}>
          Yes cancel
        </PopConfirm.Button>
      </PopConfirm.Content>
    </PopConfirm>
  );
};
