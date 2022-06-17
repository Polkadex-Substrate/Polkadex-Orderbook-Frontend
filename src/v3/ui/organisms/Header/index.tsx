import React from "react";

import * as S from "./styles";

import { Logo } from "@orderbook/v3/ui/molecules";
import { Icons } from "@polkadex/orderbook-ui/atoms";

export const Header = () => {
  return (
    <S.Wrapper>
      <S.Header>
        <Logo />
      </S.Header>
      <S.Content>
        <S.ContentWrapper>
          <li>
            <span>
              <Icons.Market />
            </span>
            <p>Markets</p>
          </li>
          <li>
            <span>
              <Icons.Change />
            </span>
            <p>Exchange</p>
          </li>
          <li>
            <span>
              <Icons.Wallet />
            </span>
            <p>Wallet</p>
          </li>
        </S.ContentWrapper>
        <S.ContentWrapper>
          <li>
            <span>
              <Icons.Transaction />
            </span>
            <p>History</p>
          </li>
          <li>
            <span>
              <Icons.SingleCalendar />
            </span>
            <p>Transactions</p>
          </li>
          <li>
            <span>
              <Icons.Book />
            </span>
            <p>News</p>
          </li>
        </S.ContentWrapper>
      </S.Content>
      <S.Footer>
        <li>
          <span>
            <Icons.Question />
          </span>
          <p>Help</p>
        </li>
        <li>
          <Icons.Sun />
        </li>
      </S.Footer>
    </S.Wrapper>
  );
};
