import { useTranslation } from "next-i18next";
import { Button } from "@polkadex/orderbook-ui/molecules";

import * as S from "./styles";

export const RemoveFromDevice = ({ onAction, onClose }) => {
  const { t: translation } = useTranslation("molecules");
  const t = (key: string) => translation(`removeFromDevice.${key}`);

  return (
    <S.Wrapper>
      <S.Title>
        <h2>{t("title")}</h2>
        <p>{t("description")}</p>
      </S.Title>
      <S.Content>
        <S.Actions>
          <Button
            size="large"
            background="transparent"
            color="tertiaryText"
            type="button"
            onClick={onClose}
          >
            {t("cancel")}
          </Button>
          <Button
            size="large"
            color="white"
            background="primary"
            type="submit"
            onClick={onAction}
          >
            {t("confirm")}
          </Button>
        </S.Actions>
      </S.Content>
    </S.Wrapper>
  );
};
