import { PolkadexIcon } from "../Logo";

import * as S from "./styles";

const LoadingScreen = ({ light = false }) => {
  return (
    <S.Container>
      <S.Main />
      <S.Logo>
        <PolkadexIcon light={light} />
      </S.Logo>
    </S.Container>
  );
};

export default LoadingScreen;
