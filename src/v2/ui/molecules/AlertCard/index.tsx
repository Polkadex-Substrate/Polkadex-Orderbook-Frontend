import * as S from "./styles";

import { Icon } from "@polkadex/orderbook-ui/molecules";

export const AlertCard = ({
  title = "Title",
  description = "Description",
  icon = "Clock",
  ...props
}) => {
  return (
    <S.Main>
      <S.Container>
        <S.Aside>
          <Icon name={icon} size="medium" color="white" stroke="white" />
        </S.Aside>
        <S.Aside>
          <span>{title}</span>
          <p>{description}</p>
        </S.Aside>
      </S.Container>
      <S.Action {...props}>
        <Icon name="Close" color="inverse" />
      </S.Action>
    </S.Main>
  );
};
