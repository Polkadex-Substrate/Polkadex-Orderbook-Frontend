import { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { useDispatch } from "react-redux";

import { Button, Icon, WalletInput, Skeleton } from "../";

import * as S from "./styles";
import * as T from "./types";

import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { balancesFetch, selectUserInfo } from "@polkadex/orderbook-modules";
import { API, RequestOptions } from "@polkadex/orderbook-config";
import { signMessage } from "@polkadex/web-helpers";

const MyAccount = ({
  children,
  balance = "0.0000000",
  address = "Empty",
  accountName = "Account",
  isFull = false,
  ...props
}: T.Props) => {
  return (
    <S.Wrapper isFull={isFull} {...props}>
      <Icon name="Avatar" background="black" color="white" size="extraLarge" />
      <S.AccountInfo>
        <S.AccountInfoHeader>
          <p>
            {accountName} ({address})
          </p>
          {/* TODO: add balance when total portfolio balance available to call
          <span>Balance: {balance}</span> */}
        </S.AccountInfoHeader>
        {children}
      </S.AccountInfo>
    </S.Wrapper>
  );
};

export const MyAccountHeader = ({
  balance = "0.0000000",
  address = "Empty",
  isVerified = true,
  accountName = "Account",
  isFull = true,
}: T.Props) => {
  const shortAddress = address
    ? address.slice(0, 7) + "..." + address.slice(address.length - 7)
    : "";
  return (
    <MyAccount
      balance={balance}
      address={shortAddress}
      accountName={accountName}
      isFull={isFull}>
      {!isVerified && <Icon name="Attention" background="orange" size="extraSmall" />}
    </MyAccount>
  );
};

export const MyAccountContent = ({
  balance = "0.0000000",
  address = "Empty",
  isVerified = true,
  accountName = "Account",
  isFull = false,
  ...props
}: T.Props & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const shortAddress = address
    ? address.slice(0, 7) + "..." + address.slice(address.length - 7)
    : "";

  // add test funds
  // TODO: should be removed at relesse
  const user = useReduxSelector(selectUserInfo);
  const dispatch = useDispatch();
  const userKeyring = user.keyringPair;
  // const option: RequestOptions = {
  //   apiVersion: "polkadexHostUrl",
  // };
  const handleFundsRequest = async () => {
    console.log("handleFundsRequest");
    if (user.address) {
      try {
        const payloads = [
          { account: user.address, asset: 1, amount: "100.0" },
          { account: user.address, asset: 0, amount: "100.0" },
        ];
        const reqs = payloads.map(async (payload) => {
          const signature = await signMessage(userKeyring, JSON.stringify(payload));
          const data = {
            signature: {
              Sr25519: signature.trim().slice(2),
            },
            payload,
          };
          // const res = await API.post(option)("/test_deposit", data);
          return res;
        });
        const res: any = await Promise.all(reqs);
        console.log(res);
        if (res[0].Fine && res[1].Fine) {
          dispatch(balancesFetch());
          alert("Funds added, You are rich now!");
        } else {
          throw Error("Error adding funds");
        }
      } catch (error) {
        alert("Error: could not add funds");
      }
    } else {
      alert("You should be logged in to add funds");
    }
  };
  return (
    <S.AccountContent isFull={isFull}>
      <MyAccount balance={balance} address={shortAddress} accountName={accountName} />
      <S.AccountContentHeader>
        <S.AccountContentInfo>
          <span>
            Connected with
            <a href={"https://polkadot.js.org/apps/#/explorer"}>
              Polkadotjs
              <Icon name="External" />
            </a>
          </span>
          <Button
            isFull={false}
            background="secondaryBackground"
            color="black"
            size="small"
            onClick={props?.onClick}>
            Disconnect
          </Button>
        </S.AccountContentInfo>
        <WalletInput value={address || ""} />
        {!isVerified && (
          <S.AccountContentInfo>
            <Icon name="Attention" background="orange" size="extraSmall" />
            <p>
              Address not registered.
              <a href="/settings">Register now</a>
            </p>
          </S.AccountContentInfo>
        )}
      </S.AccountContentHeader>
      <S.AccountContentSection>
        <a href="/support">
          <p>Support</p>
          <Icon name="ArrowRight" size="small" color="black" />
        </a>
        <a href="/terms">
          <p>Terms and Conditions</p>
          <Icon name="ArrowRight" size="small" color="black" />
        </a>
        <a href="#" onClick={handleFundsRequest}>
          <p>Get me money!</p>
          <Icon name="ArrowRight" size="small" color="black" />
        </a>
        {/* TODO: Add when the endpoint is available
         <Link href="/wallet">Deposit/Withdraw</Link> */}
      </S.AccountContentSection>
    </S.AccountContent>
  );
};

export const SelectAccount = ({
  address,
  isActive,
  fullDescription,
  isHeader,
  accountName,
  withButton,
  locked = false,
  isFull = true,
  iconColor = "white",
  iconBackground = "black",
  isHoverable = true,
  ...props
}: T.SelectAccountProps & HTMLAttributes<HTMLDivElement>) => {
  const shortAddress =
    address && address?.length >= 40
      ? address.slice(0, 8) + "..." + address.slice(address.length - 8)
      : address;

  return (
    <S.SelectAccountWrapper isFull={isFull}>
      <S.SelectAccount
        isActive={isActive}
        isHeader={isHeader}
        isHoverable={isHoverable}
        {...props}>
        <Icon
          size={isHeader ? "extraGiant" : "giant"}
          name="Avatar"
          color={iconColor}
          background={iconBackground}
        />
        <S.AccountInfo>
          <S.SelectAccountHeader>
            <S.SelectAccountHeaderWrapper>
              <S.SelectAccountTitle>
                {locked && <Icon name="Lock" stroke="secondaryBackgroundDark" />}
                <p>{accountName}</p>
              </S.SelectAccountTitle>
              <S.SelectAccountFlex>
                <span>{fullDescription ? address : shortAddress}</span>
                {isHeader && <Icon name="ArrowBottom" stroke="black" />}
              </S.SelectAccountFlex>
            </S.SelectAccountHeaderWrapper>
            {withButton && (
              <Icon name="ArrowBottom" size="small" style={{ marginLeft: "1rem" }} />
            )}
          </S.SelectAccountHeader>
        </S.AccountInfo>
      </S.SelectAccount>
    </S.SelectAccountWrapper>
  );
};
export const MyAccountLoading = () => (
  <div>
    <MyAccountLoadingContent />
    <MyAccountLoadingContent />
  </div>
);

const MyAccountLoadingContent = () => (
  <S.SelectAccountWrapper>
    <S.SelectAccount>
      <Skeleton isLight height="4rem" width="4rem" style={{ marginRight: 10 }} />
      <div>
        <Skeleton isLight width="12rem" />
        <Skeleton isLight width="12rem" style={{ marginTop: "1rem" }} />
      </div>
    </S.SelectAccount>
  </S.SelectAccountWrapper>
);
