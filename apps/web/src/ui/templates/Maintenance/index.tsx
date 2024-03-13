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
            <h3>{t("announcement")}</h3>
            <TwitterMessage name="Polkadex" username="@polkadex • Mar 11, 2024">
              <strong>
                ⚙️ A runtime upgrade is scheduled for Wednesday at 5:30am UTC
                followed by an Orderbook downtime of ~24 hours ⛔️
              </strong>
              <S.TwitterContainer>
                <p>Part of the Hestia release, the upgrade features:</p>
                <ul>
                  <li>🔥 New Orderbook UI</li>
                  <li>💸 LMP Rewards component</li>
                  <li>🪙 Trading fees</li>
                  <li>🐛 Market-making bug fixes</li>
                </ul>
              </S.TwitterContainer>

              <S.TwitterImage
                src="/img/obRuntimeTwitter.webp"
                alt="Orderbook runtime upgrade"
              />
              <a
                href="https://twitter.com/polkadex/status/1767347045357224325"
                target="_blank"
                rel="noreferrer noopener"
              >
                {t("announcementButton")}
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
