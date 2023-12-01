import { PropsWithChildren } from "react";

import * as S from "./styles";
import { Props } from "./types";

import { normalizeValue } from "@/utils/normalize";

export const Skeleton = ({
  width = "max-content",
  loading = true,
  height = normalizeValue(1),
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
