import * as S from "./styles";

import { Icon, Dropdown } from "@polkadex/orderbook-ui/molecules";

export const QuickLogin = ({ isFull = false }) => {
  return (
    <S.Main>
      <Dropdown isFull={isFull} header={<Header />} direction="bottomRight" isOpacity>
        <Content isFull={isFull} />
      </Dropdown>
    </S.Main>
  );
};

const Header = ({ isActive = false }) => (
  <S.Header isActive={isActive}>
    <Icon name="Mobile" color="text" size="extraSmall" />
    Quick Access
  </S.Header>
);

const Content = ({ isFull }) => {
  return (
    <S.Content isFull={isFull}>
      <h4>Log in with QR Code</h4>
      <figure>
        <img src="/img/qrCodeExample.svg" />
      </figure>
      <p>Scan this QR Code with the Polkadex mobile app to log in instantly.</p>
    </S.Content>
  );
};
