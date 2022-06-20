import { Logo } from "../../molecules";

import * as S from "./styles";

import { AvailableMessage, Icon } from "@polkadex/orderbook-ui/molecules";
import { useAppearance } from "@polkadex/orderbook/v2/hooks";

export type MenuProps = {
  handleChange: () => void;
};
const Menu = ({ handleChange }: MenuProps) => {
  const { isDarkTheme, changeTheme } = useAppearance();
  return (
    <S.Wrapper>
      <S.WrapperLinks>
        <Logo size="Medium" />
        <S.Container>
          <S.WrapperIcon onClick={handleChange}>
            <div>
              <Icon name="Graph" background="none" size="large" />
            </div>
            <S.Span>Markets</S.Span>
          </S.WrapperIcon>
          <S.WrapperIcon href="#">
            <div>
              <Icon name="Exchange" background="none" size="large" />
            </div>
            <div>
              <S.Span>Exchange</S.Span>
            </div>
          </S.WrapperIcon>
          <S.WrapperIcon href="#">
            <div>
              <Icon name="Wallet" background="none" stroke="white" size="large" />
            </div>
            <div>
              <S.Span>Wallets</S.Span>
            </div>
          </S.WrapperIcon>
        </S.Container>
        <S.Container>
          <S.WrapperIcon href="#">
            <div>
              <Icon name="History" background="none" size="large" />
            </div>
            <S.Span>My History</S.Span>
          </S.WrapperIcon>
          <S.WrapperIcon href="#">
            <div>
              <Icon name="Transactions" background="none" size="large" />
            </div>
            <S.Span>Transactions</S.Span>
          </S.WrapperIcon>
        </S.Container>
        <S.Container>
          <S.WrapperIcon href="#">
            <div>
              <Icon name="News" background="none" size="large" />
            </div>
            <S.Span>Affiliates</S.Span>
          </S.WrapperIcon>
          <S.WrapperIcon href="#">
            <div>
              <Icon name="Help" background="none" size="large" />
            </div>
            <S.Span>Support</S.Span>
          </S.WrapperIcon>
        </S.Container>
        <AvailableMessage message="Soon">
          <S.WrapperIcon onClick={changeTheme} as="div">
            <div>
              <Icon
                name={isDarkTheme ? "Moon" : "Sun"}
                background="secondaryBackground"
                size="large"
              />
            </div>

            <S.Span>{isDarkTheme ? "Light" : "Dark"}</S.Span>
          </S.WrapperIcon>
        </AvailableMessage>
      </S.WrapperLinks>
      <S.WrapperProfile>
        <Icon name="Notifications" background="none" size="large" />
        <S.Profile src="/img/Avatar.png" />
      </S.WrapperProfile>
    </S.Wrapper>
  );
};

export default Menu;
