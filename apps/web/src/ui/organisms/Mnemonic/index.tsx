/* eslint-disable new-cap */
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "next-i18next";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { useMnemonic } from "@orderbook/core/hooks";
import { PaperWallet } from "@polkadex/orderbook-ui/organisms";

import * as S from "./styles";

export const Mnemonic = ({ handleMnemonicUpdate }) => {
  const [state, setState] = useState(true);
  const { mnemonic, mnemoicString } = useMnemonic();
  useEffect(
    () => handleMnemonicUpdate(mnemoicString),
    [handleMnemonicUpdate, mnemoicString],
  );

  const componentRef = useRef<HTMLInputElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "PolkadexPaperWallet",
    pageStyle: `
    @media all {
      div {
        width: 100%;
        height: 100%;
      }
      main, body {
        background: white !important;
      }
    }

    @media print {
      html, body {
        height: initial !important;
        width: initial !important;
      }
      body {
        -webkit-print-color-adjust: exact;
        -moz-print-color-adjust: exact;
        -ms-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }

    @page {
      size: landscape;
    }
    `,
  });

  const { t: translation } = useTranslation("organisms");
  const t = (key: string) => translation(`mnemonic.${key}`);

  return (
    <S.Wrapper isActive={state}>
      {!!mnemonic?.length && (
        <div style={{ display: "none" }}>
          {mnemoicString && (
            <PaperWallet
              ref={componentRef}
              mnemonic={mnemonic}
              mnemoicString={mnemoicString}
            />
          )}
        </div>
      )}
      <S.Title>
        <span>{t("title")}</span>
        <button type="button" onClick={() => setState(!state)}>
          {state ? <Icons.Show /> : <Icons.Hidden />} {state ? "Show" : "Hide"}
        </button>
      </S.Title>
      {state && (
        <S.Container>
          <S.Phrases>
            <p>{t("doNotShareMnemonic")} </p>
            <S.Content>
              {mnemonic?.map((value, i) => <span key={i}>{value}</span>)}
            </S.Content>
          </S.Phrases>
          <S.Footer>
            <span>{t("paperWallet")}</span>
            <button type="button" onClick={handlePrint}>
              <Icons.Download /> {t("print")}
            </button>
          </S.Footer>
        </S.Container>
      )}
    </S.Wrapper>
  );
};
