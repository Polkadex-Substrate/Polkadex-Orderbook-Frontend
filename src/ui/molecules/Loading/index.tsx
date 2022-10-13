import { ReactNode } from "react";

import * as S from "./styles";

import { LoadingIcons } from "@polkadex/orderbook-ui/molecules";

type Props = {
  message?: string;
  children: ReactNode;
  isVisible: boolean;
  hasBg?: boolean;
  spinner?: "Spinner" | "Points" | "Pulse" | "Keyboard";
};
export const Loading = ({
  message = "This may take a few minutes..",
  children,
  isVisible = true,
  hasBg = true,
  spinner = "Pulse",
}: Props) => {
  const SpinnerComponent = LoadingIcons[spinner];
  return (
    <S.Wrapper>
      {children}
      <S.Container isVisible={isVisible} hasBg={hasBg}>
        <div>
          <SpinnerComponent size="medium" />
          {!!message.length && <p>{message}</p>}
        </div>
      </S.Container>
    </S.Wrapper>
  );
};
