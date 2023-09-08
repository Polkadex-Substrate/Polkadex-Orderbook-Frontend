import { PolkadexIcon } from "../Logo";

import * as S from "./styles";

const LoadingScreen = () => {
  return (
    <S.Container>
      <S.Main />
      <S.Logo>
        <PolkadexIcon />
      </S.Logo>
    </S.Container>
  );
};

export default LoadingScreen;
