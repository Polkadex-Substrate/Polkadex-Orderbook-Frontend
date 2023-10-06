import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { OrderbookLogo } from "@polkadex/orderbook-ui/molecules";
import { Icons } from "@polkadex/orderbook-ui/atoms";

import * as S from "./styles";

export const AccessDeniedTemplate = () => {
  const { t } = useTranslation("accessDenied");

  return (
    <S.Wrapper>
      <Head>
        <title>{t("title")}</title>
      </Head>
      <S.Container>
        <S.Header>
          <Link href="/">
            <S.LogoWrapper>
              <OrderbookLogo />
            </S.LogoWrapper>
          </Link>
        </S.Header>
        <S.Content>
          <S.AsideLeft>
            <span>{t("statuscode")}</span>
            <h1>{t("heading")}</h1>
            <p
              dangerouslySetInnerHTML={{
                __html: t("primaryDescription", {
                  restrictedJurisdictionLink: `<a href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Excluded_Jurisdictions.pdf" target="_blank" rel="noreferrer">${t(
                    "restrictedJurisdiction"
                  )}</a>`,
                  termOfUseLink: `<a href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Terms_of_Use.pdf" target="_blank" rel="noreferrer">${t(
                    "termOfUse"
                  )}</a>`,
                }),
              }}
            ></p>
            <small>{t("needHelp")}</small>
            <S.Social>
              <a
                href="https://discord.com/invite/Uvua83QAzk"
                target="_blank"
                rel="noreferrer"
              >
                <div>
                  <Icons.Discord />
                </div>
                {t("discord")}
              </a>
            </S.Social>
          </S.AsideLeft>
          <S.AsideRight>
            <Icons.AccessDenied />
          </S.AsideRight>
        </S.Content>
      </S.Container>
    </S.Wrapper>
  );
};
