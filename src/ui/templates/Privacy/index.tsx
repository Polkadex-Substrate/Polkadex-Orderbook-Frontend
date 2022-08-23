import Head from "next/head";
import { useState } from "react";

import * as S from "./styles";

import Menu from "@polkadex/orderbook/v3/ui/organisms/Menu";

export function PrivacyTemplate() {
  const [state, setState] = useState(false);
  return (
    <>
      <Head>
        <title>Polkadex Orderbook - Privacy Policy</title>
      </Head>
      <S.Main>
        <Menu handleChange={() => setState(!state)} />
        <S.Wrapper>
          <h1>Privacy Policy</h1>
          <p>Effective from Aug 22nd, 2022</p>
          <S.Content></S.Content>
        </S.Wrapper>
      </S.Main>
    </>
  );
}
