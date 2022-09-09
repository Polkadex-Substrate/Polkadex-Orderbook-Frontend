import { Props } from "./types";
import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";

export const Empty = ({ description, image = "Empty", centered = false }: Props) => {
  const IconComponent = Icons[image];
  return (
    <S.Wrapper centered={centered}>
      <S.Container>
        <div>
          <IconComponent />
        </div>
        <p>{description}</p>
      </S.Container>
    </S.Wrapper>
  );
};
