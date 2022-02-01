import { FormEvent, useMemo, useState } from "react";

import * as S from "./styles";

import { Icon } from "@polkadex/orderbook-ui/molecules";
import { selectMarkets } from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";

export const Search = () => {
  const [active, setActive] = useState<boolean>(false);
  const [searchField, setSearchField] = useState<string>("");

  const markets = useReduxSelector(selectMarkets);
  const handleChange = (e: FormEvent<HTMLInputElement>) =>
    setSearchField(e.currentTarget.value);

  const handleClose = () => {
    setActive(!active);
    setSearchField("");
  };

  const handleOpen = () => setActive(true);

  const searchResults = useMemo(() => {
    console.log("Searching by name...", searchField);
    return markets.filter((market) => market.base_unit.toLowerCase().includes(searchField));
  }, [searchField, markets]);

  return (
    <S.Main isActive={active}>
      <S.Header>
        <S.Actions onClick={handleClose}>
          <Icon name="SingleArrowLeft" size="extraSmall" stroke="inverse" />
        </S.Actions>
        <S.Search onClick={active ? undefined : handleOpen}>
          <Icon name="Search" size="extraSmall" stroke="text" />
          <input
            type="text"
            placeholder="Search Menu.."
            value={searchField}
            onChange={handleChange}
          />
        </S.Search>
      </S.Header>
      <S.Content>
        {!!searchField && (
          <S.Results>
            {searchResults.length ? (
              searchResults.map((result) => (
                <ResultCard
                  key={result.id}
                  tokenTicker={result.base_unit}
                  tokenName={result.name}
                />
              ))
            ) : (
              <S.NoResults>No results</S.NoResults>
            )}
          </S.Results>
        )}
        {!searchField && (
          <S.RecentSearch>
            <S.Title>
              <h4>Recent Searches</h4>
              <button type="button" onClick={() => console.log("Delete All")}>
                Clear
              </button>
            </S.Title>
            <S.Container>
              <S.Card>
                <span>
                  <Icon name="Clock" size="extraSmall" stroke="text" />
                  Polkadex
                </span>
                <S.CardActions onClick={() => console.log("Delete Action")}>
                  <Icon name="Close" color="text" />
                </S.CardActions>
              </S.Card>
            </S.Container>
          </S.RecentSearch>
        )}
      </S.Content>
      <S.Overlay aria-hidden={!active} onClick={handleClose} />
    </S.Main>
  );
};

export const ResultCard = ({ tokenTicker, tokenName }) => {
  return (
    <S.ResultCard>
      <S.ResultCardToken>
        <Icon isToken name={tokenTicker} color="black" size="medium" />
      </S.ResultCardToken>
      <S.ResultCardContainer>
        <span>{tokenName}</span>
        <p>{tokenTicker}</p>
      </S.ResultCardContainer>
    </S.ResultCard>
  );
};
