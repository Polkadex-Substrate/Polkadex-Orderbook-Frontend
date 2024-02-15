import React, { Dispatch, SetStateAction } from "react";
import { Button, Modal, Typography } from "@polkadex/ux";
import { XMarkIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";

import { Card } from "./card";

export const NotificationsModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      placement="top right"
      closeOnClickOutside
      className={classNames(
        "flex flex-col border-primary bg-level-0 border-x w-screen h-screen md:max-w-md overflow-x-hidden overflow-y-auto",
        "top-1/2 right-0 transform -translate-y-1/2" // fix that in polkadex/ux
      )}
    >
      <Modal.Title className="flex justify-between items-center py-4 pl-4">
        <Typography.Text size="lg" bold>
          Notifications
        </Typography.Text>
        <Button.Icon
          variant="ghost"
          size="lg"
          appearance="secondary"
          rounded
          onClick={() => onOpenChange(false)}
        >
          <XMarkIcon />
        </Button.Icon>
      </Modal.Title>
      <Modal.Content className="flex flex-col flex-1 gap-6">
        <div className="flex flex-col gap-3">
          <Typography.Text appearance="secondary" className="px-4">
            General
          </Typography.Text>
          <div className="flex flex-col gap-2">
            <Card
              title="Transfer ready to claim"
              date="2024-01-02 09:14:38"
              active
            >
              Your transfer of 4200 USDT from your trading account to your
              funding account is ready to claim.
            </Card>
            <Card title="4200 USDT transfer" date="2024-01-02 08:12:03">
              Your transfer of 4200 USDT from your trading account to your
              funding account is currently processing.
            </Card>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Typography.Text appearance="secondary" className="px-4">
            Announcements
          </Typography.Text>
          <div className="flex flex-col gap-2">
            <Card title="GMLR/USDT available" date="2024-01-02 09:14:38" active>
              Plus, the Polkadex community is now accepting Moombeam token
              listing proposals.
            </Card>
            <Card title="Maintenance schedule" date="2024-01-02 08:12:03">
              Polkadex Orderbook will undergo a sheduled downtime on Jan 11th at
              5.30 AM UTC.
            </Card>
          </div>
        </div>
      </Modal.Content>
      <Modal.Footer className="p-4">
        <Button.Solid className="w-full" appearance="secondary">
          Mark all as read
        </Button.Solid>
      </Modal.Footer>
    </Modal>
  );
};
