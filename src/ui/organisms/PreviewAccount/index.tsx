import { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";
import { Switch } from "@polkadex/orderbook-ui/molecules";
import { Dropdown } from "@polkadex/orderbook/v3/ui/molecules";
import { TradeAccount } from "@polkadex/orderbook/modules/types";
import { userAccountSelectFetch } from "@polkadex/orderbook-modules";

type Props = {
  onClose: () => void;
  selected: TradeAccount;
};

export const PreviewAccount = ({ onClose = undefined, selected }: Props) => {
  const using = false;
  const dispatch = useDispatch();
  return (
    <S.Main>
      <S.Header type="button" onClick={onClose}>
        <Icons.SingleArrowLeft />
      </S.Header>
      <S.Content>
        <h2>Preview Wallet</h2>
        <S.Container>
          <S.Box>
            <WalletName label="Wallet name" information={String(selected?.meta?.name)} />
            <WalletAddress label="Trade wallet" information={selected?.address} />
            <WalletAddress
              label="Controller wallet"
              information="Orderbook testing"
              additionalInformation="5E1hRUGF5rCs...juU4NKGrX5P8"
              isLocked
            />
            <ProtectedByPassword label="Protected by password" />
            <DefaultAccount label="Default trade account" />
          </S.Box>
          <S.Button
            disabled={using}
            onClick={
              using
                ? undefined
                : () => dispatch(userAccountSelectFetch({ tradeAddress: selected.address }))
            }
            type="button">
            {using ? "Using" : "Use"}
          </S.Button>
        </S.Container>
      </S.Content>
      <S.Footer>
        <S.ExportButton type="button">Export</S.ExportButton>
        <Dropdown>
          <Dropdown.Trigger>
            <S.DropdownButton type="button">
              Remove acccount
              <div>
                <Icons.ArrowBottom />
              </div>
            </S.DropdownButton>
          </Dropdown.Trigger>
          <Dropdown.Menu fill="secondaryBackgroundSolid">
            <Dropdown.Item>Remove from blockchain</Dropdown.Item>
            <Dropdown.Item>Remove from device</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </S.Footer>
    </S.Main>
  );
};

const WalletName = ({ label = "", information = "" }) => {
  const [state, setState] = useState(false);

  const { values, touched, errors, handleSubmit } = useFormik({
    initialValues: {
      name: information,
    },
    onSubmit: (values) => {
      console.log(values);
      setState(!state);
    },
  });
  console.log(errors, values);
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
                placeholder="Enter a wallet name"
                defaultValue={values.name}
              />
            </S.CardInfo>
          </S.CardContent>
          <S.Actions>
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
        <S.Actions>
          <button type="button" onClick={() => setState(!state)}>
            Edit
          </button>
        </S.Actions>
      </S.CardWrapper>
    </S.Card>
  );
};

const WalletAddress = ({
  label = "",
  information = "",
  additionalInformation = "",
  isLocked = false,
}) => (
  <S.CardWrapper>
    <S.CardContent>
      <S.CardBox>
        <span>{label}</span>
        {isLocked && (
          <div>
            <Icons.Lock />
          </div>
        )}
      </S.CardBox>
      <S.CardInfo>
        <div>
          <Icons.Copy />
        </div>
        <p>
          {information}
          {!!additionalInformation.length && <small> • {additionalInformation}</small>}
        </p>
      </S.CardInfo>
    </S.CardContent>
  </S.CardWrapper>
);

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

const DefaultAccount = ({ label = "" }) => (
  <S.CardWrapper>
    <S.CardContent>
      <span>{label}</span>
    </S.CardContent>
    <Switch />
  </S.CardWrapper>
);
