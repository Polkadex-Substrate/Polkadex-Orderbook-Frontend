import * as S from "./styles";
import { SearchProps, TokenSearchItemProps } from "./types";

import { Icon } from "@polkadex/orderbook-ui/molecules";
export const TokenSearch = ({
  label = "Label",
  tokens = [
    {
      id: 2,
      name: "Ethereum",
      ticket: "ETH",
    },
    {
      id: 3,
      name: "Polkadex",
      ticket: "PDEX",
    },
    {
      id: 4,
      name: "Polkadot",
      ticket: "DOT",
    },
  ],
}) => {
  return (
    <S.Wrapper>
      <S.ContentHeader>
        <h5>{label}</h5>
      </S.ContentHeader>
      <S.ContentSearch>
        <Search placeholder="Search token.." />
      </S.ContentSearch>
      <S.ContentTokens>
        {!!tokens &&
          tokens.map((token) => (
            <TokenItem key={token.id} tokenName={token.name} ticket={token.ticket} />
          ))}
      </S.ContentTokens>
    </S.Wrapper>
  );
};

const Search = ({ fullWidth = false, ...props }: SearchProps) => {
  return (
    <S.SearchWrapper fullWidth={fullWidth}>
      <Icon name="Search" background="transparent" />
      <input {...props} />
    </S.SearchWrapper>
  );
};

const TokenItem = ({ tokenName = "Polkadex", ticket = "Pdex" }: TokenSearchItemProps) => {
  return (
    <S.TokenItemWrapper>
      <Icon isToken name={ticket} />
      <div>
        <span> {ticket}</span>
        <span>{tokenName}</span>
      </div>
    </S.TokenItemWrapper>
  );
};
