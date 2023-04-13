import { useMemo, useState } from "react";

import * as S from "./styles";

import {
  Icon,
  Tooltip,
  TooltipContent,
  TooltipHeader,
  ResultFound,
} from "@polkadex/orderbook-ui/molecules";
import {
  useSettingsProvider,
  Notification,
} from "@polkadex/orderbook/providers/public/settings";

type Props = {
  notifications: Notification[];
};

export const NotificationsContent = ({ notifications = [] }: Props) => {
  const [state, setState] = useState(true);

  const { onReadNotification } = useSettingsProvider();

  const allNotifications = useMemo(
    () => notifications?.filter((value) => (!state ? value.active === state : value)),
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
                description={notification.message}
                time={new Date(notification.date).toLocaleString()}
                isRead={!notification.active}
                type={notification.type}
                onMarkAsRead={() => onReadNotification(notification.id)}
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

const Card = ({ description, type, time, isRead = false, onMarkAsRead }) => {
  const iconName = `${type}Alert`;
  return (
    <S.Card isRead={isRead}>
      <S.CardIcon>
        <Icon size="extraSmall" name={iconName} />
        {isRead && <S.Read />}
      </S.CardIcon>
      <S.CardContent>
        <p>{description}</p>
        <S.Actions>
          <small>{time}</small>
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
};
