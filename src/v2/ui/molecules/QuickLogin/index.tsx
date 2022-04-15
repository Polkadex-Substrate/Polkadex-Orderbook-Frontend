import * as S from "./styles";

import { Icon, Dropdown } from "@polkadex/orderbook-ui/molecules";

export const QuickLogin = ({
  isFull = false,
  background = "white",
  hasBorder = false,
  label,
  title,
  description,
}) => {
  return (
    <S.Main>
      <Dropdown
        priority="medium"
        isFull={isFull}
        header={<Header background={background} hasBorder={hasBorder} label={label} />}
        direction="bottomRight"
        isOpacity>
        <Content isFull={isFull} title={title} description={description} />
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

const Content = ({ isFull, title = "", description = "" }) => {
  return (
    <S.Content isFull={isFull}>
      <h4>{title}</h4>
      <figure>
        <img src="/img/qrCodeExample.svg" />
      </figure>
      <p>{description}</p>
    </S.Content>
  );
};
