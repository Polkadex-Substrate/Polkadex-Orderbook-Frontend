import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { generateUsername } from "friendly-username-generator";
import keyring from "@polkadot/ui-keyring";
import { mnemonicGenerate } from "@polkadot/util-crypto";

import { Switch } from "../Switcher";

import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";
import { Dropdown } from "@polkadex/orderbook/v3/ui/molecules";
import {
  registerMainAccountFetch,
  registerTradeAccountFetch,
  selectExtensionWalletAccounts,
  tradeAccountPush,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { createAccountValidations } from "@polkadex/orderbook/validations";

export const CreateAccountForm = ({
  onCancel = undefined,
  selectedAccountName = "",
  selectedAccountAddress = "",
  buttonTitle = "",
}) => {
  const dispatch = useDispatch();
  const controllerWallets = useReduxSelector(selectExtensionWalletAccounts);
  const hasData = !!selectedAccountAddress?.length;
  const {
    errors,
    values,
    setFieldValue,
    touched,
    handleSubmit,
    getFieldProps,
    isValid,
    dirty,
  } = useFormik({
    initialValues: {
      name: "",
      hasPasscode: false,
      passcode: "",
      isPasscodeVisible: false,
      controllerWallet: {
        name: selectedAccountName || "",
        address: selectedAccountAddress || "Select your controller wallet",
      },
    },
    validationSchema: createAccountValidations,
    onSubmit: ({ name, passcode, controllerWallet }) => {
      // TODO: Move to sagas
      if (hasData) {
        const mnemonic = mnemonicGenerate();
        const { pair } = keyring.addUri(mnemonic, passcode, {
          name,
        });
        dispatch(tradeAccountPush({ pair }));
        dispatch(
          registerMainAccountFetch({
            mainAccount: selectedAccountAddress,
            tradeAddress: pair.address,
            password: passcode,
          })
        );
      } else {
        dispatch(
          registerTradeAccountFetch({
            address: controllerWallet.address,
            name,
            password: String(passcode),
          })
        );
      }
    },
  });
  const IconComponent = Icons[values.isPasscodeVisible ? "Show" : "Hidden"];
  return (
    <form onSubmit={handleSubmit}>
      <S.Wrapper>
        <S.WalletSelect>
          <Dropdown>
            <Dropdown.Trigger>
              <S.WalletSelectWrapper
                hasError={
                  !!errors.controllerWallet?.name &&
                  !!touched.controllerWallet?.name &&
                  !!errors.controllerWallet?.name
                }>
                <S.WalletSelectContainer>
                  <S.WalletSelectContent>
                    <div>
                      <Icons.Info />
                    </div>
                    <span>Controller account</span>
                  </S.WalletSelectContent>
                  <WalletShortName
                    address={values.controllerWallet.address}
                    name={values.controllerWallet.name}
                    isFull={!values.controllerWallet.name}
                  />
                </S.WalletSelectContainer>
                {!selectedAccountAddress.length && (
                  <S.WalletSelectArrow>
                    <Icons.ArrowBottom />
                  </S.WalletSelectArrow>
                )}
              </S.WalletSelectWrapper>
            </Dropdown.Trigger>
            {!selectedAccountAddress.length && (
              <Dropdown.Menu fill="secondaryBackgroundSolid">
                {controllerWallets.map((v, i) => (
                  <Dropdown.Item
                    key={i}
                    onAction={() =>
                      setFieldValue("controllerWallet", {
                        name: v.account.meta.name,
                        address: v.account.address,
                      })
                    }>
                    <WalletShortName
                      address={v?.account?.address}
                      name={v.account.meta.name}
                    />
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            )}
          </Dropdown>
        </S.WalletSelect>
        <S.WalletName>
          <S.WalletNameWrapper>
            <div>
              <span>Wallet Name</span>
              <input
                {...getFieldProps("name")}
                name="name"
                type="text"
                placeholder="Enter a wallet name"
              />
            </div>
            <button
              type="button"
              onClick={() =>
                setFieldValue("name", generateUsername({ useRandomNumber: false }))
              }>
              Random
            </button>
          </S.WalletNameWrapper>
          <S.WalletError isNegative={values.name.length >= 31}>
            {errors.name && touched.name && errors.name ? <p>{errors.name}</p> : <div />}
            <small>
              <strong>{values.name.length}</strong>/30
            </small>
          </S.WalletError>
        </S.WalletName>
        <S.Password>
          <S.PasswordWrapper>
            <S.PasswordHeader>
              <span>Protect by password</span>
              <Switch
                isActive={values.hasPasscode}
                onChange={() => {
                  setFieldValue("hasPasscode", !values.hasPasscode);
                  setFieldValue("passcode", "");
                }}
              />
            </S.PasswordHeader>
            {values.hasPasscode && (
              <S.PasswordFooter>
                <input
                  {...getFieldProps("passcode")}
                  type={values.isPasscodeVisible ? "password" : "text"}
                  placeholder="(Optional) Enter a password"
                />
                <button
                  type="button"
                  onClick={() =>
                    setFieldValue("isPasscodeVisible", !values.isPasscodeVisible)
                  }>
                  <IconComponent />
                </button>
              </S.PasswordFooter>
            )}
          </S.PasswordWrapper>
          <S.Error> {errors.passcode && touched.passcode && errors.passcode}</S.Error>
        </S.Password>
        <S.Footer>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" disabled={!(isValid && dirty)}>
            {buttonTitle}
          </button>
        </S.Footer>
      </S.Wrapper>
    </form>
  );
};

const WalletShortName = ({ name = "", address = "", isFull = false }) => {
  const shortAddress = address?.slice(0, 12) + "..." + address?.slice(address?.length - 12);
  return (
    <S.DropdownHeader>
      {name}
      {!!address.length && <small> • {isFull ? address : shortAddress}</small>}
    </S.DropdownHeader>
  );
};
