import { Icons, Tokens } from "@polkadex/orderbook-ui/atoms";
import { useTranslation } from "next-i18next";

import { Skeleton } from "../Skeleton";

import * as S from "./styles";

export const TokenCard = ({
  tokenTicker,
  tokenIcon,
  availableAmount = "0.00",
  onAction,
  loading = false,
}: {
  tokenTicker: string;
  tokenIcon: keyof typeof Tokens;
  availableAmount: string;
  onAction: () => void;
  loading?: boolean;
}) => {
  const { t } = useTranslation("transfer");

  const Token = Tokens[tokenIcon] ?? Tokens.UNKN;
  return (
    <S.Wrapper role="button" onClick={onAction}>
      <S.AsideLeft>
        <Skeleton width="4rem" height="4rem" loading={!tokenIcon}>
          <S.TokenWrapper>
            <Token />
          </S.TokenWrapper>
        </Skeleton>
        <S.TokenInfo>
          <Skeleton width="5rem" height="1.5rem" loading={!tokenTicker}>
            <p>{tokenTicker}</p>
          </Skeleton>
          <Skeleton
            width="12rem"
            height="1.5rem"
            loading={(!availableAmount && !tokenTicker) || loading}
          >
            <span>
              {t("balance")}: {availableAmount} {tokenTicker}
            </span>
          </Skeleton>
        </S.TokenInfo>
      </S.AsideLeft>
      <S.AsideRight>
        <Icons.ArrowBottom />
      </S.AsideRight>
    </S.Wrapper>
  );
};
