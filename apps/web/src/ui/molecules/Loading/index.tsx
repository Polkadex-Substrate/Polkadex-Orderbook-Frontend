import { HTMLAttributes, ReactNode } from "react";
import { LoadingIcons } from "@polkadex/orderbook-ui/molecules";

import * as S from "./styles";

interface Props extends HTMLAttributes<HTMLDivElement> {
  message?: string;
  children: ReactNode;
  isVisible: boolean;
  hasBg?: boolean;
  spinner?: "Spinner" | "Points" | "Pulse" | "Keyboard";
}

export const Loading = ({
  message = "This may take a few minutes..",
  children,
  isVisible = true,
  hasBg = true,
  spinner = "Pulse",
  ...props
}: Props) => {
  const SpinnerComponent = LoadingIcons[spinner];
  return (
    <S.Wrapper {...props}>
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
