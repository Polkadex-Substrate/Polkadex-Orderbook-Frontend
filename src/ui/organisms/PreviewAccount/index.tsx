import { useCallback, useMemo, useRef, useState } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

import { UnlockAccount } from "../UnlockAccount";

import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";
import {
  Loading,
  Switch,
  Tooltip,
  TooltipContent,
  TooltipHeader,
  Dropdown,
  Modal,
  RemoveFromDevice,
  RemoveFromBlockchain,
} from "@polkadex/orderbook-ui/molecules";
import { selectTradeAccount } from "@polkadex/orderbook/providers/user/tradeWallet/helper";
import { useTryUnlockTradeAccount } from "@polkadex/orderbook-hooks";
import { transformAddress } from "@polkadex/orderbook/providers/user/profile/helpers";
import { IUserTradeAccount } from "@polkadex/orderbook/hooks/types";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useTradeWallet } from "@polkadex/orderbook/providers/user/tradeWallet";
import { useExtensionWallet } from "@polkadex/orderbook/providers/user/extensionWallet";

type Props = {
  onClose: () => void;
  selected: IUserTradeAccount;
  mainAccAddress: string;
};

enum menuDisableKeysEnum {
  REMOVE_FROM_BLOCKCHAIN = 1,
  REMOVE_FROM_BROWSER,
}

export const PreviewAccount = ({ onClose = undefined, selected, mainAccAddress }: Props) => {
  const {
    onExportTradeAccount,
    onRemoveProxyAccountFromChain,
    onRemoveTradeAccountFromBrowser,
    onExportTradeAccountActive,
    allBrowserAccounts,
    removesInLoading,
    exportAccountLoading,
  } = useTradeWallet();
  const [remove, setRemove] = useState<{
    isRemoveDevice: boolean;
    status: boolean;
    name?: string;
  }>({
    isRemoveDevice: false,
    status: false,
  });

  const extensionWalletState = useExtensionWallet();

  const mainAccountDetails =
    mainAccAddress &&
    extensionWalletState.allAccounts?.find(
      ({ account }) => account?.address?.toLowerCase() === mainAccAddress?.toLowerCase()
    );

  const tradingAccountInBrowser = selectTradeAccount(selected?.address, allBrowserAccounts);
  useTryUnlockTradeAccount(tradingAccountInBrowser);
  const { selectedAccount: usingAccount } = useProfile();
  const isRemoveFromBlockchainLoading = removesInLoading.includes(selected?.address);

  const showProtectedPassword = exportAccountLoading;
  const using = usingAccount.tradeAddress === selected?.address;
  const { onUserSelectAccount } = useProfile();

  const menuDisableKeys = () => {
    const disableKeysList = [];
    if (!mainAccountDetails)
      disableKeysList.push(`${menuDisableKeysEnum.REMOVE_FROM_BLOCKCHAIN}`);

    if (!tradingAccountInBrowser)
      disableKeysList.push(`${menuDisableKeysEnum.REMOVE_FROM_BROWSER}`);

    return disableKeysList;
  };

  const shouldShowProtectedPassword = useMemo(
    () => tradingAccountInBrowser?.isLocked && showProtectedPassword,
    [tradingAccountInBrowser, showProtectedPassword]
  );

  const handleExportAccount = useCallback(() => {
    tradingAccountInBrowser?.isLocked
      ? onExportTradeAccountActive()
      : onExportTradeAccount({ address: selected?.address });
  }, [selected, tradingAccountInBrowser]);
  const handleClose = () =>
    setRemove({
      ...remove,
      status: false,
    });
  const handleOpenRemove = (isDevice = true, name = "") =>
    setRemove({
      isRemoveDevice: !!isDevice,
      status: true,
      name,
    });

  const { t: translation } = useTranslation("organisms");
  const { t: tc } = useTranslation("common");
  const t = (key: string) => translation(`previewWallet.${key}`);

  return (
    <>
      <Modal open={remove.status} onClose={handleClose}>
        <Modal.Body>
          {remove.isRemoveDevice ? (
            <RemoveFromDevice
              onAction={() => {
                onRemoveTradeAccountFromBrowser(selected?.address);
                handleClose();
              }}
              onClose={handleClose}
            />
          ) : (
            <RemoveFromBlockchain
              name={remove?.name}
              onClose={handleClose}
              onAction={() => {
                onRemoveProxyAccountFromChain({
                  address: selected?.address,
                  allAccounts: extensionWalletState.allAccounts,
                });
                handleClose();
              }}
            />
          )}
        </Modal.Body>
      </Modal>
      <Loading
        isVisible={isRemoveFromBlockchainLoading}
        message={tc("blockFinalizationMessage")}
        spinner="Keyboard">
        <S.Main>
          {shouldShowProtectedPassword ? (
            <S.UnlockAccount>
              <UnlockAccount
                onSubmit={({ password }) =>
                  onExportTradeAccount({ address: selected.address, password })
                }
                handleClose={() => onExportTradeAccountActive()}
              />
            </S.UnlockAccount>
          ) : (
            <>
              <S.Header
                type="button"
                onClick={isRemoveFromBlockchainLoading ? undefined : onClose}>
                <Icons.SingleArrowLeft />
              </S.Header>
              <S.Content>
                <h2>{t("title")}</h2>
                <S.Container>
                  <S.Box>
                    <WalletName
                      label={t("walletLabel")}
                      information={String(
                        selected?.account?.meta?.name || t("accountNotPresent")
                      )}
                    />
                    <WalletAddress
                      label={t("tradeWalletLabel")}
                      information={selected?.address}
                    />
                    <WalletAddress
                      label={t("fundingWalletLabel")}
                      information={
                        mainAccountDetails
                          ? mainAccountDetails?.account?.meta?.name
                          : t("fundingAccountPresent")
                      }
                      informationDisabled
                      additionalInformation={
                        mainAccountDetails ? transformAddress(mainAccAddress) : ""
                      }
                      isLocked
                    />
                    <ProtectedByPassword
                      label={t("protectedPassword")}
                      isActive={tradingAccountInBrowser?.isLocked}
                    />
                    <DefaultAccount
                      label={t("defaultTradeAccount")}
                      tradeAddress={selected?.address}
                    />
                  </S.Box>
                  {tradingAccountInBrowser && (
                    <S.Button
                      disabled={!tradingAccountInBrowser}
                      onClick={() => onUserSelectAccount({ tradeAddress: selected?.address })}
                      type="button">
                      {using ? t("using") : t("use")}
                    </S.Button>
                  )}
                </S.Container>
              </S.Content>
              <S.Footer>
                <S.ExportButton
                  disabled={!tradingAccountInBrowser || !mainAccountDetails}
                  type="button"
                  onClick={handleExportAccount}>
                  {t("export")}
                </S.ExportButton>
                <Dropdown>
                  <Dropdown.Trigger>
                    <S.DropdownButton type="button">
                      {t("removeAccount")}
                      <div>
                        <Icons.ArrowBottom />
                      </div>
                    </S.DropdownButton>
                  </Dropdown.Trigger>
                  <Dropdown.Menu
                    fill="secondaryBackgroundSolid"
                    disabledKeys={menuDisableKeys()}>
                    <Dropdown.Item
                      key={"1"}
                      onAction={() =>
                        handleOpenRemove(false, selected?.account?.meta?.name as string)
                      }>
                      {t("removefromBlockchain")}
                    </Dropdown.Item>
                    <Dropdown.Item key={"2"} onAction={() => handleOpenRemove()}>
                      {t("removeFromDevice")}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </S.Footer>
            </>
          )}
        </S.Main>
      </Loading>
    </>
  );
};

