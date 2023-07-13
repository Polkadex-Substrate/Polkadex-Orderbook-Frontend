import { useFormik } from "formik";
import { generateUsername } from "friendly-username-generator";
import keyring from "@polkadot/ui-keyring";
import { mnemonicGenerate } from "@polkadot/util-crypto";
import { useTranslation } from "react-i18next";

import { Switch } from "../Switcher";

import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";
import { Dropdown } from "@polkadex/orderbook-ui/molecules";
import { createAccountValidations } from "@polkadex/orderbook/validations";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useExtensionWallet } from "@polkadex/orderbook/providers/user/extensionWallet";
import { useTradeWallet } from "@polkadex/orderbook/providers/user/tradeWallet";

export const CreateAccountForm = ({
  onCancel = undefined,
  selectedAccountName = "",
  selectedAccountAddress = "",
  buttonTitle = "",
}) => {
  const { t: translation } = useTranslation("molecules");
  const t = (key: string) => translation(`createAccountForm.${key}`);

  const profileState = useProfile();
  const extensionWalletState = useExtensionWallet();
  const tradeWalletState = useTradeWallet();
  const controllerWallets = extensionWalletState.allAccounts;
  const linkedMainAddresses = profileState.userData?.mainAccounts;
  const registeredAccounts = controllerWallets?.filter(({ account }) =>
    linkedMainAddresses?.includes(account.address)
  );
  const hasData = !!selectedAccountAddress?.length;
  const initialMessage = registeredAccounts?.length
    ? t("selectFundingAccount")
    : t("registerAccountFirst");

  const { onRegisterMainAccount } = useExtensionWallet();

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
        address: hasData ? selectedAccountAddress : "",
      },
    },
    validationSchema: createAccountValidations,
    onSubmit: ({ name, passcode, controllerWallet }) => {
      // TODO: Move to hook
      if (hasData) {
        // if controller account is already selected then register main account called.
        const mnemonic = mnemonicGenerate();
        const { pair } = keyring.addUri(mnemonic, passcode.length > 0 ? passcode : null, {
          name,
        });
        tradeWalletState.onTradeAccountPush({ pair });
        onRegisterMainAccount({
          mainAccount: selectedAccountAddress,
          tradeAddress: pair.address,
          password: passcode,
          mnemonic,
        });
      } else {
        tradeWalletState.onRegisterTradeAccount({
          address: controllerWallet.address,
          name,
          password: String(passcode),
          allAccounts: extensionWalletState.allAccounts,
        });
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
                    <span>{t("fundingAccount")}</span>
                  </S.WalletSelectContent>
                  <WalletShortName
                    address={values.controllerWallet?.address}
                    name={values.controllerWallet?.name || initialMessage}
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
            {!selectedAccountAddress.length && registeredAccounts?.length > 0 && (
              <Dropdown.Menu fill="secondaryBackgroundSolid">
                {registeredAccounts?.map((v, i) => (
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
              <span>{t("tradeAccountName")}</span>
              <input
                {...getFieldProps("name")}
                type="text"
                placeholder={t("tradeAccountPlaceholder")}
              />
            </div>
            <button
              type="button"
              onClick={() =>
                setFieldValue("name", generateUsername({ useRandomNumber: false }))
              }>
              {t("random")}
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
              <span>{t("protectByPassword")}</span>
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
                  type={values.isPasscodeVisible ? "text" : "password"}
                  placeholder={t("passwordPlaceholder")}
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
            {t("cancel")}
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
