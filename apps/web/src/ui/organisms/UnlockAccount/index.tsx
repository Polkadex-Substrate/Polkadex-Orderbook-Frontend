import { useFormik } from "formik";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Button, PassCode } from "@polkadex/orderbook-ui/molecules";
import { unLockAccountValidations } from "@orderbook/core/validations";
import { Icons } from "@polkadex/orderbook-ui/atoms";

import * as S from "./styles";

export const UnlockAccount = ({ handleClose = undefined, onSubmit }) => {
  const { setFieldValue, values, handleSubmit, isValid, dirty } = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: unLockAccountValidations,
    onSubmit: onSubmit,
  });
  const digitsLeft = useMemo(
    () => 5 - Array.from(String(values.password), (v) => Number(v)).length,
    [values],
  );

  const message =
    isValid && dirty
      ? "Lets go"
      : `${digitsLeft} digit${digitsLeft > 1 ? "s" : ""} left`;

  const { t: translation } = useTranslation("organisms");
  const t = (key: string) => translation(`unlockAccount.${key}`);

  return (
    <S.Wrapper>
      <S.Title>
        <S.Icon>
          <Icons.Lock />
        </S.Icon>
        <h2>{t("title")}</h2>
        <p>{t("description")}</p>
      </S.Title>
      <form onChange={() => handleSubmit()}>
        <PassCode
          numInputs={5}
          onChange={(e) => setFieldValue("password", e)}
          value={values.password}
          name="password"
        />
        <S.Actions>
          {handleClose && (
            <Button
              size="large"
              background="transparent"
              color="tertiaryText"
              type="button"
              onClick={handleClose}
            >
              {t("cancel")}
            </Button>
          )}
          <S.Span color={isValid && dirty ? "green" : "secondaryBackground"}>
            {message}
          </S.Span>
        </S.Actions>
      </form>
    </S.Wrapper>
  );
};
