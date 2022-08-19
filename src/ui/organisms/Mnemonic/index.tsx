/* eslint-disable new-cap */
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";
import { useMnemonic } from "@polkadex/orderbook-hooks";
import PaperWallet from "@polkadex/orderbook-ui/templates/PaperWallet";

export const Mnemonic = ({ handleMnemonicUpdate }) => {
  const [state, setState] = useState(true);
  const { mnemonic, mnemoicString } = useMnemonic();
  handleMnemonicUpdate(mnemoicString);
  const componentRef = useRef();

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
  return (
    <S.Wrapper isActive={state}>
      {!!mnemonic?.length && (
        <div style={{ display: "none" }}>
          <PaperWallet ref={componentRef} mnemonic={mnemonic} mnemoicString={mnemoicString} />
        </div>
      )}
      <S.Title>
        <span>Mnemonic</span>
        <button type="button" onClick={() => setState(!state)}>
          {state ? <Icons.Show /> : <Icons.Hidden />} {state ? "Show" : "Hide"}
        </button>
      </S.Title>
      {state && (
        <S.Container>
          <S.Phrases>
            <p>Never share your mnemonic seed with anyone. </p>
            <S.Content>
              {mnemonic?.map((value, i) => (
                <span key={i}>{value}</span>
              ))}
            </S.Content>
          </S.Phrases>
          <S.Footer>
            <span>Paper Wallet</span>
            <button type="button" onClick={handlePrint}>
              <Icons.Download /> Print
            </button>
          </S.Footer>
        </S.Container>
      )}
    </S.Wrapper>
  );
};
