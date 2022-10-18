import { useRef, useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";
import {
  Loading,
  Switch,
  Tooltip,
  TooltipContent,
  TooltipHeader,
} from "@polkadex/orderbook-ui/molecules";
import { Dropdown } from "@polkadex/orderbook/v3/ui/molecules";
import {
  removeProxyAccountFromChainFetch,
  removeTradeAccountFromBrowser,
  selectIsTradeAccountRemoveLoading,
  selectMainAccount,
  selectTradeAccount,
  selectUsingAccount,
  userAccountSelectFetch,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { transformAddress } from "@polkadex/orderbook/modules/user/profile/helpers";
import { IUserTradeAccount } from "@polkadex/orderbook/hooks/types";

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
  const dispatch = useDispatch();
  const mainAccountDetails = useReduxSelector(selectMainAccount(mainAccAddress));
  const tradingAccountInBrowser = useReduxSelector(selectTradeAccount(selected?.address));
  const usingAccount = useReduxSelector(selectUsingAccount);
  const using = usingAccount.tradeAddress === selected?.address;
  const isRemoveFromBlockchainLoading = useReduxSelector((state) =>
    selectIsTradeAccountRemoveLoading(state, selected?.address)
  );

  const menuDisableKeys = () => {
    const disableKeysList = [];
    if (!mainAccountDetails) {
      disableKeysList.push(`${menuDisableKeysEnum.REMOVE_FROM_BLOCKCHAIN}`);
    }
    if (!tradingAccountInBrowser) {
      disableKeysList.push(`${menuDisableKeysEnum.REMOVE_FROM_BROWSER}`);
    }

    return disableKeysList;
  };

  return (
    <Loading
      isVisible={isRemoveFromBlockchainLoading}
      hasBg={false}
      message=""
      spinner="Keyboard">
      <S.Main>
        <S.Header type="button" onClick={isRemoveFromBlockchainLoading ? undefined : onClose}>
          <Icons.SingleArrowLeft />
        </S.Header>
        <S.Content>
          <h2>Preview Wallet</h2>
          <S.Container>
            <S.Box>
              <WalletName
                label="Wallet name"
                information={String(selected?.account?.meta?.name || "Unknown")}
              />
              <WalletAddress label="Trade wallet" information={selected?.address} />
              <WalletAddress
                label="Controller wallet"
                information={
                  mainAccountDetails
                    ? mainAccountDetails?.account?.meta?.name
                    : "Main Account not present in browser"
                }
                informationDisabled
                additionalInformation={
                  mainAccountDetails ? transformAddress(mainAccAddress) : ""
                }
                isLocked
              />
              <ProtectedByPassword label="Protected by password" />
              <DefaultAccount label="Default trade account" />
            </S.Box>
            <S.Button
              disabled={!tradingAccountInBrowser || !mainAccountDetails}
              onClick={() =>
                dispatch(userAccountSelectFetch({ tradeAddress: selected?.address }))
              }
              type="button">
              {using ? "Using" : "Use"}
            </S.Button>
          </S.Container>
        </S.Content>
        <S.Footer>
          <S.ExportButton
            disabled={!tradingAccountInBrowser || !mainAccountDetails}
            type="button">
            Export
          </S.ExportButton>
          <Dropdown>
            <Dropdown.Trigger>
              <S.DropdownButton type="button">
                Remove account
                <div>
                  <Icons.ArrowBottom />
                </div>
              </S.DropdownButton>
            </Dropdown.Trigger>
            <Dropdown.Menu fill="secondaryBackgroundSolid" disabledKeys={menuDisableKeys()}>
              <Dropdown.Item
                key={"1"}
                onAction={() =>
                  dispatch(removeProxyAccountFromChainFetch({ address: selected.address }))
                }>
                Remove from blockchain
              </Dropdown.Item>
              <Dropdown.Item
                key={"2"}
                onAction={() =>
                  dispatch(removeTradeAccountFromBrowser({ address: selected.address }))
                }>
                Remove from device
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </S.Footer>
      </S.Main>
    </Loading>
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
  informationDisabled = false,
}) => {
  const buttonRef = useRef(null);
  const handleOnMouseOut = () => (buttonRef.current.innerHTML = "Copy to clipboard");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(information);
    buttonRef.current.innerHTML = "Copied";
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
                  Copy to clipboard
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

const DefaultAccount = ({ label = "" }) => (
  <S.CardWrapper>
    <S.CardContent>
      <span>{label}</span>
    </S.CardContent>
    <Switch />
  </S.CardWrapper>
);
