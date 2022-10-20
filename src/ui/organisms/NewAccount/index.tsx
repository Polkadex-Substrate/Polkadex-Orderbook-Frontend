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
  selectImportTradeAccountSuccess,
  selectIsRegisterMainAccountSuccess,
  selectRegisterTradeAccountInfo,
  selectRegisterTradeAccountSuccess,
} from "@polkadex/orderbook-modules";

const data = [
  {
    title: "Add account",
    description:
      "Polkadex is a fully non-custodial platform, so the assets in your wallet are always under your control. All data is stored in your browser.",
    button: "Create account",
  },
  {
    title: "Register account",
    description:
      "Trading accounts allow you to operate within the orderbook and make withdrawals. you can only have 3 trading accounts for each funding account",
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
    description: "Now you can create trading account and start to trading.",
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
  const [state, setState] = useState({
    status: false,
    isImport: false,
  });

  const handleCancel = (value: boolean, isImport: boolean) =>
    setState({ status: value, isImport: isImport });

  const tradeInfo = useReduxSelector(selectRegisterTradeAccountInfo);

  const isTradeAccountSuccess = useReduxSelector(selectRegisterTradeAccountSuccess);
  const isControllerAccountSuccess = useReduxSelector(selectIsRegisterMainAccountSuccess);
  const isImportAccountSuccess = useReduxSelector(selectImportTradeAccountSuccess);

  const hasData = !!selected?.address?.length;
  const information = data[hasData ? 1 : 0];

  const shouldShowCreateAccount = (state.status && state.isImport) || hasData;
  const successInformation = successData[isControllerAccountSuccess ? 1 : 1];

  return (
    <S.Main>
      <S.Header type="button" onClick={onClose}>
        <Icons.SingleArrowLeft />
      </S.Header>
      <Loading isVisible={isLoading} hasBg={false} message="" spinner="Keyboard">
        <S.Content>
          {isTradeAccountSuccess || isControllerAccountSuccess ? (
            <SuccessCreateAccount
              title={isImportAccountSuccess ? "Wallet imported" : successInformation.title}
              description={successInformation.description}
              mnemonic={tradeInfo?.mnemonic?.split(" ")}
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
                    label="Create new account"
                    description="Quickly create a trading account."
                    icon="AddWallet"
                    isActive={!state.status || state.isImport}
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
                      label="Import existing account"
                      description="Import wallet using your mnemonic phrases. "
                      icon="AddMore"
                      isActive={!state.status || !state.isImport}
                      handleChange={() => handleCancel(!state.status, false)}>
                      {state.status && !state.isImport && (
                        <ImportAccountForm
                          onCancel={() => handleCancel(!state.status, true)}
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
