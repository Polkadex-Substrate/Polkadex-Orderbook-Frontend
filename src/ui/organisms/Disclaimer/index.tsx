import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";

export const Disclaimer = () => {
  return (
    <S.Disclaimer>
      <div>
        <Icons.Attention />
      </div>
      <S.DisclaimerMessage>
        <strong>DISCLAIMER:</strong>Polkadex Orderbook is currently in its beta phase. Please
        observe caution while using it.
      </S.DisclaimerMessage>
    </S.Disclaimer>
  );
};
