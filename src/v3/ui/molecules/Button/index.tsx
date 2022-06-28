import { ButtonHTMLAttributes } from "react";

import * as S from "./styles";

import { Colors } from "@polkadex/web-helpers";

export type ButtonProps = {
  title: string;
  size?: "Small" | "Medium" | "Large";
  fullWidth?: boolean;
  background?: Colors;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  title = "Button",
  size = "Medium",
  fullWidth = false,
  background = "secondaryBackground",
  ...props
}: ButtonProps) => (
  <S.Wrapper size={size} fullWidth={fullWidth} background={background} {...props}>
    {title}
  </S.Wrapper>
);

export default Button;
