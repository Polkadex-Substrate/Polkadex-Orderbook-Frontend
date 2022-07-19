import dynamic from "next/dynamic";
import Head from "next/head";
import { useState } from "react";
import Link from "next/link";

import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";

const Menu = dynamic(() => import("@polkadex/orderbook/v3/ui/organisms/Menu"), {
  ssr: false,
});

export const AccountManagerTemplate = () => {
  const [state, setState] = useState(false);

  return (
    <>
      <Head>
        <title>Account Manager | Polkadex Orderbook</title>
        <meta name="description" content="A new era in DeFi" />
      </Head>
      <S.Main>
        <Menu handleChange={() => setState(!state)} />
        <S.Wrapper>
          <S.Title>
            <h1>Acount Manager</h1>
            <S.TitleWrapper>
              <S.TitleBalance>
                <div>
                  <Icons.Wallet />
                </div>
                <div>
                  <strong>Estimated Balance</strong>
                  <span>
                    25.622 PDEX <small> ~0.00 USD</small>
                  </span>
                </div>
              </S.TitleBalance>
              <S.TitleActions>
                <Link href="/deposit">
                  <a>Deposit</a>
                </Link>
                <Link href="/withdrw">
                  <a>Withdraw</a>
                </Link>
                <Link href="/history">
                  <a>History</a>
                </Link>
              </S.TitleActions>
            </S.TitleWrapper>
          </S.Title>
        </S.Wrapper>
      </S.Main>
    </>
  );
};
