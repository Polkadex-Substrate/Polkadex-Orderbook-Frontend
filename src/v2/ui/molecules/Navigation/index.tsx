import * as S from "./styles";

import { Icon } from "@polkadex/orderbook-ui/molecules";

export const Navigation = ({ title = "Title", isFull = false, children, ...props }) => {
  return (
    <S.Main isFull={isFull}>
      <S.Header>
        <Icon name="SingleArrowLeft" color="inverse" size="extraSmall" {...props} />
        <span>{title}</span>
      </S.Header>
      <S.Content>{children}</S.Content>
    </S.Main>
  );
};
