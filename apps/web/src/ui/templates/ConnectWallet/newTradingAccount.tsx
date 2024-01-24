import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Button, Input, Interaction, Loading, Typography } from "@polkadex/ux";
import { useFormik } from "formik";
import { generateUsername } from "friendly-username-generator";
import { ExtensionsArray } from "@polkadot-cloud/assets/extensions";
import { mnemonicGenerate } from "@polkadot/util-crypto";

import {
  ErrorMessage,
  GenericInfoCard,
  OptionalField,
  GenericVerticalCard,
} from "../ReadyToUse";
export interface RegisterTradeAccountData {
  password: string;
  name: string;
  mnemonic: string;
}

const initialValues = {
  name: generateUsername({ useRandomNumber: false }),
};
const initialState = ["", "", "", "", ""];

export const NewTradingAccount = ({
  onClose,
  onCreateAccount,
  onCreateCallback,
  fundWalletPresent,
  loading,
  balance = 0,
  fee = 1,
  selectedExtension,
  errorMessage,
  errorTitle,
}: {
  onClose: () => void;
  onCreateAccount: (value: RegisterTradeAccountData) => Promise<void>;
  onCreateCallback: () => void;
  loading?: boolean;
  balance?: number;
  fee?: number;
  fundWalletPresent?: boolean;
  errorTitle?: string;
  errorMessage?: string;
  selectedExtension?: (typeof ExtensionsArray)[0];
}) => {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(1);

  const isLoading = false;
  const error = false;
  const [state, setState] = useState<(string | number)[]>(initialState);

  const { isValid, resetForm, setFieldValue, getFieldProps, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: async ({ name }) => {
        try {
          const password = state.join("");
          const mnemonic = mnemonicGenerate();
          await onCreateAccount({
            name,
            password: password.length === 5 ? password : "",
            mnemonic,
          });
          onCreateCallback();
        } catch (error) {
          resetForm();
          setState(initialState);
        }
      },
    });

  return (
    <Loading.Processing
      logo={selectedExtension?.id as string}
      active={!!loading}
      errorTitle={errorTitle}
      errorMessage={errorMessage}
    >
      <form onSubmit={handleSubmit}>
        <Interaction>
          <Interaction.Title onClose={onClose}>
            New trading account
          </Interaction.Title>
          <Interaction.Content className="flex flex-col gap-3 flex-1">
            <div className="flex flex-col gap-5 flex-1">
              <div>
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
                />
              </div>
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
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <Typography.Text bold>
                    Store my trading account
                    <span className="opacity-30 text-xs"> (Recommended)</span>
                  </Typography.Text>
                  <Typography.Text variant="primary">
                    Trade freely without the need for your extension.
                  </Typography.Text>
                </div>
                <Loading.Spinner active={isLoading}>
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                      <GenericVerticalCard
                        title="Google Drive"
                        icon="GoogleDrive"
                        onSelect={() => setActive(0)}
                        disabled
                        buttonAction={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.alert("Clicked");
                        }}
                        buttonTitle="Connect"
                        checked={active === 0}
                      />
                      <GenericVerticalCard
                        title="Browser"
                        icon="Device"
                        onSelect={() => setActive(1)}
                        checked={active === 1}
                      />
                    </div>
                    {error && !isLoading && (
                      <ErrorMessage>
                        Ops! Something went wrong. Please try again
                      </ErrorMessage>
                    )}
                  </div>
                </Loading.Spinner>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <GenericInfoCard label="Your balance">
                {balance} PDEX
              </GenericInfoCard>
              <GenericInfoCard label="Transaction fee">
                {fee} PDEX
              </GenericInfoCard>
            </div>
          </Interaction.Content>
          <Interaction.Footer>
            <Interaction.Action
              type="submit"
              disabled={!isValid || !fundWalletPresent}
            >
              Create trading account
            </Interaction.Action>
            <Interaction.Close onClick={onClose}>Close</Interaction.Close>
          </Interaction.Footer>
        </Interaction>
      </form>
    </Loading.Processing>
  );
};
