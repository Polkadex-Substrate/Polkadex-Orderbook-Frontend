import { useDispatch } from "react-redux";
import { useMemo, useState } from "react";

import * as S from "./styles";

import { SpaceBetweenCenter } from "@orderbook/v2/ui/atoms";
import {
  Icon,
  Tooltip,
  TooltipContent,
  TooltipHeader,
} from "@polkadex/orderbook-ui/molecules";
import { notificationMarkAsReadBy, NotificationState } from "@polkadex/orderbook-modules";

type Props = {
  notifications: NotificationState;
};

export const NotificationsContent = ({ notifications = [] }: Props) => {
  const [state, setState] = useState(true);

  const dispatch = useDispatch();

  const allNotifications = useMemo(
    () => notifications.filter((value) => (!state ? value.isRead === state : value)),
    [notifications, state]
  );
  return (
    <S.Content>
      <S.Title>
        <SpaceBetweenCenter>
          <h3>Notifications Center</h3>
        </SpaceBetweenCenter>
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
          {allNotifications?.map((notification) => (
            <Card
              key={notification.id}
              title={notification.message.title}
              description={notification.message.description}
              time={new Date(notification.time).toLocaleString()}
              isRead={!notification.isRead}
              type={notification.type}
              onMarkAsRead={() =>
                dispatch(notificationMarkAsReadBy({ id: notification.id, by: "isRead" }))
              }
            />
          ))}
        </S.RecentContent>
      </S.Recent>
    </S.Content>
  );
};

const Card = ({ title, description, type, time, isRead = false, onMarkAsRead }) => (
  <S.Card isRead={isRead}>
    <S.CardIcon>
      <Icon size="extraSmall" name={type} />
      {isRead && <S.Read />}
    </S.CardIcon>
    <S.CardContent>
      <strong>{title}</strong>
      <p>{description}</p>
      <small>{time}</small>
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
