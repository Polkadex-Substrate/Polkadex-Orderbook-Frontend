import { InputHTMLAttributes } from "react";
import { Icons } from "@polkadex/orderbook-ui/atoms";

import * as S from "./styles";

export type InputProps = {
  label?: string;
  inputInfo?: string;
  fullWidth?: boolean;
  icon?: "Price" | "Amount";
} & InputHTMLAttributes<HTMLInputElement>;

export const MarketInput = ({
  label = "Label",
  inputInfo,
  fullWidth = false,
  icon,
  ...props
}: InputProps) => {
  const IconComponent = icon?.length ? Icons[icon] : <div />;
  return (
    <S.Wrapper>
      <S.ContainerInput>
        <S.Label>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          {icon?.length && <IconComponent />}
          {label}
        </S.Label>
        <S.Box inputInfo={inputInfo} fullWidth={fullWidth}>
          <S.Input {...props} />
          {inputInfo && <S.Span>{inputInfo}</S.Span>}
        </S.Box>
      </S.ContainerInput>
    </S.Wrapper>
  );
};
