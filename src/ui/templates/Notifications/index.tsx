import * as S from "./styles";
import { NotificationCardProps } from "./types";

import { Icon } from "@polkadex/orderbook-ui/molecules";

export const Notifications = ({ notificationsActive = false }) => (
  <S.Wrapper notificationsActive={notificationsActive}>
    <S.ContentWrapper>
      <NotificationCard
        icon="Deposit"
        title="Deposit Successful"
        message="You have deposited 0.60000000 LTC at Fev 09, 2020 10:52:03"
        href="/"
      />
      <NotificationCard
        icon="Withdraw"
        title="Withdraw Successful"
        message="You have withdraw 1.60000000 LTC at
        Fev 09, 2020 12:19:22"
        href="/"
        active={false}
      />
    </S.ContentWrapper>
  </S.Wrapper>
);

export const NotificationCard = ({
  icon,
  title,
  message,
  active = true,
  ...props
}: NotificationCardProps) => {
  return (
    <S.NotificationCard {...props}>
      <S.Container isActive={active}>
        <Icon size="large" name={icon} />
      </S.Container>
      <S.Container isActive={active}>
        <span>{title}</span>
        <p>{message}</p>
      </S.Container>
    </S.NotificationCard>
  );
};
