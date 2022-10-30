import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";

export const Disclaimer = ({ onClose }) => {
  return (
    <S.Disclaimer>
      <S.Close type="button" onClick={onClose}>
        <Icons.Close />
      </S.Close>
      <DisclaimerMessage
        message="Polkadex Orderbook is currently in its beta phase. Please
      observe caution while using it."
        link="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Disclaimer_and_Legal_Notice.pdf"
      />
    </S.Disclaimer>
  );
};
export const DisclaimerMessage = ({ message, link = "", isSmall = false }) => (
  <S.DisclaimerContainer isSmall={isSmall}>
    <div>
      <Icons.Attention />
    </div>
    <S.DisclaimerMessage>
      <strong>DISCLAIMER:</strong>
      {message}{" "}
      {!!link && (
        <a href={link} target="_blank" rel="noreferrer">
          Disclaimer and legal notice
        </a>
      )}
    </S.DisclaimerMessage>
  </S.DisclaimerContainer>
);
