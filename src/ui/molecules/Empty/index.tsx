import { Props } from "./types";
import * as S from "./styles";

import * as I from "src/ui/atoms/Icons";

export const Empty = ({ description, image = "Empty", centered = false }: Props) => {
  const IconComponent = I[image];
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
