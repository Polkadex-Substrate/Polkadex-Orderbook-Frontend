import Head from "next/head";
import { PropsWithChildren } from "react";

import * as S from "./styles";

import { OrderbookLogo } from "@polkadex/orderbook-ui/molecules";
export type Props = {
  title: string;
  footerText?: string;
  textButton?: string;
  buttonLink?: string;
};
export const Migration = ({
  title = "Orderbook v1 will go offline as it is upgraded to v2",
  footerText,
  textButton,
  buttonLink,
  children = <MigrationText />,
}: PropsWithChildren<Props>) => {
  return (
    <S.Wrapper>
      <Head>
        <title>Polkadex - Orderbook v2 migration</title>
      </Head>
      <S.Container>
        <S.Content>
          <S.Header>
            <span>
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M59.9277 52.7954V44.2343L45.3025 29.609H36.7414L59.9277 52.7954Z"
                  fill="white"
                />
                <path
                  d="M7.13543 59.2124H15.5937L29.9651 44.9469L44.2336 59.2124H52.8867L29.9651 36.3857L7.13543 59.2124Z"
                  fill="white"
                />
                <path
                  d="M0 6.41699L0 14.9781L14.6253 29.6034H23.1864L0 6.41699Z"
                  fill="white"
                />
                <path
                  d="M52.7952 4.95911e-05H44.3369L29.9656 14.2655L15.697 4.95911e-05H7.04395L29.9656 22.8267L52.7952 4.95911e-05Z"
                  fill="white"
                />
                <path
                  d="M30.0301 33.5251C32.2349 33.5251 34.0222 31.7378 34.0222 29.5331C34.0222 27.3283 32.2349 25.541 30.0301 25.541C27.8254 25.541 26.0381 27.3283 26.0381 29.5331C26.0381 31.7378 27.8254 33.5251 30.0301 33.5251Z"
                  fill="#E6007A"
                />
              </svg>
            </span>
            <span>
              <OrderbookLogo />
            </span>
          </S.Header>
          <S.Box>
            <h1>{title}</h1>
            {children}
          </S.Box>
          <S.Footer>
            {footerText && <p>{footerText}</p>}
            {textButton && (
              <a href={buttonLink} target="_blank" rel="noreferrer">
                {textButton}
              </a>
            )}
          </S.Footer>
        </S.Content>
        <S.Timer>
          <S.TimerWrapper>
            <h3>The migration ends in:</h3>
            <S.CountDown>
              <div>
                <span>10</span>
                <p>hrs</p>
              </div>
              <div>
                <span>30</span>
                <p>mins</p>
              </div>
              <div>
                <span>40</span>
                <p>secs</p>
              </div>
            </S.CountDown>
          </S.TimerWrapper>
          <img alt="" src="/img/migrationHero.svg" />
        </S.Timer>
      </S.Container>
    </S.Wrapper>
  );
};

const MigrationText = ({ chainBridgeDate = "20/05/2023" }) => (
  <>
    <p>
      <span>Accounts are migrating to Orderbook v2 for improved decentralized trading</span> .
      Trading will be unavailable during the migration, and all open orders have been
      cancelled. Funds have been withdrawn to the Polkadex address.
    </p>
    <p>
      <span>
        If you have cUSDT, use the{" "}
        <a href="/" target="_blank">
          {" "}
          ChainBridge portal
        </a>{" "}
        by {chainBridgeDate} to return USDT to your Ethereum address.
      </span>
    </p>
  </>
);
