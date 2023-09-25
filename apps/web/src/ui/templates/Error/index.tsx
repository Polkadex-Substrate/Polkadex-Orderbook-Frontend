import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { defaultConfig } from "@orderbook/core/config";

import * as S from "./styles";

export const ErrorTemplate = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => router.push(defaultConfig.mainUrl), 4000);
  }, [router]);

  const { t } = useTranslation("error");

  return (
    <S.Wrapper>
      <Head>
        <title>{t("title")}</title>
      </Head>
      <S.Container>
        <S.TitleContainer>
          <h1>{t("statusCode")}</h1>
          <h2>{t("heading")}</h2>
          <p>{t("description")}</p>
        </S.TitleContainer>
        <S.ImageContainer>
          <img src="/img/error404.svg" alt="Error illustration" />
        </S.ImageContainer>
      </S.Container>
    </S.Wrapper>
  );
};
