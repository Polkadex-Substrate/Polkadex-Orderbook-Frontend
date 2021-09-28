import Link from "next/link";

import { WalletInput } from "../../molecules";

import * as S from "./styles";
import { Props } from "./types";

import { Button, Icon } from "src/ui/components";
import { selectAllUserList, selectUserInfo, userFetch } from "src/modules";
import { useReduxSelector } from "src/hooks";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const MyAccount = ({
  children,
  isHeader = false,
  balance = "0",
  address = "",
  accountName = "Account",
}: Props) => {
  return (
    <S.Wrapper isHeader={isHeader}>
      <Icon size="medium" icon="Avatar" />
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

export const MyAccountHeader = () => {
  const user = useReduxSelector(selectUserInfo);

  const freeBalance = "0";
  const isVerified = false;
  const name = user.username;

  const shortAddress = user.address
    ? user.address.slice(0, 5) + "..." + user.address.slice(user.address.length - 5)
    : "0x00000...0000000";

  return (
    <MyAccount isHeader balance={freeBalance} address={shortAddress} accountName={name}>
      {!isVerified && <Icon background="orange" size="xxsmall" icon="Attention" />}
    </MyAccount>
  );
};

export const MyAccountContent = () => {

  const user = useReduxSelector(selectUserInfo);

  const freeBalance = "0";
  const isVerified = false;
  const name = user.username;

  const shortAddress = user.address
    ? user.address.slice(0, 5) + "..." + user.address.slice(user.address.length - 5)
    : "0x00000...0000000";
  return (
    <S.AccountContent>
      <MyAccount balance={freeBalance} address={shortAddress} accountName={name} />
      <S.AccountContentHeader>
        <S.AccountContentInfo>
          <a href="https://polkascan.io/polkadot/block/6323045">
            Connected with Polkadotjs
            <Icon icon="External" size="xxsmall" />
          </a>
          <Button title="Disconnect" size="Small" />
        </S.AccountContentInfo>
        <WalletInput value={user.address || "..."} />
        {!isVerified && (
          <S.AccountContentInfo>
            <Icon icon="Attention" background="orange" size="xxsmall" />
            <p>
              Address not registered.
              <Link href="/settings">Register now</Link>
            </p>
          </S.AccountContentInfo>
        )}
      </S.AccountContentHeader>
      <S.AccountContentSection>
        <a href="/support">
          <p>Support</p>
          <Icon icon="ArrowRight" size="xxsmall" />
        </a>
        <a href="/terms">
          <p>Terms and Conditions</p>
          <Icon icon="ArrowRight" size="xxsmall" />
        </a>
      </S.AccountContentSection>
      <S.AccountContentFooter>
        <Button title=" See Transactions" style={{ width: "100%" }}></Button>
      </S.AccountContentFooter>
    </S.AccountContent>
  );
};

export const MyCurrentAccount = () => {
  const userList = useReduxSelector(selectAllUserList);
  const user = userList[0]
  console.log("user form componenct", user)
  const name = user.username || "Account X";

  const shortAddress = user.address
    ? user.address.slice(0, 5) + "..." + user.address.slice(user.address.length - 5)
    : "0x0000000...0000000";

  return (
    <S.Wrapper isHeader>
      <Icon size="xlarge" icon="Avatar" />
      <S.AccountInfo>
        <S.AccountInfoHeader>
          <p>{name}</p>
          <S.AccountInfoFlex>
            <span>{shortAddress}</span>
            <Icon icon="ArrowBottom" size="xsmall" />
          </S.AccountInfoFlex>
        </S.AccountInfoHeader>
      </S.AccountInfo>
    </S.Wrapper>
  );
};
