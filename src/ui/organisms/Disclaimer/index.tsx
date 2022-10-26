import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";

export const Disclaimer = () => {
  return (
    <S.Disclaimer>
      <div>
        <Icons.Attention />
      </div>
      <S.DisclaimerMessage>
        <strong>DISCLAIMER:</strong>Polkadex Orderbook is currently in its beta phase. Please
        observe caution while using it.{" "}
        <a
          href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Disclaimer_and_Legal_Notice.pdf"
          target="_blank"
          rel="noreferrer">
          Disclaimer and legal notice
        </a>
      </S.DisclaimerMessage>
    </S.Disclaimer>
  );
};
