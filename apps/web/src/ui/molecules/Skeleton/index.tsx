import * as S from "./styles";
import { Props } from "./types";

export const Skeleton = ({
  width = "max-content",
  height = "1rem",
  minHeight = "auto",
  minWidth = "auto",
  isLight = false,
  ...props
}: Props) => (
  <S.Wrapper
    isLight={isLight}
    width={width}
    height={height}
    minHeight={minHeight}
    minWidth={minWidth}
    {...props}
  ></S.Wrapper>
);
