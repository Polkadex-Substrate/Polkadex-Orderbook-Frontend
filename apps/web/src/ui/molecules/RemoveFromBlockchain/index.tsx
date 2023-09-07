import { useFormik } from "formik";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Button, InputLine } from "@polkadex/orderbook-ui/molecules";
import { typeValidations } from "@orderbook/core/validations";

import * as S from "./styles";

export const RemoveFromBlockchain = ({ onClose, onAction, name }) => {
  const { values, touched, handleSubmit, errors, getFieldProps } = useFormik({
    initialValues: {
      account: "",
    },
    validationSchema: typeValidations,
    onSubmit: onAction,
  });

  const isDisabled = useMemo(
    () =>
      values.account === `delete ${name} account`.replace(/\s+/g, " ").trim(),
    [values, name],
  );

  const { t: translation } = useTranslation("molecules");
  const t = (key: string, args = {}) =>
    translation(`removeFromBlockchain.${key}`, args);

  return (
    <S.Wrapper>
      <S.Tag>
        <strong>{t("warningLabel")}</strong>
        {t("text")}
      </S.Tag>
      <S.Title>
        <h2>{t("description")}</h2>
        <p>{t("summary")}</p>
      </S.Title>
      <form onSubmit={handleSubmit}>
        <InputLine
          name="account"
          label={
            <>
              {t("toVerify")}{" "}
              <S.Strong> {t("deleteAccount", { name })}</S.Strong> {t("below")}
            </>
          }
          placeholder={t("inputPlaceholder")}
          error={errors.account && touched.account && errors.account}
          {...getFieldProps("account")}
        />
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
            disabled={!isDisabled}
          >
            {t("confirm")}
          </Button>
        </S.Actions>
      </form>
    </S.Wrapper>
  );
};
