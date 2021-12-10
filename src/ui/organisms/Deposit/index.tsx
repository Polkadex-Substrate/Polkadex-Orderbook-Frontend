import { useEffect, useRef } from "react";
import QRCode from "easyqrcodejs";

import * as S from "./styles";

import { Button } from "@polkadex/orderbook-ui/molecules";
import { FlexSpaceBetween } from "@polkadex/orderbook-ui/atoms";

export const Deposit = () => {
  const ref = useRef(null);
  useEffect(() => {
    const opts = {
      drawer: "svg",
      width: 140,
      height: 140,
      text: "https://example.com",
      logo: "/img/PolkadexIcon.svg",
    };

    const qrcode = new QRCode(ref.current, opts);
    const blob = new Blob([ref.current.innerHTML], { type: "image/svg+xml" });

    const downloadlink = window.URL.createObjectURL(blob);
    window.URL.revokeObjectURL(downloadlink);
  }, []);
  return (
    <S.Wrapper>
      <S.QrCodeContainer>
        <S.QrCode>
          <div ref={ref} />
        </S.QrCode>
        <p>Scan QR Code</p>
      </S.QrCodeContainer>
      <div>
        <S.Input>
          <span>Wallet Address</span>
          <FlexSpaceBetween>
            <p>19BY2XCgbDe6WtTVbTyzM9eR3LYr6tWK</p>
            <Button
              color="white"
              background="secondaryBackground"
              onClick={() => console.log("...")}>
              Copy
            </Button>
          </FlexSpaceBetween>
        </S.Input>
        <S.Container>
          <span>Send only BTC to this deposit address</span>
          <p>
            Sending coin or token other than BTC to this address may result in the loss of your
            deposit.
          </p>
        </S.Container>
      </div>
    </S.Wrapper>
  );
};
