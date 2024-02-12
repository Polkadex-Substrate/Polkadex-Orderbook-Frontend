// TODO: Create a component (Input.Mnemonic) in @polkadex/ux.
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

const initialState = "";

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
  const [state, setState] = useState(initialState);

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
      onImport({
        ...values,
        password: state.length === 5 ? state : "",
      });
    },
  });

  return (
    <Loading.Spinner active={loading || isSubmitting}>
      <form onSubmit={handleSubmit}>
        <Interaction className="bg-backgroundBase rounded-sm">
          <Interaction.Title onClose={onCancel} size="lg">
            Import Account
          </Interaction.Title>
          <Interaction.Content className="flex flex-col gap-1 flex-1">
            <div className="flex flex-col gap-5 flex-1">
              <Input.Vertical
                {...getFieldProps("mnemonic")}
                placeholder="Enter a mnemonic here..."
                autoComplete="off"
              >
                <Input.Label>12-word mnemonic seed</Input.Label>
              </Input.Vertical>
              {errors.mnemonic && (
                <Typography.Text
                  size="xs"
                  appearance="danger"
                  className="-my-2"
                >
                  {errors.mnemonic}
                </Typography.Text>
              )}
              <Input.Vertical
                {...getFieldProps("name")}
                placeholder="Enter a name"
                autoComplete="off"
              >
                <Input.Label>Account name</Input.Label>
                <Input.Action
                  onClick={(e) => {
                    e.preventDefault();
                    setFieldValue(
                      "name",
                      generateUsername({ useRandomNumber: false })
                    );
                  }}
                >
                  Random
                </Input.Action>
              </Input.Vertical>
              {errors.name && (
                <Typography.Text
                  size="xs"
                  appearance="danger"
                  className="-my-2"
                >
                  {errors.name}
                </Typography.Text>
              )}
              <OptionalField label="Protected by password">
                <div className="flex items-center justify-between">
                  <Input.Passcode
                    focusOnInit
                    type={show ? "password" : "text"}
                    value={state}
                    onValuesChange={(e) => setState(e)}
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
            <Typography.Text size="sm" appearance="danger">
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
