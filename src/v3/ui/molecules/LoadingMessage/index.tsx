import * as S from "./styles";

import { Spinner } from "@polkadex/orderbook-ui/molecules";

export const LoadingeMessage = ({
  color = "tertiaryBackground",
  children,
  isVisible = false,
  isPriority = false,
  ...props
}) => (
  <S.Wrapper {...props}>
    {isVisible ? (
      <S.Container color={color} isVisible={isVisible} isPriority={isPriority}>
        <Spinner />
      </S.Container>
    ) : (
      children
    )}
  </S.Wrapper>
);
