import { useState } from "react";
import { Interaction, Loading, Input, Button, Typography } from "@polkadex/ux";
import { useFormik } from "formik";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { generateUsername } from "friendly-username-generator";
import { importAccountValidations } from "@orderbook/core/validations";

import { OptionalField } from "../ReadyToUse";

const initialValues = {
  mnemonic: "",
  name: generateUsername({ useRandomNumber: false }),
};

const initialState = ["", "", "", "", ""];

type ImportFromMnemonic = {
  mnemonic: string;
  name: string;
  password: string;
};

export const ImportTradingAccountMnemonic = ({
  loading,
  onImport,
  onCancel,
  errorMessage,
}: {
  loading: boolean;
  onImport: (value: ImportFromMnemonic) => void;
  onCancel: () => void;
  errorMessage: string;
}) => {
  const [show, setShow] = useState(false);
  const [state, setState] = useState<(string | number)[]>(initialState);

  const {
    isValid,
    dirty,
    getFieldProps,
    handleSubmit,
    setFieldValue,
    errors,
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema: importAccountValidations,
    validateOnChange: true,
    onSubmit: async (values) => {
      const password = state.join("");
      onImport({
        ...values,
        password: password.length === 5 ? password : "",
      });
    },
  });

  return (
    <Loading.Spinner active={loading || isSubmitting}>
      <form onSubmit={handleSubmit}>
        <Interaction>
          <Interaction.Title onClose={onCancel}>
            Import Account
          </Interaction.Title>
          <Interaction.Content className="flex flex-col gap-1 flex-1">
            <div className="flex flex-col gap-5 flex-1">
              <Input.Vertical
                {...getFieldProps("mnemonic")}
                label="12-word mnemonic seed"
                placeholder="Enter a mnemonic here..."
                autoComplete="off"
              />
              {errors.mnemonic && (
                <Typography.Text size="xs" variant="danger" className="-my-2">
                  {errors.mnemonic}
                </Typography.Text>
              )}
              <Input.Vertical
                {...getFieldProps("name")}
                label="Account name"
                placeholder="Enter a name"
                action={(e) => {
                  e.preventDefault();
                  setFieldValue(
                    "name",
                    generateUsername({ useRandomNumber: false })
                  );
                }}
                actionTitle="Random"
                autoComplete="off"
              />
              {errors.name && (
                <Typography.Text size="xs" variant="danger" className="-my-2">
                  {errors.name}
                </Typography.Text>
              )}
              <OptionalField label="Protected by password">
                <div className="flex items-center justify-between">
                  <Input.Passcode
                    focusOnInit
                    type={show ? "password" : "text"}
                    values={state}
                    onValuesChange={setState}
                    className="bg-level-4"
                  />
                  <Button.Icon
                    variant="ghost"
                    type="button"
                    onClick={() => setShow(!show)}
                  >
                    {show ? <EyeIcon /> : <EyeSlashIcon />}
                  </Button.Icon>
                </div>
              </OptionalField>
            </div>
          </Interaction.Content>
          <Interaction.Footer>
            <Typography.Text size="sm" variant="danger">
              {errorMessage}
            </Typography.Text>
            <Interaction.Action
              type="submit"
              className="flex-1"
              disabled={!(isValid && dirty)}
            >
              Import account
            </Interaction.Action>
            <Interaction.Close onClick={onCancel}>Cancel</Interaction.Close>
          </Interaction.Footer>
        </Interaction>
      </form>
    </Loading.Spinner>
  );
};
