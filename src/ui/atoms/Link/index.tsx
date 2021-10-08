import * as S from "./styles";
import Props from "./types";

import { Icon } from "src/ui";

export const Link = ({ active, icon, text }: Props) => (
  <S.Wrapper active={active} icon={icon}>
    {icon && <Icon icon={icon} isActive={active} />}
    <span>{text}</span>
  </S.Wrapper>
);
