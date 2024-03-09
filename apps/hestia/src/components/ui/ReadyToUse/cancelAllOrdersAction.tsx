import { MarketBase } from "@orderbook/core/utils/orderbookService";
import { Dropdown, PopConfirm, Typography } from "@polkadex/ux";
import React, { useState } from "react";

export const CancelAllOrdersAction = ({
  onCancel,
  markets,
  orders,
}: {
  onCancel: (id: string) => Promise<void>;
  markets: MarketBase[];
  orders: number;
}) => {
  const [state, setState] = useState(false);
  return (
    <Dropdown open={state} onOpenChange={setState}>
      <Dropdown.Trigger className="whitespace-nowrap gap-1">
        <Typography.Text appearance="danger" size="xs">
          Cancel All
        </Typography.Text>
        <Dropdown.Icon className="text-danger-base w-3 h-3" />
      </Dropdown.Trigger>
      <Dropdown.Content>
        {markets?.map((e) => (
          <Dropdown.Item asChild key={e.id}>
            <PopConfirm>
              <PopConfirm.Trigger className="p-2 duration-200 transition-colors hover:bg-level-2 w-full">
                {e.name}
              </PopConfirm.Trigger>
              <PopConfirm.Content className="max-w-[350px]">
                <PopConfirm.Title>Cancel all orders</PopConfirm.Title>
                <PopConfirm.Description>
                  <Typography.Paragraph size="sm" appearance="primary">
                    Are you sure you want to cancel all orders
                    <Typography.Text> ({orders}) </Typography.Text> in the
                    <Typography.Text> {e.name} </Typography.Text>market?
                  </Typography.Paragraph>
                </PopConfirm.Description>
                <PopConfirm.Close>No</PopConfirm.Close>
                <PopConfirm.Button
                  appearance="danger"
                  onClick={async () => {
                    await onCancel(e.id);
                    setState(false);
                  }}
                >
                  Yes cancel
                </PopConfirm.Button>
              </PopConfirm.Content>
            </PopConfirm>
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </Dropdown>
  );
};
