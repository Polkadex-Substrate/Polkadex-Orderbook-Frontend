import { Props } from "./types";
import * as S from "./styles";

import { Icon } from "src/ui/components";

export const WalletInput = ({ value, ...props }: Props) => (
  <S.Wrapper>
    <input type="text" disabled {...props} />
    <button onClick={() => navigator.clipboard.writeText(value)}>
      <Icon icon="Copy" />
    </button>
  </S.Wrapper>
);
