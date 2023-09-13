import { Icon } from "@polkadex/orderbook-ui/molecules";

import * as S from "./styles";

export const Navigation = ({
  title = "Title",
  onBack = undefined,
  isFull = false,
  children,
}) => {
  return (
    <S.Main isFull={isFull}>
      <S.Header>
        <S.Action onClick={onBack}>
          <Icon
            name="SingleArrowLeft"
            color="text"
            stroke="text"
            size="medium"
          />
        </S.Action>
        <span>{title}</span>
      </S.Header>
      <S.Content>{children}</S.Content>
    </S.Main>
  );
};