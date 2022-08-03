import Link from "next/link";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import * as S from "./styles";
import * as T from "./types";

import { Icon } from "@polkadex/orderbook-ui/molecules";
import { Icons } from "@polkadex/orderbook-ui/atoms";

export const Notifications = ({ notifications = [], onRemove }: T.NotificationsProps) => {
  return (
    <S.Wrapper>
      <S.ContentWrapper>
        <TransitionGroup className="notifications">
          {notifications
            .sort((a, b) => Number(b.time) - Number(a.time))
            .map((value) => (
              <CSSTransition key={value.id} timeout={300} classNames="notification">
                <Card onRemove={() => onRemove(value.id)} {...value} />
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
  isRead = true,
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
        <S.Container isActive={isRead}>
          <S.Title>
            <span>{message.title}</span>
            <p>{message.description}</p>
          </S.Title>

          <S.Actions>
            <small>{time}</small>
            {actionUrl?.length && <Link href={actionUrl}>{actionTitle}</Link>}
          </S.Actions>
        </S.Container>
      </S.Card>
      <S.Close type="button" onClick={onRemove}>
        <Icons.Close />
      </S.Close>
    </S.CardWrapper>
  );
};
