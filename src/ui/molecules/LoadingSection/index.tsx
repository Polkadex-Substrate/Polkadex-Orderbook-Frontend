import * as S from "./styles";

import { Spinner } from "@polkadex/orderbook-ui/molecules";

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
