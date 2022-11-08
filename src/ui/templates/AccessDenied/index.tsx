import Head from "next/head";
import Link from "next/link";

import * as S from "./styles";

import { OrderbookLogo } from "@polkadex/orderbook-ui/molecules";
import { Icons } from "@polkadex/orderbook-ui/atoms";

export const AccessDeniedTemplate = () => {
  return (
    <S.Wrapper>
      <Head>
        <title>Polkadex - Access denied</title>
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
            <span>403</span>
            <h1>Access denied</h1>
            <p>
              Your IP address indicates that you are attempting to access our services from a{" "}
              <a
                href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Excluded_Jurisdictions.pdf"
                target="_blank"
                rel="noreferrer">
                restricted jurisdiction
              </a>
              . Based on our{" "}
              <a
                href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Terms_of_Use.pdf"
                target="_blank"
                rel="noreferrer">
                Terms of use
              </a>
              , we are unable to provide services to users from this jurisdiction.
            </p>
            <small>Need help? contact us on Discord</small>
            <S.Social>
              <a href="https://discord.com/invite/Uvua83QAzk" target="_blank" rel="noreferrer">
                <div>
                  <Icons.Discord />
                </div>
                Discord
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
