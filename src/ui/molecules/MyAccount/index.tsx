import { ButtonHTMLAttributes, HTMLAttributes } from "react";

import { Button, Icon, WalletInput, Skeleton } from "../";

import * as S from "./styles";
import * as T from "./types";

const MyAccount = ({
  children,
  isHeader = false,
  balance = "0.0000000",
  address = "Empty",
  accountName = "Account",
  isFull = false,
  ...props
}: T.Props) => {
  return (
    <S.Wrapper isHeader={isHeader} isFull={isFull} {...props}>
      <Icon name="Avatar" background="primaryBackground" size="giant" />
      <S.AccountInfo>
        <S.AccountInfoHeader>
          <p>
            {accountName} ({address})
          </p>
          <span>Balance: {balance}</span>
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
      isHeader
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
          <Icon name="ArrowRight" size="small" color="inverse" />
        </a>
        <a href="/terms">
          <p>Terms and Conditions</p>
          <Icon name="ArrowRight" size="small" color="inverse" />
        </a>
      </S.AccountContentSection>
    </S.AccountContent>
  );
};

export const SelectAccount = ({
  balance,
  address,
  isActive,
  isHeader,
  accountName,
  withButton,
  isFull = true,
  ...props
}: T.SelectAccountProps & HTMLAttributes<HTMLDivElement>) => {
  const shortAddress =
    address && address?.length >= 40
      ? address.slice(0, 12) + "..." + address.slice(address.length - 12)
      : address;

  return (
    <S.SelectAccountWrapper isFull={isFull}>
      <S.SelectAccount isActive={isActive} isHeader={isHeader} {...props}>
        {accountName ? (
          <Icon size="extraGiant" name="Avatar" color="white" background="black" />
        ) : (
          <Skeleton height="4rem" width="4rem" />
        )}
        <S.AccountInfo>
          <S.SelectAccountHeader>
            <div>
              {address ? <p>{accountName}</p> : <Skeleton width="4rem" />}

              {address ? (
                <span>{shortAddress}</span>
              ) : (
                <Skeleton width="12rem" style={{ marginTop: "1rem" }} />
              )}
            </div>

            {isHeader && withButton && (
              <Icon name="ArrowBottom" size="small" style={{ marginLeft: "1rem" }} />
            )}
          </S.SelectAccountHeader>
        </S.AccountInfo>
      </S.SelectAccount>
    </S.SelectAccountWrapper>
  );
};
