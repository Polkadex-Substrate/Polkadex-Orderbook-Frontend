import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Button, Interaction, Loading, Typography } from "@polkadex/ux";
import { useFormik } from "formik";
import {
  useWalletProvider,
  RegisterTradeAccountData,
} from "@orderbook/core/providers/user/walletProvider";
import { generateUsername } from "friendly-username-generator";

import { Input } from "../Input";
import {
  ErrorMessage,
  GenericInfoCard,
  OptionalField,
  GenericVerticalCard,
} from "../ReadyToUse";

const initialValues = {
  name: generateUsername({ useRandomNumber: false }),
};
const initialState = ["", "", "", "", ""];

export const NewTradingAccount = ({
  onClose,
  onAction,
  onRedirect,
}: {
  onClose: () => void;
  onAction: (value: RegisterTradeAccountData) => Promise<void>;
  onRedirect: () => void;
}) => {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(1);

  const { selectedWallet } = useWalletProvider(); // Testing provider
  const loading = false;

  const [state, setState] = useState<(string | number)[]>(initialState);
  const [error, setError] = useState("");

  const fundWalletPresent = useMemo(
    () => !!Object.keys(selectedWallet ?? {})?.length,
    [selectedWallet]
  );

  const {
    values,
    isValid,
    dirty,
    resetForm,
    setFieldValue,
    getFieldProps,
    handleSubmit,
  } = useFormik({
    initialValues,
    onSubmit: async ({ name }) => {
      const password = state.join("");

      try {
        await onAction({
          name,
          password,
          callbackFn: onRedirect,
        });
      } catch (error) {
        console.log("Error", error);
        setError((error as Error)?.message ?? error);
        resetForm();
      }
    },
  });

  console.log({
    name: values.name,
    state,
    dirty,
    isValid,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Interaction className="gap-10">
        <Interaction.Title onClose={onClose}>
          New trading account
        </Interaction.Title>
        <Interaction.Content className="flex flex-col gap-8 flex-1">
          <div className="flex flex-col gap-5 flex-1">
            <div>
              <Input.Vertical
                {...getFieldProps("name")}
                label="Account name"
                placeholder="Enter a name"
                action={() =>
                  setFieldValue(
                    "name",
                    generateUsername({ useRandomNumber: false })
                  )
                }
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
              <Loading active={loading}>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <GenericVerticalCard
                      title="Google Drive"
                      icon="GoogleDrive"
                      onSelect={() => setActive(0)}
                      disabled={loading}
                      buttonAction={(e) => {
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
                  {error && !loading && (
                    <ErrorMessage>
                      Ops! Something went wrong. Please try again
                    </ErrorMessage>
                  )}
                </div>
              </Loading>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <GenericInfoCard label="Your balance">2.9840201000</GenericInfoCard>
            <GenericInfoCard label="Fees">1 PDEX</GenericInfoCard>
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
  );
};
