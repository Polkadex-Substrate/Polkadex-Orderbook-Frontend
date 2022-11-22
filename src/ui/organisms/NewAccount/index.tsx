import { useState } from "react";

import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";
import {
  CreateAccountForm,
  ImportAccountForm,
  Loading,
  SuccessCreateAccount,
} from "@polkadex/orderbook-ui/molecules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  selectExtensionWalletAccounts,
  selectImportTradeAccountSuccess,
  selectIsRegisterMainAccountSuccess,
  selectLinkedMainAddresses,
  selectRegisterTradeAccountInfo,
  selectRegisterTradeAccountSuccess,
} from "@polkadex/orderbook-modules";

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
    description: "Now you can operate in orderbook, receive deposits and make withdrawals.",
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

export const NewAccount = ({ onClose = undefined, selected, isLoading = false }: Props) => {
  const handleCancel = (value: boolean, isImport: boolean) =>
    setState({ status: value, isImport: isImport });

  const tradeInfo = useReduxSelector(selectRegisterTradeAccountInfo);

  const [state, setState] = useState({
    status: tradeInfo.defaultImportActive,
    isImport: false,
  });
  const isTradeAccountSuccess = useReduxSelector(selectRegisterTradeAccountSuccess);
  const isControllerAccountSuccess = useReduxSelector(selectIsRegisterMainAccountSuccess);
  const isImportAccountSuccess = useReduxSelector(selectImportTradeAccountSuccess);

  const hasData = !!selected?.address?.length;
  const information = data[hasData ? 1 : 0];
  const hasExtensionAccounts = useReduxSelector(selectExtensionWalletAccounts)?.length > 0;
  const hasLinkedAccounts = useReduxSelector(selectLinkedMainAddresses)?.length > 0;
  const shouldShowCreateAccount = (state.status && state.isImport) || hasData;
  const successInformation = successData[isControllerAccountSuccess ? 1 : 0];

  return (
    <S.Main>
      <S.Header type="button" onClick={onClose}>
        <Icons.SingleArrowLeft />
      </S.Header>
      <Loading isVisible={isLoading} hasBg={false} message="" spinner="Keyboard">
        <S.Content>
          {isTradeAccountSuccess || isControllerAccountSuccess ? (
            <SuccessCreateAccount
              title={
                isImportAccountSuccess ? "trading account imported" : successInformation.title
              }
              description={
                isImportAccountSuccess
                  ? successData[0].description
                  : successInformation.description
              }
              mnemonic={tradeInfo?.mnemonic}
              account={tradeInfo.account}
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
                    label="Create new trading account"
                    description="Quickly create a trading account."
                    icon="AddWallet"
                    isActive={hasExtensionAccounts && (!state.status || state.isImport)}
                    handleChange={
                      hasData ? undefined : () => handleCancel(!state.status, true)
                    }>
                    {shouldShowCreateAccount && (
                      <CreateAccountForm
                        onCancel={hasData ? onClose : () => handleCancel(!state.status, true)}
                        selectedAccountName={selected?.name}
                        selectedAccountAddress={selected?.address}
                        buttonTitle={information.button}
                      />
                    )}
                  </Card>
                  {!hasData && (
                    <Card
                      label="Import existing trading account"
                      description="Import existing trading account using your mnemonic phrases. "
                      icon="AddMore"
                      isActive={hasLinkedAccounts && (!state.status || !state.isImport)}
                      handleChange={() => handleCancel(!state.status, false)}>
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
