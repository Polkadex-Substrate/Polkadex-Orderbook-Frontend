import { PropsWithChildren } from "react";
import { Icon } from "@polkadex/orderbook-ui/molecules";

import * as S from "./styles";

import { normalizeValue } from "@/utils/normalize";

type Props = {
  title: string;
  textLink?: string;
  link?: string;
  footerText?: string;
  textButton?: string;
  buttonLink?: string;
  imgUrl?: string;
  imgAlt?: string;
  onClose: () => void;
};

export const ShutdownInteraction = ({
  title = "Orderbook v1 will go offline as it is upgraded to v2",
  textLink,
  link,
  footerText,
  textButton,
  buttonLink,
  imgUrl = "/img/shutdownImage.svg",
  imgAlt,
  onClose,
  children = <ShutdownText />,
}: PropsWithChildren<Props>) => {
  const hasFooter = footerText || textButton;
  return (
    <S.Wrapper>
      <S.Header>
        <button type="button" onClick={onClose}>
          <Icon name="Close" stroke="tertiaryText" size="extraSmall" />
        </button>
      </S.Header>
      <S.Content>
        <img src={imgUrl} alt={imgAlt} />
        <h2>{title}</h2>
        {children}
        {textLink && (
          <a href={link} target="_blank" rel="noreferrer">
            {textLink}
            <Icon
              name="SingleArrowRight"
              fill="primary"
              size="medium"
              style={{
                marginLeft: normalizeValue(1),
                width: normalizeValue(1.3),
              }}
            />
          </a>
        )}
      </S.Content>
      {hasFooter && (
        <S.Footer>
          {footerText && <p>{footerText}</p>}
          {textButton && (
            <a href={buttonLink} target="_blank" rel="noreferrer">
              {textButton}
            </a>
          )}
        </S.Footer>
      )}
    </S.Wrapper>
  );
};

const ShutdownText = ({
  orderbookDate = "12/06/2023",
  chainBridgeDate = "August",
}) => (
  <>
    <p>
      In preparation for the upcoming mainnet{" "}
      <span>upgrade followed by Orderbook v2</span> , the start of DotSama
      listings, and a few more additions to the Polkadex product slate,{" "}
      <span>
        the current version of Polkadex Orderbook (v1) will go offline on{" "}
        {orderbookDate}.
      </span>{" "}
    </p>
    <p>
      All open orders after this date will be cancelled, while the funds
      currently on your trading account will be withdrawn automatically into
      your Polkadex address.{" "}
      <span>
        If you have cUSDT, please use the{" "}
        <a
          target="_blank"
          href="https://tokenmanager.polkadex.trade"
          rel="noreferrer"
        >
          ChainBridge portal
        </a>{" "}
        before {chainBridgeDate} to return your USDT to your Ethereum address.
      </span>
    </p>
  </>
);
