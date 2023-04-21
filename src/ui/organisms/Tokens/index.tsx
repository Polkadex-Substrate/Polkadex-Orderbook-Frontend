import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, ChangeEvent, useState, useMemo } from "react";

import * as S from "./styles";
import * as T from "./types";

import { Icon } from "@polkadex/orderbook-ui/molecules";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useBalancesProvider } from "@polkadex/orderbook/providers/user/balancesProvider/useBalancesProvider";

export const Tokens = () => {
  const [fieldValue, setFieldValue] = useState({
    searchFieldValue: "",
  });

  const profileState = useProfile();
  const { loading: isLoading, balances, dispatchBalancesFetch } = useBalancesProvider();
  const hasUser = profileState.selectedAccount.tradeAddress !== "";

  useEffect(() => {
    if (hasUser) dispatchBalancesFetch();
  }, [hasUser]);

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFieldValue({ ...fieldValue, searchFieldValue: e.target.value });

  const allTokens = useMemo(
    () =>
      balances?.filter((token) => {
        return token.symbol.toLowerCase().includes(fieldValue.searchFieldValue.toLowerCase());
      }),
    [fieldValue, balances]
  );

  return (
    <S.Wrapper>
      <S.Title>
        <h2>Tokens</h2>
        <div>
          {/* <Icon name="Search" size="extraSmall" /> */}
          <input onChange={handleFieldChange} type="text" placeholder="Search.." />
        </div>
      </S.Title>
      <S.Content>
        {!isLoading ? (
          <div>
            {allTokens?.length ? (
              allTokens.map((token, index) => (
                <Card
                  key={index}
                  tokenName={token.symbol}
                  tokenTicker={token.symbol}
                  amount={0}
                />
              ))
            ) : (
              <p>No results</p>
            )}
          </div>
        ) : (
          <p>Loading</p>
        )}
      </S.Content>
    </S.Wrapper>
  );
};

const Card = ({ tokenName, tokenTicker, amount, amountInFiat = 0.0 }: T.TokenProps) => {
  const router = useRouter();
  return (
    <Link href={tokenTicker}>
      <a>
        <S.Card isActive={router.query.id === tokenTicker}>
          <S.FlexCenter>
            <Icon
              isToken
              name={tokenTicker}
              size="giant"
              background="secondaryBackground"
              style={{ marginRight: "0.8rem" }}
            />
            <div>
              <span>{tokenName}</span>
              <p>{tokenTicker}</p>
            </div>
          </S.FlexCenter>
          <S.Aside>
            <span>{amount}</span>
            <p>~{amountInFiat} USD</p>
          </S.Aside>
        </S.Card>
      </a>
    </Link>
  );
};
