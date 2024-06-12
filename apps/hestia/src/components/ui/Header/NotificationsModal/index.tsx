import React, { Dispatch, ReactNode, SetStateAction, useMemo } from "react";
import { Button, Modal, Typography } from "@polkadex/ux";
import { RiCloseLine } from "@remixicon/react";
import {
  Options,
  documentToReactComponents,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import {
  useSettingsProvider,
  NotificationCategory,
  Notification,
} from "@orderbook/core/providers/public/settings";
import Link from "next/link";
import { useAnnouncements } from "@orderbook/core/index";

import { Card } from "./card";

export const NotificationsModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    notifications: allNotifications,
    onReadAllNotifications,
    onClearNotifications,
    onReadNotification,
    onRemoveNotification,
  } = useSettingsProvider();
  const {
    data: announcements,
    onHandleMarkAsRead,
    readedAnnouncements,
  } = useAnnouncements();
  const notifications: { [category: string]: Notification[] } = useMemo(() => {
    return allNotifications.reduce<{ [category: string]: Notification[] }>(
      (acc, notification) => {
        acc[notification.category] = [
          ...(acc[notification.category] || []),
          notification,
        ];
        return acc;
      },
      {}
    );
  }, [allNotifications]);

  const announcementFormat = useMemo(
    () =>
      announcements?.map((e) => ({
        ...e,
        custom: documentToReactComponents(e.custom, options),
      })),
    [announcements]
  );

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
        <div className="flex flex-col gap-3">
          <Typography.Text appearance="primary" className="px-4">
            Announcements
          </Typography.Text>
          <div className="flex flex-col gap-2">
            {announcementFormat?.map(({ id, message, date, custom, href }) => {
              const active = readedAnnouncements?.find((e) => e.includes(id));
              return (
                <Card
                  key={id}
                  category="Announcements"
                  title={message}
                  date={new Date(date).toLocaleDateString()}
                  active={!active}
                  href={href}
                  onRead={() => onHandleMarkAsRead(id)}
                  onRemove={() => onRemoveNotification(id)}
                  onRedirect={() => {
                    onHandleMarkAsRead(id);
                    href && window.open(href, "_blank", "noopener, noreferrer");
                  }}
                >
                  {custom as ReactNode}
                </Card>
              );
            })}
          </div>
        </div>
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
                    ({ id, message, date, active, description, href }) => {
                      return (
                        <Card
                          key={id}
                          onClick={() => onReadNotification(id)}
                          category={category as NotificationCategory}
                          title={message}
                          date={new Date(date).toLocaleDateString()}
                          active={active}
                          href={href}
                          onRead={() => onReadNotification(id)}
                          onRemove={() => onRemoveNotification(id)}
                          onRedirect={() => {
                            onReadNotification(id);
                            href &&
                              window.open(
                                href,
                                "_blank",
                                "noopener, noreferrer"
                              );
                          }}
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
      <Modal.Footer className="p-4 flex gap-2">
        <Button.Solid
          onClick={onReadAllNotifications}
          className="w-full"
          appearance="secondary"
        >
          Mark all as read
        </Button.Solid>
        <Button.Solid
          onClick={onClearNotifications}
          className="w-full"
          appearance="secondary"
        >
          Remove all
        </Button.Solid>
      </Modal.Footer>
    </Modal>
  );
};
const options = {
  renderMark: {
    [MARKS.BOLD]: (text: string) => (
      <Typography.Text className="font-medium" size="sm">
        {text}
      </Typography.Text>
    ),
  },
  renderNode: {
    [INLINES.HYPERLINK]: ({ data }, children) => (
      <Link
        className="text-primary-base text-sm"
        href={data.uri}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </Link>
    ),
    [BLOCKS.PARAGRAPH]: (_, children) => (
      <Typography.Paragraph appearance="primary" size="sm">
        {children}
      </Typography.Paragraph>
    ),
    [BLOCKS.HEADING_1]: (_, children) => (
      <Typography.Heading appearance="primary" type="h1">
        {children}
      </Typography.Heading>
    ),
    [BLOCKS.HEADING_2]: (_, children) => (
      <Typography.Heading appearance="primary" type="h2">
        {children}
      </Typography.Heading>
    ),
    [BLOCKS.HEADING_3]: (_, children) => (
      <Typography.Heading appearance="primary" type="h3">
        {children}
      </Typography.Heading>
    ),
    [BLOCKS.HEADING_4]: (_, children) => (
      <Typography.Heading appearance="primary" type="h4">
        {children}
      </Typography.Heading>
    ),
    [BLOCKS.HEADING_5]: (_, children) => (
      <Typography.Heading appearance="primary" type="h5">
        {children}
      </Typography.Heading>
    ),
    [BLOCKS.HEADING_6]: (_, children) => (
      <Typography.Heading appearance="primary" type="h6">
        {children}
      </Typography.Heading>
    ),
    [BLOCKS.UL_LIST]: (_, children) => (
      <ul className="list-disc ml-3  my-3">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_, children) => (
      <ol className="list-disc ml-3  my-3">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_, children) => <li className="mb-1">{children}</li>,
  },
} as Partial<Options>;
