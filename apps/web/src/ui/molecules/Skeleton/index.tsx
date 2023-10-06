import { PropsWithChildren } from "react";

import * as S from "./styles";
import { Props } from "./types";

export const Skeleton = ({
  width = "max-content",
  loading = true,
  height = "1rem",
  minHeight = "auto",
  minWidth = "auto",
  isLight = false,
  children,
  ...props
}: PropsWithChildren<Props>) => (
  <>
    {loading ? (
      <S.Wrapper
        isLight={isLight}
        width={width}
        height={height}
        minHeight={minHeight}
        minWidth={minWidth}
        {...props}
      />
    ) : (
      children
    )}
  </>
);
