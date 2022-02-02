import * as S from "./styles";

import { Icon } from "@polkadex/orderbook-ui/molecules";

export const Navigation = ({ title = "Title", onBack, isFull = false, children }) => {
  return (
    <S.Main isFull={isFull}>
      <S.Header>
        <S.Action onClick={onBack}>
          <Icon name="SingleArrowLeft" color="inverse" size="extraSmall" />
        </S.Action>
        <span>{title}</span>
      </S.Header>
      <S.Content>{children}</S.Content>
    </S.Main>
  );
};
