import * as S from "./styles";
import { Props } from "./types";

export const Skeleton = ({
  width = "-webkit-fill-available",
  height = "1rem",
  isLight = false,
  ...props
}: Props) => (
  <S.Wrapper isLight={isLight} width={width} height={height} {...props}></S.Wrapper>
);
