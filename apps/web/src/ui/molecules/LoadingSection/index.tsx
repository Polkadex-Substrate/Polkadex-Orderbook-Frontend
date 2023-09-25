import { Spinner } from "@polkadex/orderbook-ui/molecules";

import * as S from "./styles";

export const LoadingSection = ({
  isActive = true,
  color = "tertiaryBackground",
  children,
}) => (
  <S.Wrapper>
    {children}
    <S.Container color={color} isActive={isActive}>
      <Spinner />
    </S.Container>
  </S.Wrapper>
);
