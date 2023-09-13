import { Icons, Tokens } from "@polkadex/orderbook-ui/atoms";

import * as S from "./styles";

export const TokenCard = ({
  tokenTicker,
  tokenIcon,
  availableAmount = "0.00",
  onAction,
}: {
  tokenTicker: string;
  tokenIcon: keyof typeof Tokens;
  availableAmount: string;
  onAction: () => void;
}) => {
  const Token = Tokens[tokenIcon] ?? Tokens.UNKN;
  return (
    <S.Wrapper role="button" onClick={onAction}>
      <S.AsideLeft>
        <S.TokenWrapper>
          <Token />
        </S.TokenWrapper>
        <S.TokenInfo>
          <p>{tokenTicker}</p>
          <span>
            Avlb: {availableAmount} {tokenTicker}
          </span>
        </S.TokenInfo>
      </S.AsideLeft>
      <S.AsideRight>
        <Icons.ArrowBottom />
      </S.AsideRight>
    </S.Wrapper>
  );
};
