import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import * as S from "./styles";

import { defaultConfig } from "@polkadex/orderbook-config";

export const ErrorTemplate = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => router.push(defaultConfig.mainUrl), 4000);
  }, [router]);

  return (
    <S.Wrapper>
      <Head>
        <title>Polkadex - 404 Error</title>
      </Head>
      <S.Container>
        <S.TitleContainer>
          <h1>404</h1>
          <h2>There is no light down here.</h2>
          <p>
            Just because your path is different doesn’t mean you are lost. The page you are
            looking for is not available right now.
          </p>
        </S.TitleContainer>
        <S.ImageContainer>
          <img src="/img/error404.svg" alt="Error illustration" />
        </S.ImageContainer>
      </S.Container>
    </S.Wrapper>
  );
};
