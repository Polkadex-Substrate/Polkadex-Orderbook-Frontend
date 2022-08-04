import Link from "next/link";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useDispatch } from "react-redux";

import * as S from "./styles";
import * as T from "./types";

import { Icon } from "@polkadex/orderbook-ui/molecules";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { notificationMarkAsReadBy } from "@polkadex/orderbook-modules";

export const Notifications = ({ notifications = [] }: T.NotificationsProps) => {
  console.log("notifications", notifications);

  const dispatch = useDispatch();

  return (
    <S.Wrapper>
      <S.ContentWrapper>
        <TransitionGroup className="notifications">
          {notifications?.map((value) => (
            <CSSTransition key={value.id} timeout={300} classNames="notification">
              <Card
                onRemove={() =>
                  dispatch(notificationMarkAsReadBy({ id: value.id, by: "isActive" }))
                }
                {...value}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </S.ContentWrapper>
    </S.Wrapper>
  );
};

export const Card = ({
  type = "InformationAlert",
  message,
  time,
  actionTitle,
  actionUrl,
  onRemove,
  ...props
}: T.CardProps) => {
  const boxColor = (color: string) => {
    switch (color) {
      case "InformationAlert":
        return "blue";
      case "ErrorAlert":
        return "primary";
      default:
        return "orange";
    }
  };
  return (
    <S.CardWrapper borderColor={boxColor(type)} {...props}>
      <S.Card>
        <div style={{ alignSelf: "flex-start" }}>
          <Icon size="extraSmall" name={type} />
        </div>
        <S.Container>
          <S.Title>
            <span>{message.title}</span>
            <p>{message.description}</p>
          </S.Title>

          <S.Actions>
            <small>{new Date(time).toLocaleString()}</small>
            {actionUrl?.length && (
              <button type="button" onClick={undefined}>
                {actionTitle}
              </button>
            )}
          </S.Actions>
        </S.Container>
      </S.Card>
      <S.Close type="button" onClick={onRemove}>
        <Icons.Close />
      </S.Close>
    </S.CardWrapper>
  );
};
