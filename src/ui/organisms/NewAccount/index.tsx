import { useState } from "react";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";
import {
  CreateAccountForm,
  ImportAccountForm,
  Loading,
  SuccessCreateAccount,
  SuccessImport,
} from "@polkadex/orderbook-ui/molecules";
import { TradeAccount } from "@polkadex/orderbook/modules/types";

const data = [
  {
    title: "Add account",
    description:
      "Polkadex is a fully non-custodial platform, so the assets in your wallet are always under your control. Any data is stored, all data is stored in your browser.",
  },
  {
    title: "Register account",
    description:
      "Trading accounts allow you to operate within the orderbook and make withdrawals. They are created from a wallet, it is only possible to have 3 per wallet.",
  },
];
type Props = {
  onClose: () => void;
  selected: InjectedAccountWithMeta;
};

export const NewAccount = ({ onClose = undefined, selected }: Props) => {
  const [state, setState] = useState({
    status: false,
    isImport: false,
  });

  const handleCancel = (value: boolean, isImport: boolean) =>
    setState({ status: value, isImport: isImport });

  const isLoading = false;
  const isSuccess = false;

  const hasData = !!selected?.address?.length;
  const information = data[hasData ? 1 : 0];

  const shouldShowCreateAccount = (state.status && state.isImport) || hasData;
  return (
    <S.Main>
      <S.Header type="button" onClick={onClose}>
        <Icons.SingleArrowLeft />
      </S.Header>
      <Loading isVisible={isLoading} hasBg={false} message="" spinner="Keyboard">
        <S.Content>
          {isSuccess ? (
            <SuccessCreateAccount />
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
                        selectedAccountName={selected?.meta?.name}
                        selectedAccountAddress={selected?.address}
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
