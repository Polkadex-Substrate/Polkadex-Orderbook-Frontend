import * as S from "./styles";
import Props from "./types";

import { Icon } from "src/ui/components";

export const Link = ({ active, icon, text, ...props }: Props) => (
  <S.Wrapper active={active} icon={icon} {...props}>
    {icon && <Icon icon={icon} active={active} />}
    <span>{text}</span>
  </S.Wrapper>
);
