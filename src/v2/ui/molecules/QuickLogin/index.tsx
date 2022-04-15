import * as S from "./styles";

import { Icon, Dropdown } from "@polkadex/orderbook-ui/molecules";
import { QrCode } from "@polkadex/orderbook-ui/organisms";

export const QuickLogin = ({
  isFull = false,
  background = "white",
  hasBorder = false,
  label,
  title,
  description,
  qrCodeValue,
}) => {
  return (
    <S.Main>
      <Dropdown
        priority="medium"
        isFull={isFull}
        header={<Header background={background} hasBorder={hasBorder} label={label} />}
        direction="bottomRight"
        isOpacity>
        <Content
          isFull={isFull}
          title={title}
          description={description}
          qrCodeValue={qrCodeValue}
        />
      </Dropdown>
    </S.Main>
  );
};

const Header = ({ isActive = false, background = "white", hasBorder = false, label = "" }) => (
  <S.Header isActive={isActive} background={background} hasBorder={hasBorder}>
    <Icon name="Mobile" color="text" size="extraSmall" />
    {label}
  </S.Header>
);

const Content = ({ isFull, title = "", description = "", qrCodeValue }) => {
  return (
    <S.Content isFull={isFull}>
      <h4>{title}</h4>
      <QrCode mnemoicString={qrCodeValue} />
      <p>{description}</p>
    </S.Content>
  );
};
