import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import {
  CreateAccountForm,
  ImportAccountForm,
  Loading,
  SuccessCreateAccount,
} from "@polkadex/orderbook-ui/molecules";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { useExtensionWallet } from "@orderbook/core/providers/user/extensionWallet";
import { useTradeWallet } from "@orderbook/core/providers/user/tradeWallet";

import * as S from "./styles";

const data = [
  {
    title: "Add trading account",
    description:
      "Polkadex is a fully non-custodial platform, so the assets in your wallet are always under your control. All data is stored in your browser.",
    button: "Create account",
  },
  {
    title: "Register account",
    description:
      "Trading accounts allow you to deposit funds to Orderbook, trade and withdraw funds to your Polkadex account.",
    button: "Register and create account",
  },
];
const successData = [
  {
    title: "Trade account created",
    description:
      "Now you can operate in orderbook, receive deposits and make withdrawals.",
  },
  {
    title: "Funding account registered",
    description:
      "You have successfully registered a Funding account and created a Trading account. Use your Trading account and start trading. You can add up to three trading accounts linked to a funding account.",
  },
];
type Props = {
  onClose: () => void;
  selected?: {
    name: string;
    address: string;
  };
  isLoading?: boolean;
};

export const NewAccount = ({
  onClose = undefined,
  selected,
  isLoading = false,
}: Props) => {
  const handleCancel = (value: boolean, isImport: boolean) =>
    setState({ status: value, isImport: isImport });

  const tradeWalletState = useTradeWallet();

  const tradeInfo = tradeWalletState.registerAccountModal;

  const profileState = useProfile();
  const extensionWalletState = useExtensionWallet();

  const [state, setState] = useState({
    status: tradeInfo.defaultImportActive,
    isImport: false,
  });

  const isTradeAccountSuccess = tradeWalletState.registerAccountSuccess;
  const isControllerAccountSuccess =
    extensionWalletState.registerMainAccountSuccess;
  const isImportAccountSuccess = tradeWalletState.importAccountSuccess;

  const hasData = !!selected?.address?.length;
  const information = data[hasData ? 1 : 0];
  const hasExtensionAccounts = extensionWalletState.allAccounts?.length > 0;
  const hasLinkedAccounts = profileState.userData?.mainAccounts?.length > 0;
  const shouldShowCreateAccount = (state.status && state.isImport) || hasData;
  const successInformation = successData[isControllerAccountSuccess ? 1 : 0];

  const { t: translation } = useTranslation("organisms");
  const t = (key: string) => translation(`newAccount.${key}`);

  return (
    <S.Main>
      <S.Header type="button" onClick={onClose}>
        <Icons.SingleArrowLeft />
      </S.Header>
      <Loading
        isVisible={isLoading}
        hasBg={false}
        message=""
        spinner="Keyboard"
      >
        <S.Content>
          {isTradeAccountSuccess || isControllerAccountSuccess ? (
            <SuccessCreateAccount
              title={
                isImportAccountSuccess
                  ? t("newAccountImported")
                  : successInformation.title
              }
              description={
                isImportAccountSuccess
                  ? successData[0].description
                  : successInformation.description
              }
              mnemonic={tradeInfo?.mnemonic}
              account={tradeInfo?.account}
            />
          ) : (
            <>
              <S.Title>
                <h2>{information.title}</h2>
                <p>{information.description}</p>
              </S.Title>
              <S.Container>
                <S.Box>
                  <Card
                    label={t("createNewTradingAccount.label")}
                    description={t("createNewTradingAccount.description")}
                    icon="AddWallet"
                    isActive={
                      hasExtensionAccounts && (!state.status || state.isImport)
                    }
                    handleChange={
                      hasData
                        ? undefined
                        : () => handleCancel(!state.status, true)
                    }
                  >
                    {shouldShowCreateAccount && (
                      <CreateAccountForm
                        onCancel={
                          hasData
                            ? onClose
                            : () => handleCancel(!state.status, true)
                        }
                        selectedAccountName={selected?.name}
                        selectedAccountAddress={selected?.address}
                        buttonTitle={information.button}
                      />
                    )}
                  </Card>
                  {!hasData && (
                    <Card
                      label={t("importExistingTradingAccount.label")}
                      description={t(
                        "importExistingTradingAccount.description",
                      )}
                      icon="AddMore"
                      isActive={
                        hasLinkedAccounts && (!state.status || !state.isImport)
                      }
                      handleChange={() => handleCancel(!state.status, false)}
                    >
                      {state.status && !state.isImport && (
                        <ImportAccountForm
                          onCancel={() => handleCancel(!state.status, true)}
                          defaultImportJson={tradeInfo.defaultImportActive}
                        />
                      )}
                    </Card>
                  )}
                </S.Box>
              </S.Container>
            </>
          )}
        </S.Content>
      </Loading>
      <div />
    </S.Main>
  );
};

const Card = ({
  label = "",
  description = "",
  icon = "AddMore",
  handleChange,
  isActive = false,
  children,
}) => {
  const IconComponent = Icons[icon];
  return (
    <S.Card isActive={isActive}>
      <S.CardWrapper onClick={handleChange}>
        <S.CardContent>
          <S.CardIcon>
            <IconComponent />
          </S.CardIcon>
          <S.CardInfo>
            <span>{label}</span>
            <p>{description}</p>
          </S.CardInfo>
        </S.CardContent>
        <S.CardArrow>
          <Icons.ArrowRight />
        </S.CardArrow>
      </S.CardWrapper>
      {children}
    </S.Card>
  );
};