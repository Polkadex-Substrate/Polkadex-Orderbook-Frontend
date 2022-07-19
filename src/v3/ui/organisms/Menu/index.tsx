import Link from "next/link";

import { Logo } from "../../molecules";

import * as S from "./styles";

import { AvailableMessage, Icon } from "@polkadex/orderbook-ui/molecules";
import { useAppearance } from "@polkadex/orderbook/v2/hooks";

export type MenuProps = {
  handleChange?: () => void;
  isWallet?: boolean;
};
const Menu = ({ handleChange = undefined, isWallet = false }: MenuProps) => {
  const { isDarkTheme, changeTheme } = useAppearance();

  return (
    <S.Wrapper>
      <S.WrapperLinks>
        <S.Logo>
          <Logo size="Medium" href="/trading" />
        </S.Logo>
        <S.Container>
          {!isWallet && (
            <S.WrapperIcon onClick={handleChange}>
              <div>
                <Icon name="Graph" background="none" stroke="text" size="large" />
              </div>
              <S.Span>Markets</S.Span>
            </S.WrapperIcon>
          )}
          <Link href="/trading">
            <S.WrapperIcon>
              <div>
                <Icon name="Exchange" background="none" stroke="text" size="large" />
              </div>
              <div>
                <S.Span>Exchange</S.Span>
              </div>
            </S.WrapperIcon>
          </Link>
          {!isWallet && (
            <Link href="/wallet">
              <S.WrapperIcon>
                <div>
                  <Icon name="Wallet" background="none" stroke="text" size="large" />
                </div>
                <div>
                  <S.Span>Wallets</S.Span>
                </div>
              </S.WrapperIcon>
            </Link>
          )}
        </S.Container>
        <S.Container>
          <AvailableMessage message="Soon">
            <S.WrapperIcon href="#">
              <div>
                <Icon name="History" background="none" stroke="text" size="large" />
              </div>
              <S.Span>My History</S.Span>
            </S.WrapperIcon>
          </AvailableMessage>
          <AvailableMessage message="Soon">
            <S.WrapperIcon href="#">
              <div>
                <Icon name="Transactions" background="none" stroke="text" size="large" />
              </div>
              <S.Span>Transactions</S.Span>
            </S.WrapperIcon>
          </AvailableMessage>
        </S.Container>
        <S.Container>
          <AvailableMessage message="Soon">
            <S.WrapperIcon href="#">
              <div>
                <Icon name="News" background="none" stroke="text" size="large" />
              </div>
              <S.Span>Affiliates</S.Span>
            </S.WrapperIcon>
          </AvailableMessage>

          <AvailableMessage message="Soon">
            <S.WrapperIcon href="#">
              <div>
                <Icon name="Help" background="none" stroke="text" size="large" />
              </div>
              <S.Span>Support</S.Span>
            </S.WrapperIcon>
          </AvailableMessage>
        </S.Container>
        <S.WrapperIcon onClick={changeTheme} as="div">
          <div>
            <Icon
              name={isDarkTheme ? "Sun" : "Moon"}
              background="secondaryBackground"
              size="large"
            />
          </div>
          <S.Span>{isDarkTheme ? "Light" : "Dark"}</S.Span>
        </S.WrapperIcon>
      </S.WrapperLinks>
      <S.WrapperProfile>
        <Icon name="Notifications" background="none" size="large" />\{" "}
      </S.WrapperProfile>
    </S.Wrapper>
  );
};

export default Menu;
