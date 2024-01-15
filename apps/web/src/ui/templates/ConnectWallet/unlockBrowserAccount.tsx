import { Interaction, Typography } from "@polkadex/ux";
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { PassCode } from "@polkadex/orderbook-ui/molecules";
import { unLockAccountValidations } from "@orderbook/core/validations";
import { KeyringPair } from "@polkadot/keyring/types";

import { ErrorMessage } from "../ReadyToUse";

import { Icons } from "@/ui/atoms";

export const UnlockBrowserAccount = ({
  onClose,
  tempBrowserAccount,
  onAction,
  onResetTempBrowserAccount,
}: {
  onClose: () => void;
  onAction: (account: KeyringPair, password?: string) => void;
  tempBrowserAccount?: KeyringPair;
  onResetTempBrowserAccount: () => void;
}) => {
  const [error, setError] = useState("");
  const handleClose = () => {
    onResetTempBrowserAccount();
    onClose();
  };
  const { setFieldValue, values, handleSubmit, isValid, dirty, resetForm } =
    useFormik({
      initialValues: {
        password: "",
      },
      validationSchema: unLockAccountValidations,
      onSubmit: async ({ password }) => {
        try {
          tempBrowserAccount?.unlock(password);
          if (tempBrowserAccount) {
            onAction(tempBrowserAccount, password);
            handleClose();
          }
        } catch (error) {
          setError("Invalid Password");
          resetForm();
        }
      },
    });

  const digitsLeft = useMemo(
    () => 5 - Array.from(String(values.password), (v) => Number(v)).length,
    [values]
  );

  const message =
    isValid && dirty
      ? "Unlock"
      : `${digitsLeft} digit${digitsLeft > 1 ? "s" : ""} left`;

  useEffect(() => {
    if (error && !!values.password) setError("");
  }, [error, values.password]);

  return (
    <form onSubmit={handleSubmit}>
      <Interaction>
        <Interaction.Content className="flex flex-col gap-1 flex-1">
          <div className="flex flex-col gap-8 items-center">
            <div className="flex flex-col text-center items-center gap-5">
              <div className="flex items-center justify-center rounded-full w-12 h-12 bg-level-2">
                <Icons.Lock className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-center items-center gap-1">
                <Typography.Text bold size="xl">
                  Unlock trading account
                </Typography.Text>
                <Typography.Paragraph variant="primary">
                  Enter 5-digit password to unlock your account
                </Typography.Paragraph>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <PassCode
                numInputs={5}
                onChange={(e) => setFieldValue("password", e)}
                value={values.password}
                name="password"
              />
              {!!error && <ErrorMessage>{error}</ErrorMessage>}
            </div>
          </div>
        </Interaction.Content>
        <Interaction.Footer>
          <Interaction.Action type="submit" disabled={!(isValid && dirty)}>
            {message}
          </Interaction.Action>
          <Interaction.Close onClick={handleClose}>Cancel</Interaction.Close>
        </Interaction.Footer>
      </Interaction>
    </form>
  );
};
