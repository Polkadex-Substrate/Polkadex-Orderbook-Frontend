import { useTranslation } from "react-i18next";
import { Icons } from "@polkadex/orderbook-ui/atoms";

import * as S from "./styles";

export const Disclaimer = ({ onClose }) => {
  const { t: translation } = useTranslation("organisms");
  const t = (key: string) => translation(`disclaimer.${key}`);

  return (
    <S.Disclaimer>
      <S.Close type="button" onClick={onClose}>
        <Icons.Close />
      </S.Close>
      <DisclaimerMessage
        message={t("message")}
        link="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Disclaimer_and_Legal_Notice.pdf"
      />
    </S.Disclaimer>
  );
};
export const DisclaimerMessage = ({ message, link = "", isSmall = false }) => {
  const { t: translation } = useTranslation("organisms");
  const { t: tc } = useTranslation("common");
  const t = (key: string) => translation(`disclaimer.${key}`);

  return (
    <S.DisclaimerContainer isSmall={isSmall}>
      <div>
        <Icons.Attention />
      </div>
      <S.DisclaimerMessage>
        <strong>{t("title")}</strong>
        {message}{" "}
        {!!link && (
          <a href={link} target="_blank" rel="noreferrer">
            {tc("disclaimerAndLegalNotice")}
          </a>
        )}
      </S.DisclaimerMessage>
    </S.DisclaimerContainer>
  );
};
