import { LoadingIcons } from "..";

import * as S from "./styles";

export const Loading = ({
  message = "This may take a few minutes..",
  children,
  isVisible = true,
}) => (
  <S.Wrapper>
    {children}
    <S.Container isVisible={isVisible}>
      <div>
        <LoadingIcons.Pulse size="medium" />
        <p>{message}</p>
      </div>
    </S.Container>
  </S.Wrapper>
);
