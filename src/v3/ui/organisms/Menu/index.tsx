import { Logo } from "../../molecules";

import * as S from "./styles";

import { Icon } from "@polkadex/orderbook-ui/molecules";

export type MenuProps = {
  handleChange: () => void;
};
const Menu = ({ handleChange }: MenuProps) => (
  <S.Wrapper>
    <S.WrapperLinks>
      <Logo size="Medium" />
      <S.Container>
        <S.WrapperIcon onClick={handleChange}>
          <div>
            <Icon name="Graph" background="none" />
          </div>
          <S.Span>Markets</S.Span>
        </S.WrapperIcon>
        <S.WrapperIcon href="#">
          <div>
            <Icon name="Exchange" background="none" />
          </div>
          <div>
            <S.Span>Exchange</S.Span>
          </div>
        </S.WrapperIcon>
        <S.WrapperIcon href="#">
          <div>
            <Icon name="Wallet" background="none" />
          </div>
          <div>
            <S.Span>Wallets</S.Span>
          </div>
        </S.WrapperIcon>
      </S.Container>
      <S.Container>
        <S.WrapperIcon href="#">
          <div>
            <Icon name="History" background="none" />
          </div>
          <S.Span>My History</S.Span>
        </S.WrapperIcon>
        <S.WrapperIcon href="#">
          <div>
            <Icon name="Transactions" background="none" />
          </div>
          <S.Span>Transactions</S.Span>
        </S.WrapperIcon>
      </S.Container>
      <S.Container>
        <S.WrapperIcon href="#">
          <div>
            <Icon name="News" background="none" />
          </div>
          <S.Span>Affiliates</S.Span>
        </S.WrapperIcon>
        <S.WrapperIcon href="#">
          <div>
            <Icon name="Help" background="none" />
          </div>
          <S.Span>Support</S.Span>
        </S.WrapperIcon>
      </S.Container>
      <S.WrapperIcon onClick={() => console.log("Light Mode")} href="#">
        <div>
          <Icon name="Sun" background="secondaryBackground" />
        </div>
        <S.Span>Dark</S.Span>
      </S.WrapperIcon>
    </S.WrapperLinks>
    <S.WrapperProfile>
      <Icon name="Notifications" background="none" />
      <S.Profile src="/img/Avatar.png" />
    </S.WrapperProfile>
  </S.Wrapper>
);

export default Menu;
