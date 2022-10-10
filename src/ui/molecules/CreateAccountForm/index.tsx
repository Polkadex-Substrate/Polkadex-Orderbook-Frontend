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
                <WalletShortName
                  address={values.controllerWallet.address}
                  name={values.controllerWallet.name || "Select your controller wallet"}
                />
              </S.WalletSelectContainer>
              <S.WalletSelectArrow>
                <Icons.ArrowBottom />
              </S.WalletSelectArrow>
            </S.WalletSelectWrapper>
          </Dropdown.Trigger>
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
                <WalletShortName address={v?.account?.address} name={v.account.meta.name} />
              </Dropdown.Item>
            ))}
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

const WalletShortName = ({ name = "", address = "" }) => {
  const shortAddress = address?.slice(0, 12) + "..." + address?.slice(address?.length - 12);
  return (
    <S.DropdownHeader>
      {name}
      {!!address.length && <small> • {shortAddress}</small>}
    </S.DropdownHeader>
  );
};
