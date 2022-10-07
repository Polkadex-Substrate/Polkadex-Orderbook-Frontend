import { useState } from "react";

import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";
import {
  CreateAccountForm,
  ImportAccountForm,
  SuccessCreateAccount,
  SuccessImport,
} from "@polkadex/orderbook-ui/molecules";

export const NewAccount = ({ onClose = undefined }) => {
  const [state, setState] = useState({
    status: false,
    isImport: false,
  });
  return (
    <S.Main>
      <S.Header type="button" onClick={onClose}>
        <Icons.SingleArrowLeft />
      </S.Header>
      <S.Content>
        {false ? (
          <SuccessCreateAccount />
        ) : (
          <>
            <S.Title>
              <h2>Add Account</h2>
              <p>
                <strong>
                  Polkadex does not store any data, all data is stored in your browser
                </strong>
                . To find out more about how your data is used or stored,
                <a> read our terms and conditions </a>.
              </p>
            </S.Title>
            <S.Container>
              <S.Box>
                <Card
                  label="Create new account"
                  description="Quickly create a trading account."
                  icon="AddWallet"
                  isActive={!state.status || state.isImport}
                  handleChange={() => setState({ status: !state.status, isImport: true })}>
                  {state.status && state.isImport && <CreateAccountForm />}
                </Card>
                <Card
                  label="Import existing account"
                  description="Import wallet using your mnemonic phrases. "
                  icon="AddMore"
                  isActive={!state.status || !state.isImport}
                  handleChange={() => setState({ status: !state.status, isImport: false })}>
                  {state.status && !state.isImport && <ImportAccountForm />}
                </Card>
              </S.Box>
            </S.Container>
          </>
        )}
      </S.Content>
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
