import Head from "next/head";
import { useTranslation } from "next-i18next";
import { Icon, TwitterMessage } from "@polkadex/orderbook-ui/molecules";

import * as S from "./styles";

export const Maintenance = () => {
  const { t } = useTranslation("maintenance");

  return (
    <S.Wrapper>
      <Head>
        <title>{t("title")}</title>
      </Head>
      <S.Container>
        <S.TitleContainer>
          <S.TitleWrapper>
            <h1>{t("heading")}</h1>
            <p>{t("description")}</p>
          </S.TitleWrapper>
          <S.SocialIcons>
            <a
              href="https://twitter.com/polkadex"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Icon name="Twitter" size="extraSmall" />
            </a>
            <a
              href="https://t.me/Polkadex"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Icon name="Telegram" size="extraSmall" />
            </a>
            <a
              href="https://polkadex.medium.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Icon name="Medium" size="extraSmall" />
            </a>
            <a
              href="https://www.youtube.com/channel/UC6fXRDT4lLKlXG3gP0PP06Q"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Icon name="Youtube" size="extraSmall" />
            </a>
            <a
              href="https://www.linkedin.com/company/69690544"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Icon name="Linkedin" size="extraSmall" />
            </a>
            <a
              href="https://www.reddit.com/r/polkadex"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Icon name="Reddit" size="extraSmall" />
            </a>
          </S.SocialIcons>
          <S.Message>
            <h3>Announcement</h3>
            <TwitterMessage name="Polkadex" username="@polkadex • Jan 9">
              <p>
                <strong style={{ display: "block", marginBottom: "10px" }}>
                  ❗ Heads up Orderbook traders! ❗
                </strong>
                In order to prepare for the release of upcoming features,
                <strong>
                  Polkadex Orderbook will undergo a scheduled downtime this
                  upcoming Thursday, January 11th at 5:30 AM UTC
                </strong>
                . Trading will be halted for approximately
                <strong> 12 hours</strong>, and existing orders will be
                automatically cancelled.
                <strong>
                  {" "}
                  Orderbook will run like normal after the break..
                </strong>
              </p>
              <a
                href="https://twitter.com/polkadex/status/1744767837074284991"
                target="_blank"
                rel="noreferrer noopener"
              >
                Read the announcement to learn more.
              </a>
            </TwitterMessage>
          </S.Message>
        </S.TitleContainer>
        <S.ImageContainer>
          <img src="/img/maintenance.svg" alt="Maintenance illustration" />
        </S.ImageContainer>
      </S.Container>
    </S.Wrapper>
  );
};
