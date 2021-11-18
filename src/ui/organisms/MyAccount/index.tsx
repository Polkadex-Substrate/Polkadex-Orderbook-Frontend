import { useDispatch } from "react-redux";

import * as S from "./styles";
import { Props, MyCurrentAccountProps } from "./types";

import { logoutFetch } from "@polkadex/orderbook-modules";
import { useWindowSize } from "@polkadex/orderbook-hooks";
import { WalletInput, Skeleton, Button, Icon } from "src/ui";

const MyAccount = ({
  children,
  isHeader = false,
  balance = "0",
  address = "",
  accountName = "Account",
}: Props) => {
  const { width } = useWindowSize();
  return (
    <S.Wrapper isHeader={isHeader}>
      <Icon size="medium" icon="Avatar" />
      <S.AccountInfo>
        <S.AccountInfoHeader>
          <p>
            {accountName} {width > 990 && `(${address})`}
          </p>
          <span>Balance: ~{balance}</span>
        </S.AccountInfoHeader>
        {children}
      </S.AccountInfo>
    </S.Wrapper>
  );
};

export const MyAccountHeader = ({ balance = "0", accountName = "", address = "" }) => {
  const shortAddress = address
    ? address.slice(0, 7) + "..." + address.slice(address.length - 7)
    : "0x00000...0000000";

  return (
    <MyAccount isHeader balance={balance} address={shortAddress} accountName={accountName} />
  );
};

export const MyAccountContent = ({ balance = "0", accountName = "", address = "" }) => {
  const dispatch = useDispatch();
  const shortAddress = address
    ? address.slice(0, 7) + "..." + address.slice(address.length - 7)
    : "0x00000...0000000";
  return (
    <S.AccountContent>
      <MyAccount balance={balance} address={shortAddress} accountName={accountName} />
      <S.AccountContentHeader>
        <S.AccountContentInfo>
          <a href="https://polkascan.io/polkadot/block/6323045">
            Connected with Polkadotjs
            <Icon icon="External" size="xxsmall" background="none" />
          </a>
          <Button title="Disconnect" size="xSmall" onClick={() => dispatch(logoutFetch())} />
        </S.AccountContentInfo>
        <WalletInput value={address} />
        {/* {!isVerified && (
          <S.AccountContentInfo>
            <Icon icon="Attention" background="orange" size="xxsmall" />
            <p>
              Address not registered.
              <Link href="/settings">Register now</Link>
            </p>
          </S.AccountContentInfo>
        )} */}
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
        <Button
          title=" See Transactions"
          background="none"
          style={{ width: "100%", justifyContent: "center" }}></Button>
      </S.AccountContentFooter>
    </S.AccountContent>
  );
};

export const MyCurrentAccountHeader = ({
  name,
  address,
  isHeader = false,
  isActive = false,
  withButton = true,
  ...props
}: MyCurrentAccountProps) => {
  const shortAddress =
    address && address?.length >= 40
      ? address?.slice(0, 12) + "..." + address?.slice(address?.length - 12)
      : address;

  return (
    <S.Wrapper isActive={isActive} isHeader={isHeader} {...props}>
      {name ? <Icon size="xlarge" icon="Avatar" /> : <Skeleton height="4rem" width="4rem" />}
      <S.AccountInfo>
        <S.AccountInfoHeader>
          {name ? <p>{name}</p> : <Skeleton width="4rem" />}
          <S.AccountInfoFlex>
            {shortAddress ? (
              <span>{shortAddress}</span>
            ) : (
              <Skeleton width="12rem" style={{ marginTop: "1rem" }} />
            )}
            {isHeader && withButton && <Icon icon="ArrowBottom" size="xsmall" />}
          </S.AccountInfoFlex>
        </S.AccountInfoHeader>
      </S.AccountInfo>
    </S.Wrapper>
  );
};
