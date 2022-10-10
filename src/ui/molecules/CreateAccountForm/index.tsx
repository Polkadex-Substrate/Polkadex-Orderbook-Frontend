import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { generateUsername } from "friendly-username-generator";

import { Switch } from "../Switcher";

import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";
import { Dropdown } from "@polkadex/orderbook/v3/ui/molecules";
import {
  registerTradeAccountFetch,
  selectExtensionWalletAccounts,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";

export const CreateAccountForm = ({ onCancel = undefined }) => {
  const dispatch = useDispatch();
  const controllerWallets = useReduxSelector(selectExtensionWalletAccounts);

  const { values, setFieldValue, touched, handleSubmit, errors, getFieldProps, isValid } =
    useFormik({
      initialValues: {
        name: "",
        hasPasscode: false,
        passcode: "",
        isPasscodeVisible: false,
        controllerWallet: {
          name: "",
          address: "",
        },
      },
      onSubmit: (values) => {
        // dispatch(
        //   registerTradeAccountFetch({
        //     name: values.name,
        //     password: String(values.passcode),
        //     mnemonic: [""],
        //   })
        // );
      },
    });
  const IconComponent = Icons[values.isPasscodeVisible ? "Show" : "Hidden"];

  console.log(values);
  return (
    <S.Wrapper>
      <S.WalletSelect>
        <Dropdown>
          <Dropdown.Trigger>
            <S.WalletSelectWrapper>
              <S.WalletSelectContainer>
                <S.WalletSelectContent>
                  <div>
                    <Icons.Info />
                  </div>
                  <span>Controller account</span>
                </S.WalletSelectContent>
                <p>
                  {values.controllerWallet.name || "Select your controller wallet"}
                  {values.controllerWallet.address && (
                    <strong> • {values.controllerWallet.address}</strong>
                  )}
                </p>
              </S.WalletSelectContainer>
              <S.WalletSelectArrow>
                <Icons.ArrowBottom />
              </S.WalletSelectArrow>
            </S.WalletSelectWrapper>
          </Dropdown.Trigger>
          <Dropdown.Menu fill="secondaryBackgroundSolid">
            {controllerWallets.map((v, i) => {
              const shortAddress =
                v?.account?.address?.slice(0, 12) +
                "..." +
                v?.account?.address?.slice(v?.account?.address?.length - 12);
              return (
                <Dropdown.Item key={i}>
                  <S.DropdownHeader>
                    {v.account.meta.name}
                    <small> • {shortAddress}</small>
                  </S.DropdownHeader>
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
        <small>18/30</small>
      </S.WalletSelect>
      <S.WalletName>
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
          onClick={() => setFieldValue("name", generateUsername({ useRandomNumber: false }))}>
          Random
        </button>
      </S.WalletName>
      <S.Password>
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
              onClick={() => setFieldValue("isPasscodeVisible", !values.isPasscodeVisible)}>
              <IconComponent />
            </button>
          </S.PasswordFooter>
        )}
      </S.Password>
      <S.Footer>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">Create Account</button>
      </S.Footer>
    </S.Wrapper>
  );
};
