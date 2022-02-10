import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";

import * as S from "./styles";

import { AlertCard } from "@orderbook/v2/ui/molecules";
import { notificationDeleteByIndex, selectNotifications } from "@polkadex/orderbook-modules";

export const Notifications = () => {
  const notifications = useSelector(selectNotifications);

  const dispatch = useDispatch();

  return (
    <S.Wrapper>
      <TransitionGroup>
        {notifications.map((notification, i) => (
          <CSSTransition key={i} timeout={500} classNames="animate-alert">
            <AlertCard
              title={notification.message.title}
              description={notification.message.description}
              icon="Clock"
              onClick={() => dispatch(notificationDeleteByIndex(i))}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </S.Wrapper>
  );
};
