import { useState } from "react";

import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";
import { CreateAccountForm } from "@polkadex/orderbook-ui/molecules/CreateAccountForm";

export const NewAccount = ({ onClose = undefined }) => {
  const [state, setState] = useState(false);
  return (
    <S.Main>
      <S.Header type="button" onClick={onClose}>
        <Icons.SingleArrowLeft />
      </S.Header>
      <S.Content>
        <S.Title>
          <h2>Import Wallet</h2>
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
              isActive={state}
              handleChange={() => setState(!state)}>
              {state && <CreateAccountForm />}
            </Card>
            <Card
              label="Import existing account"
              description="Import wallet using your mnemonic phrases. "
              icon="AddMore"
              isActive={!state}
              handleChange={() => setState(!state)}>
              {!state && <p>Import</p>}
            </Card>
          </S.Box>
        </S.Container>
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
    <S.Card isActive={isActive} onClick={handleChange}>
      <S.CardWrapper>
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
