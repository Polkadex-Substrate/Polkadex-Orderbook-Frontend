import { useEffect, useRef } from "react";
import QRCode from "easyqrcodejs";
import { useDispatch } from "react-redux";

import * as S from "./styles";

import { Button, Dropdown, Icon, SelectAccount } from "@polkadex/orderbook-ui/molecules";
import { FlexSpaceBetween } from "@polkadex/orderbook-ui/atoms";
import {
  selectExtensionWalletAccounts,
  selectMainAccount,
  setMainAccountFetch,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";

export const Deposit = () => {
  const accounts = useReduxSelector(selectExtensionWalletAccounts);
  const selectedAccount = useReduxSelector(selectMainAccount);

  const dispatch = useDispatch();
  const ref = useRef(null);
  useEffect(() => {
    const opts = {
      drawer: "svg",
      width: 140,
      height: 140,
      text: "https://example.com",
      logo: "/img/PolkadexIcon.svg",
    };

    const qrcode = new QRCode(ref.current, opts);
    const blob = new Blob([ref.current.innerHTML], { type: "image/svg+xml" });

    const downloadlink = window.URL.createObjectURL(blob);
    window.URL.revokeObjectURL(downloadlink);
  }, []);
  return (
    <S.Wrapper>
      <S.SelectAccountContainer>
        <Dropdown
          direction="bottom"
          isClickable
          header={
            <SelectAccount
              isHeader
              accountName={selectedAccount?.name || "Select your main account"}
              address={selectedAccount?.address || "Polkadex is completely free"}
            />
          }>
          <S.SelectContent isOverflow={accounts?.length > 2}>
            {accounts?.length ? (
              accounts.map((item, index) => (
                <SelectAccount
                  isActive={item.address === selectedAccount?.address}
                  key={index}
                  accountName={item.meta.name || `Account ${index}`}
                  address={item.address}
                  onClick={() => {
                    dispatch(setMainAccountFetch(accounts[index]));
                  }}
                />
              ))
            ) : (
              <S.SelectMessage>You dont have account, please create one</S.SelectMessage>
            )}
          </S.SelectContent>
        </Dropdown>
      </S.SelectAccountContainer>
      <S.SelectPairContainer>
        <Dropdown
          direction="bottom"
          header={
            <S.SelectWrapper>
              Select Market
              <Icon
                name="ArrowBottom"
                size="small"
                style={{ marginLeft: "1rem" }}
                stroke="black"
              />
            </S.SelectWrapper>
          }>
          <S.SelectContent isOverflow={false}>markets</S.SelectContent>
        </Dropdown>
        <Dropdown
          direction="bottom"
          header={
            <S.SelectWrapper>
              Select Asset
              <Icon
                name="ArrowBottom"
                size="small"
                style={{ marginLeft: "1rem" }}
                stroke="black"
              />
            </S.SelectWrapper>
          }>
          <S.SelectContent isOverflow={false}>assets</S.SelectContent>
        </Dropdown>
      </S.SelectPairContainer>
      <S.WrapperContainer>
        <S.QrCodeContainer>
          <S.QrCode>
            <div ref={ref} />
          </S.QrCode>
          <p>Scan QR Code</p>
        </S.QrCodeContainer>
        <S.Container>
          <S.Input>
            <span>Wallet Address</span>
            <FlexSpaceBetween>
              <p>19BY2XCgbDe6WtTVbTyzM9eR3LYr6tWK</p>
              <button type="button" onClick={() => console.log("...")}>
                Copy
              </button>
            </FlexSpaceBetween>
          </S.Input>
          <S.Content>
            <span>Send only BTC to this deposit address</span>
            <p>
              Sending coin or token other than BTC to this address may result in the loss of
              your deposit.
            </p>
          </S.Content>
        </S.Container>
      </S.WrapperContainer>
    </S.Wrapper>
  );
};
