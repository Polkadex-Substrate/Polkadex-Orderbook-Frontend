import Link from "next/link";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import * as S from "./styles";
import { CardProps } from "./types";

import { Icon } from "@polkadex/orderbook-ui/molecules";
import { Icons } from "@polkadex/orderbook-ui/atoms";

export const Notifications = ({ notifications, onRemove, onAdd }) => {
  return (
    <S.Wrapper>
      <button type="button" onClick={onAdd}>
        Add
      </button>
      <S.ContentWrapper>
        <TransitionGroup className="notifications">
          {notifications
            .sort((a, b) => b.time - a.time)
            .map((value) => (
              <CSSTransition key={value.id} timeout={700} classNames="notification">
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
  title,
  message,
  time,
  active = false,
  actionTitle,
  actionUrl,
  onRemove,
  ...props
}: CardProps) => {
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
    <S.CardWrapper className="notification-wrapper" borderColor={boxColor(type)} {...props}>
      <S.Card>
        <div style={{ alignSelf: "flex-start" }}>
          <Icon size="extraSmall" name={type} />
        </div>
        <S.Container isActive={active}>
          <S.Title>
            <span>{title}</span>
            <p>{message}</p>
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
