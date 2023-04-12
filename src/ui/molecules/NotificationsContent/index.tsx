import { useMemo, useState } from "react";
import Link from "next/link";

import * as S from "./styles";

import {
  Icon,
  Tooltip,
  TooltipContent,
  TooltipHeader,
  ResultFound,
} from "@polkadex/orderbook-ui/molecules";
import { NotificationState } from "@polkadex/orderbook-modules";
import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";

type Props = {
  notifications: NotificationState;
};

export const NotificationsContent = ({ notifications = [] }: Props) => {
  const [state, setState] = useState(true);

  const { onNotificationMarkAsReadBy } = useSettingsProvider();

  const allNotifications = useMemo(
    () => notifications.filter((value) => (!state ? value.isRead === state : value)),
    [notifications, state]
  );
  return (
    <S.Content>
      <S.Title>
        <div>
          <h3>Notifications Center</h3>
        </div>
      </S.Title>
      <S.Recent>
        <S.RecentTitle>
          <h5>Recent</h5>
          <ul>
            <S.RecentLi isActive={state} onClick={() => setState(true)}>
              All
            </S.RecentLi>
            <S.RecentLi isActive={!state} onClick={() => setState(false)}>
              Unread
            </S.RecentLi>
          </ul>
        </S.RecentTitle>
        <S.RecentContent isScrollable={allNotifications?.length > 3}>
          {allNotifications?.length ? (
            allNotifications.map((notification) => (
              <Card
                key={notification.id}
                title={notification.message.title}
                description={notification.message.description}
                time={new Date(notification.time).toLocaleString()}
                isRead={!notification.isRead}
                type={notification.type}
                actionUrl={notification.actionUrl}
                actionTitle={notification.actionTitle}
                onMarkAsRead={() =>
                  onNotificationMarkAsReadBy({ id: notification.id, by: "isRead" })
                }
              />
            ))
          ) : (
            <ResultFound />
          )}
        </S.RecentContent>
      </S.Recent>
    </S.Content>
  );
};

const Card = ({
  title,
  description,
  type,
  time,
  isRead = false,
  onMarkAsRead,
  actionUrl,
  actionTitle,
}) => (
  <S.Card isRead={isRead}>
    <S.CardIcon>
      <Icon size="extraSmall" name={type} />
      {isRead && <S.Read />}
    </S.CardIcon>
    <S.CardContent>
      <strong>{title}</strong>
      <p>{description}</p>

      <S.Actions>
        <small>{time}</small>
        {actionUrl?.length && <Link href={actionUrl}>{actionTitle}</Link>}
      </S.Actions>
    </S.CardContent>
    {isRead && (
      <S.CardActionContainer>
        <Tooltip>
          <TooltipHeader>
            <S.CardAction onClick={onMarkAsRead}>
              <Icon name="Verified" color="black" />
            </S.CardAction>
          </TooltipHeader>
          <TooltipContent position="right">
            <p>Mark as read</p>
          </TooltipContent>
        </Tooltip>
      </S.CardActionContainer>
    )}
  </S.Card>
);
