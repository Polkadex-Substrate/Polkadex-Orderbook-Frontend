import { useMemo, useState } from "react";
import { useTranslation } from "next-i18next";
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
} from "@orderbook/core/providers/public/settings";

import * as S from "./styles";

type Props = {
  notifications: Notification[];
};

export const NotificationsContent = ({ notifications = [] }: Props) => {
  const [state, setState] = useState(true);

  const { onReadNotification } = useSettingsProvider();

  const allNotifications = useMemo(
    () =>
      notifications?.filter((value) =>
        !state ? value.active === state : value,
      ),
    [notifications, state],
  );

  const { t: translation } = useTranslation("molecules");
  const t = (key: string) => translation(`notifications.${key}`);

  return (
    <S.Content>
      <S.Title>
        <div>
          <h3>{t("title")}</h3>
        </div>
      </S.Title>
      <S.Recent>
        <S.RecentTitle>
          <h5>{t("recent")}</h5>
          <ul>
            <S.RecentLi isActive={state} onClick={() => setState(true)}>
              {t("all")}
            </S.RecentLi>
            <S.RecentLi isActive={!state} onClick={() => setState(false)}>
              {t("unread")}
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
  const iconType = type === "Info" ? "Information" : type;
  const iconName = `${iconType}Alert`;

  const { t: translation } = useTranslation("molecules");
  const t = (key: string) => translation(`notifications.${key}`);

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
              <p>{t("markAsRead")}</p>
            </TooltipContent>
          </Tooltip>
        </S.CardActionContainer>
      )}
    </S.Card>
  );
};
