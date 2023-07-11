// TODO: Add types
import * as S from "./styles";

import { getImgUrl } from "@polkadex/web-helpers";
export const FaqTopMessage = ({ icon, children }) => {
  const iconUrl = getImgUrl(icon);
  return (
    <S.Wrapper>
      <S.Container>
        {icon && <img src={iconUrl} />}
        {children}
      </S.Container>
    </S.Wrapper>
  );
};
