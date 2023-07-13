import Head from "next/head";
import { useTranslation } from "react-i18next";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";

import * as S from "./styles";

import { Modal, OrderbookLogo } from "@polkadex/orderbook-ui/molecules";

const initialState = {
  days: "00",
  hours: "00",
  minutes: "00",
  seconds: "00",
};

type Props = {
  title: string;
  footerText?: string;
  textButton?: string;
  buttonLink?: string;
  dateIntimestampMs?: Date;
};

export const Migration = ({
  title,
  footerText,
  textButton,
  buttonLink,
  dateIntimestampMs,
  children = <MigrationText />,
}: PropsWithChildren<Props>) => {
  const [state, setState] = useState(initialState);
  const [showMessage, setShowMessage] = useState(false);

  const updateRemainingTime = useCallback((time: Date) => {
    const timestampDay = dayjs(time);
    const nowDay = dayjs();
    if (timestampDay.isBefore(nowDay)) return initialState;

    return {
      days: addZeros(timestampDay.diff(nowDay, "days")),
      hours: addZeros(timestampDay.diff(nowDay, "hours") % 24),
      minutes: addZeros(timestampDay.diff(nowDay, "minutes") % 60),
      seconds: addZeros(timestampDay.diff(nowDay, "seconds") % 60),
    };
  }, []);

  const addZeros = (value: number, minLenght = 2) =>
    value.toString().length >= minLenght ? value.toString() : `0${value.toString()}`;

  useEffect(() => {
    const initTimer = setInterval(
      () => setState(updateRemainingTime(dateIntimestampMs)),
      1000
    );

    return () => clearTimeout(initTimer);
  }, [dateIntimestampMs, updateRemainingTime]);

  const { t } = useTranslation("migration");

  return (
    <S.Wrapper>
      <Head>
        <title>{t("title")}</title>
      </Head>
      <S.Container>
        <Modal
          open={showMessage}
          onClose={() => setShowMessage(false)}
          onOpen={() => setShowMessage(true)}
          isBlur
          border="semiRounded"
          bgStyle="ghost">
          <S.Info>
            <p>
              After the Polkadex network’s adoption of new binaries and the execution of
              various runtime upgrades (which included the on-chain deployment of Orderbook v2
              and THEA) in June, the Polkadex Core Contributors switched on Orderbook v2 and
              THEA during the first week of July. Shortly after, the Polkadex network
              experienced a brief standstill due to the fact that some validators were running
              nodes with lower-than-required specs. While this issue could be resolved if all
              the validators in the network run optimal specs, this reliance on network
              validators to run high specs can threaten products built on the network as
              validators could at any time lower their specs and cause a similar crash to
              happen. This problem was not found on the testnet because of its nature as a
              controlled environment, only a live network with a diverse set of validators
              could have reproduced these results.
            </p>
            <p>
              In other words, the Orderbook v2 and THEA architecture deployed in the v5.1.3
              binaries was built with the assumption that all validators are running a minimum
              specification. We have fixed this problem by not relying on the entire validator
              set to maintain Polkadex Orderbook and have also removed the need for a gossip
              protocol that relies heavily on the network quality and processing capacity of
              individual validators within a limited block time.
            </p>
            <p>
              We have already released a new binary (v.5.2.0) which applies these changes to
              Orderbook. v5.2.0 is already running on over 185 nodes, or around 80% of the
              Polkadex network. We are currently working on moving THEA to the same logic.That
              binary is estimated to be released by the end of this week. Depending on the
              adoption of new binary releases, the execution of runtime upgrades, and the
              stability of the network, our most confident estimate for the start of trading is
              late July.
            </p>
            <p>
              Building an order-book that executes off-chain and with a capacity to be verified
              on chain is extremely challenging because of the decentralised nature of the
              available data set. This is an engineering challenge that has never been solved
              before. It far exceeds the proof of reserves mechanism currently adopted by
              centralised exchanges because it also adds other qualities of an on-chain DEX.
              Though it may look like such roadblocks are a show stopper, and since this is a
              product that the industry is looking for, we are confident the solutions will be
              well worth the wait. Thank you for your understanding and a special thanks to all
              the Polkadex validators for their proactive collaboration.
            </p>
            <button onClick={() => setShowMessage(false)}>Close</button>
          </S.Info>
        </Modal>
        <S.Content>
          <S.Outer>
            <S.Inner></S.Inner>
          </S.Outer>
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
              <OrderbookLogo light />
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
            <h3>{t("migrationEndsIn")}</h3>
            <S.CountDown>
              <div>
                <span>{state.days}</span>
                <p>{t("days")}</p>
              </div>
              <div>
                <span>{state.hours}</span>
                <p>{t("hrs")}</p>
              </div>
              <div>
                <span>{state.minutes}</span>
                <p>{t("mins")}</p>
              </div>
              <div>
                <span>{state.seconds}</span>
                <p>{t("secs")}</p>
              </div>
            </S.CountDown>
            <S.InfoButton onClick={() => setShowMessage(true)}>
              Important Update about Orderbook v2 Release.
            </S.InfoButton>
          </S.TimerWrapper>
          <img alt="" src="/img/migrationHero.svg" />
        </S.Timer>
      </S.Container>
    </S.Wrapper>
  );
};

const MigrationText = ({ chainBridgeDate = "August 2023" }) => {
  const { t } = useTranslation("migration");

  return (
    <>
      <p>{t("accountMigration")}</p>
      <p>
        <span>
          {t("description1")}{" "}
          <a href="https://tokenmanager.polkadex.trade" target="_blank" rel="noreferrer">
            {t("chainBridgePortal")}
          </a>{" "}
          {t("description2", { chainBridgeDate })}
        </span>
      </p>
    </>
  );
};
