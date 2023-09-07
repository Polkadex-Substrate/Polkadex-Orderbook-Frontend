import { AllHTMLAttributes } from "react";

import * as S from "./styles";

export type ListItemProps = {
  title?: string;
  size?: "Small" | "Medium" | "Large";
  fullWidth?: boolean;
  isActive?: boolean;
} & Pick<AllHTMLAttributes<HTMLDivElement>, "onClick">;

export const ListItemButton = ({
  title,
  size = "Medium",
  fullWidth = false,
  isActive = false,
  ...props
}: ListItemProps) => (
  <S.Wrapper isActive={isActive} size={size} fullWidth={fullWidth} {...props}>
    {title}
  </S.Wrapper>
);
