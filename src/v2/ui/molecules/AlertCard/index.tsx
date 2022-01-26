import * as S from "./styles";

import { Icon } from "@polkadex/orderbook-ui/molecules";

export const AlertCard = ({
  title = "Title",
  description = "Description",
  icon = "Clock",
  isFull = false,
}) => {
  return (
    <S.Main isFull={isFull}>
      <S.Container>
        <S.Aside>
          <Icon name={icon} size="medium" />
        </S.Aside>
        <S.Aside>
          <span>{title}</span>
          <p>{description}</p>
        </S.Aside>
      </S.Container>
      <S.Action>
        <Icon name="Close" color="inverse" onClick={() => console.log("Remove card")} />
      </S.Action>
    </S.Main>
  );
};
