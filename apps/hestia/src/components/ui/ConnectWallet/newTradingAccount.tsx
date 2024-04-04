"use client";

import { Fragment, MouseEvent, useMemo, useRef, useState } from "react";
import {
  Button,
  Input,
  Interaction,
  Loading,
  Typography,
  Passcode,
} from "@polkadex/ux";
import { useFormik } from "formik";
import { generateUsername } from "friendly-username-generator";
import { ExtensionsArray } from "@polkadot-cloud/assets/extensions";
import { mnemonicGenerate } from "@polkadot/util-crypto";
import { createAccountValidations } from "@orderbook/core/validations";
import { useCall, useTransactionFeeModal } from "@orderbook/core/hooks";
import { RiEyeOffLine, RiEyeLine } from "@remixicon/react";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";
import { getAddressFromMnemonic } from "@orderbook/core/helpers";

import {
  ErrorMessage,
  OptionalField,
  GenericVerticalCard,
} from "../ReadyToUse";

import { ConfirmTransaction } from "./confirmTransaction";
export interface RegisterTradeAccountData {
  password: string;
  name: string;
  mnemonic: string;
  assetId?: string;
}

const initialValues = {
  name: generateUsername({ useRandomNumber: false }),
  mnemonic: mnemonicGenerate(),
};
const initialState = "";

export const NewTradingAccount = ({
  onClose,
  onCreateAccount,
  onCreateCallback,
  fundWalletPresent,
  loading,
  selectedExtension,
  errorMessage,
  errorTitle,
}: {
  onClose: (e: MouseEvent<HTMLButtonElement>) => void;
  onCreateAccount: (value: RegisterTradeAccountData) => Promise<void>;
  onCreateCallback: () => void;
  loading?: boolean;
  balance?: number;
  fundWalletPresent?: boolean;
  errorTitle?: string;
  errorMessage?: string;
  selectedExtension?: (typeof ExtensionsArray)[0];
}) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [show, setShow] = useState(false);
  const [active, setActive] = useState(1);

  const isLoading = false;
  const error = false;
  const [state, setState] = useState(initialState);
  const { hasAccount } = useConnectWalletProvider();

  const {
    hasTokenFee,
    openFeeModal,
    onOpenFeeModal,
    setOpenFeeModal,
    tokenFee,
    setTokenFee,
  } = useTransactionFeeModal();

  const {
    values,
    isValid,
    resetForm,
    setFieldValue,
    getFieldProps,
    handleSubmit,
    errors,
  } = useFormik({
    initialValues,
    validationSchema: createAccountValidations,
    validateOnChange: true,
    onSubmit: async ({ name, mnemonic }) => {
      if (!hasTokenFee || (hasTokenFee && !openFeeModal)) onOpenFeeModal();
      else {
        try {
          const password = state?.replace(/\s+/g, "");
          await onCreateAccount({
            name,
            password: password.length === 5 ? password : "",
            mnemonic,
            assetId: tokenFee?.id,
          });
          onCreateCallback();
        } catch (error) {
          resetForm();
          setState(initialState);
        } finally {
          setOpenFeeModal(false);
        }
      }
    },
  });

  const { onAddProxyAccountOcex, onRegisterMainAccountOcex } = useCall();

  const proxyAccount = useMemo(
    () => getAddressFromMnemonic(values?.mnemonic),
    [values?.mnemonic]
  );

  return (
    <Fragment>
      <ConfirmTransaction
        action={() =>
          formRef?.current?.dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
          )
        }
        actionLoading={!!loading}
        extrinsicFn={() =>
          hasAccount
            ? onAddProxyAccountOcex([proxyAccount])
            : onRegisterMainAccountOcex([proxyAccount])
        }
        sender={proxyAccount}
        tokenFee={tokenFee}
        setTokenFee={setTokenFee}
        openFeeModal={openFeeModal}
        setOpenFeeModal={setOpenFeeModal}
      />
      <form onSubmit={handleSubmit} ref={formRef}>
        <Interaction className="w-full">
          <Interaction.Title onClose={{ onClick: onClose }}>
            New trading account
          </Interaction.Title>
          <Interaction.Content className="flex flex-col gap-3 flex-1">
            <div className="flex flex-col gap-5 flex-1">
              <div>
                <Input.Vertical
                  {...getFieldProps("name")}
                  placeholder="Enter a name"
                  className="max-sm:focus:text-[16px]"
                >
                  <Input.Label>Account name</Input.Label>
                  <Interaction.Action
                    appearance="secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      setFieldValue(
                        "name",
                        generateUsername({ useRandomNumber: false })
                      );
                    }}
                  >
                    Try again
                  </Interaction.Action>
                </Input.Vertical>
                <ErrorMessage withIcon={false}>{errors.name}</ErrorMessage>
              </div>
              <OptionalField label="Protected by password">
                <div className="flex items-center justify-between">
                  <Passcode.Outline
                    focusOnInit
                    type={show ? "password" : "text"}
                    value={state}
                    onValuesChange={(e) => setState(e)}
                  />
                  <Button.Icon
                    variant="ghost"
                    type="button"
                    onClick={() => setShow(!show)}
                  >
                    {show ? (
                      <RiEyeLine className="w-full h-full" />
                    ) : (
                      <RiEyeOffLine className="w-full h-full" />
                    )}
                  </Button.Icon>
                </div>
              </OptionalField>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <Typography.Text bold>
                    Store my trading account
                    <span className="opacity-30 text-xs"> (Recommended)</span>
                  </Typography.Text>
                  <Typography.Text appearance="primary">
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
    </Fragment>
  );
};
