import React, { Dispatch, SetStateAction, useMemo } from "react";
import { Button, Modal, Typography } from "@polkadex/ux";
import { RiCloseLine } from "@remixicon/react";
import {
  useSettingsProvider,
  Notification,
} from "@orderbook/core/providers/public/settings";

import { Card } from "./card";

export const NotificationsModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) => {
  const { notifications: allNotifications, onReadAllNotifications } =
    useSettingsProvider();
  const notifications: { [category: string]: Notification[] } = useMemo(() => {
    return allNotifications.reduce<{ [category: string]: Notification[] }>(
      (acc, notification) => {
        acc[notification.category] = [
          ...(acc[notification.category] || []),
          notification,
        ];
        acc[notification.category].sort((a, b) =>
          a.active === b.active ? 0 : a.active ? -1 : 1
        );
        return acc;
      },
      {}
    );
  }, [allNotifications]);

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      placement="top right"
      closeOnClickOutside
      className="flex flex-col border-primary bg-level-0 border-x w-screen h-screen md:max-w-md overflow-x-hidden overflow-y-auto"
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
          <RiCloseLine className="w-full h-full text-primary" />
        </Button.Icon>
      </Modal.Title>
      <Modal.Content className="flex flex-col flex-1 gap-6">
        {Object.keys(notifications)
          .sort()
          .map((category, index) => {
            return (
              <div key={index} className="flex flex-col gap-3">
                <Typography.Text appearance="primary" className="px-4">
                  {category}
                </Typography.Text>
                <div className="flex flex-col gap-2">
                  {notifications[category].map(
                    ({ id, message, date, active, description }) => {
                      return (
                        <Card
                          key={id}
                          title={message}
                          date={new Date(date).toLocaleString()}
                          active={active}
                        >
                          {description}
                        </Card>
                      );
                    }
                  )}
                </div>
              </div>
            );
          })}
      </Modal.Content>
      <Modal.Footer className="p-4">
        <Button.Solid
          onClick={onReadAllNotifications}
          className="w-full"
          appearance="secondary"
        >
          Mark all as read
        </Button.Solid>
      </Modal.Footer>
    </Modal>
  );
};