const WalletName = ({ label = "", information = "" }) => {
  const [state, setState] = useState(false);

  const { values, touched, errors, handleSubmit } = useFormik({
    initialValues: {
      name: information,
    },
    onSubmit: (values) => {
      // console.log(values);
      setState(!state);
    },
  });
  return state ? (
    <form onSubmit={handleSubmit}>
      <S.Card>
        <S.CardWrapper>
          <S.CardContent>
            <span>{label}</span>
            <S.CardInfo>
              <input
                name="name"
                type="text"
                placeholder="Enter a name for your trading account"
                defaultValue={values.name}
              />
            </S.CardInfo>
          </S.CardContent>
          <S.Actions isActive={state}>
            <button type="submit">Save</button>
          </S.Actions>
        </S.CardWrapper>
        <strong>{errors.name && touched.name && errors.name} 18/30</strong>
      </S.Card>
    </form>
  ) : (
    <S.Card>
      <S.CardWrapper>
        <S.CardContent>
          <span>{label}</span>
          <S.CardInfo>
            <p>{information}</p>
          </S.CardInfo>
        </S.CardContent>
      </S.CardWrapper>
    </S.Card>
  );
};

const WalletAddress = ({
  label = "",
  information = "",
  additionalInformation = "",
  isLocked = false,
  informationDisabled = false,
}) => {
  const { t: translation } = useTranslation("organisms");
  const t = (key: string) => translation(`previewWallet.${key}`);

  const buttonRef = useRef(null);
  const handleOnMouseOut = () => (buttonRef.current.innerHTML = t("copyToClipBoard"));

  const handleCopy = async () => {
    await navigator.clipboard.writeText(information);
    buttonRef.current.innerHTML = t("copied");
  };

  return (
    <S.CardWrapper>
      <S.CardContent>
        <S.CardBox>
          <span>{label}</span>
          {isLocked && (
            <S.Icon>
              <Icons.Lock />
            </S.Icon>
          )}
        </S.CardBox>
        <S.CardInfo>
          {!informationDisabled && (
            <Tooltip>
              <TooltipHeader>
                <button type="button" onClick={handleCopy} onMouseOut={handleOnMouseOut}>
                  <Icons.Copy />
                </button>
              </TooltipHeader>
              <TooltipContent>
                <span ref={buttonRef} style={{ whiteSpace: "nowrap" }}>
                  {t("copyToClipBoard")}
                </span>
              </TooltipContent>
            </Tooltip>
          )}
          <p>
            {information}
            {!!additionalInformation.length && <small> • {additionalInformation}</small>}
          </p>
        </S.CardInfo>
      </S.CardContent>
    </S.CardWrapper>
  );
};

const ProtectedByPassword = ({ label = "", isActive = false }) => {
  const IconComponent = Icons[isActive ? "Verified" : "Close"];
  return (
    <S.CardWrapper>
      <S.CardContent>
        <S.CardBox>
          <span>{label}</span>
          <div>
            <Icons.Lock />
          </div>
        </S.CardBox>
      </S.CardContent>
      <S.Verified isActive={isActive}>
        <IconComponent />
      </S.Verified>
    </S.CardWrapper>
  );
};

const DefaultAccount = ({ label = "", tradeAddress }) => {
  const profileState = useProfile();
  const defaultTradeAddress = profileState.defaultTradeAccount;
  const isActive = tradeAddress === defaultTradeAddress;

  const handleChange = () =>
    !isActive
      ? profileState.onUserSetDefaultTradeAccount(tradeAddress)
      : profileState.onUserSetDefaultTradeAccount(null);

  return (
    <S.CardWrapper>
      <S.CardContent>
        <span>{label}</span>
      </S.CardContent>
      <Switch isActive={isActive} onChange={handleChange} />
    </S.CardWrapper>
  );
};
