import { Interaction, Typography, Input } from "@polkadex/ux";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { unLockAccountValidations } from "@orderbook/core/validations";
import { KeyringPair } from "@polkadot/keyring/types";

import { Icons } from "@/components/ui";
import { ErrorMessage } from "@/components/ui/ReadyToUse";

export const Unlock = ({
  tempBrowserAccount,
  onAction,
}: {
  onAction: (account: KeyringPair, password?: string) => void;
  tempBrowserAccount?: KeyringPair;
}) => {
  const [error, setError] = useState("");
  const {
    setFieldValue,
    values,
    handleSubmit,
    errors,
    touched,
    dirty,
    isValid,
    isValidating,
    resetForm,
  } = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: unLockAccountValidations,
    onSubmit: async ({ password }) => {
      try {
        const pass = password.toString();
        tempBrowserAccount?.unlock(pass);
        if (tempBrowserAccount) {
          onAction(tempBrowserAccount, pass);
        }
      } catch (error) {
        setError("Invalid Password");
        resetForm();
      }
    },
  });

  useEffect(() => {
    if (!isValidating && dirty && isValid) handleSubmit();
  }, [dirty, handleSubmit, isValid, isValidating]);

  return (
    <form onSubmit={handleSubmit}>
      <Interaction className="bg-backgroundBase rounded-sm">
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
                <Typography.Paragraph appearance="primary" size="sm">
                  Enter 5-digit password to unlock your account
                </Typography.Paragraph>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full px-6">
              <Input.Passcode
                value={values.password}
                onValuesChange={(e) => setFieldValue("password", e)}
                className="flex-1 py-7"
                name="password"
              />

              {!!error && <ErrorMessage>Invalid password</ErrorMessage>}
            </div>
          </div>
        </Interaction.Content>
      </Interaction>
    </form>
  );
};
