import Head from "next/head";

import * as S from "./styles";

import { Icon } from "@polkadex/orderbook-ui/molecules";

export const Maintenance = () => {
  return (
    <S.Wrapper>
      <Head>
        <title>Polkadex - Maintenance</title>
      </Head>
      <S.Container>
        <S.TitleContainer>
          <S.TitleWrapper>
            <h1>We’re improving your Experience</h1>
            <p>
              We’ll be back up and running again shortly. Please check out our social channels
              for further update!
            </p>
          </S.TitleWrapper>
          <S.SocialIcons>
            <a href="https://twitter.com/polkadex" target="_blank" rel="noreferrer">
              <Icon name="Twitter" size="extraSmall" />
            </a>
            <a href="https://t.me/Polkadex" target="_blank" rel="noreferrer">
              <Icon name="Telegram" size="extraSmall" />
            </a>
            <a href="https://polkadex.medium.com/" target="_blank" rel="noreferrer">
              <Icon name="Medium" size="extraSmall" />
            </a>
            <a
              href="https://www.youtube.com/channel/UC6fXRDT4lLKlXG3gP0PP06Q"
              target="_blank"
              rel="noreferrer">
              <Icon name="Youtube" size="extraSmall" />
            </a>
            <a
              href="https://www.linkedin.com/company/69690544"
              target="_blank"
              rel="noreferrer">
              <Icon name="Linkedin" size="extraSmall" />
            </a>
            <a href="https://www.reddit.com/r/polkadex" target="_blank" rel="noreferrer">
              <Icon name="Reddit" size="extraSmall" />
            </a>
          </S.SocialIcons>
        </S.TitleContainer>
        <S.ImageContainer>
          <img src="/img/maintenance.svg" alt="Maintenance illustration" />
        </S.ImageContainer>
      </S.Container>
    </S.Wrapper>
  );
};
