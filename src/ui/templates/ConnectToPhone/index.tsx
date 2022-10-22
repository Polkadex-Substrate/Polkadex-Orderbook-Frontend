import { useDispatch } from "react-redux";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useRouter } from "next/router";

import * as S from "./styles";

import {
  AvailableMessage,
  Button,
  Dropdown,
  Icon,
  LoadingSection,
  MyAccountLoading,
  SelectAccount,
} from "@polkadex/orderbook-ui/molecules";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { useMnemonic, useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  selectExtensionWalletAccounts,
  selectMainAccount,
  selectUsingAccount,
} from "@polkadex/orderbook-modules";
import { QrCode, PaperWallet, HeaderBack } from "@polkadex/orderbook-ui/organisms";

export const ConnectToPhone = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const componentRef = useRef();

  // Change to Saga
  const isLoading = false;

  // Change to Saga
  const { mnemonic, mnemoicString, isMnemonicFromSignUp } = useMnemonic(
    router?.query?.mnemonic as string
  );
  const currentAccount = useReduxSelector(selectUsingAccount);
  const extensionAccount = useReduxSelector(selectMainAccount(currentAccount.mainAddress));
  const accounts = useReduxSelector(selectExtensionWalletAccounts);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <S.Main>
      {!!mnemonic?.length && (
        <div style={{ display: "none" }}>
          <PaperWallet mnemonic={mnemonic} mnemoicString={mnemoicString} ref={componentRef} />
        </div>
      )}
      <S.Wrapper>
        <S.Content>
          <HeaderBack />
          <S.Container>
            <S.AsideLeft>
              <S.Title>
                <h1>Connect to Phone</h1>
                <p>Trade Anywhere Anytime</p>
              </S.Title>
              <LoadingSection isActive={true} color="primaryBackgroundOpacity">
                <S.Step>
                  <S.StepTitle>
                    <h3>Download Polkadex App</h3>
                    <p>Any device at any time, trade on the go</p>
                  </S.StepTitle>
                  <S.StepContent>
                    <AvailableMessage>
                      <S.Download>
                        <S.DownloadButton href="#">
                          <Icons.DownloadApple />
                        </S.DownloadButton>
                        <S.DownloadButton href="#">
                          <Icons.DownloadAndroid />
                        </S.DownloadButton>
                      </S.Download>
                    </AvailableMessage>
                  </S.StepContent>
                </S.Step>
                <S.Step>
                  {!router?.query?.mnemonic?.length && (
                    <S.StepTitle>
                      <h3>Select your account</h3>
                      <p>Read and accept our terms of use to continue</p>
                    </S.StepTitle>
                  )}

                  <S.StepContent>
                    {!router?.query?.mnemonic?.length && (
                      <Dropdown
                        direction="bottom"
                        isClickable
                        header={
                          <SelectAccount
                            isHeader
                            accountName={
                              extensionAccount?.account.meta?.name ||
                              "Select your funding account"
                            }
                            address={
                              extensionAccount?.account?.address ||
                              "Polkadex is completely free"
                            }
                          />
                        }>
                        <S.SelectContent isOverflow={accounts?.length > 2}>
                          {isLoading ? (
                            <MyAccountLoading />
                          ) : accounts?.length ? (
                            accounts.map((item, index) => (
                              <SelectAccount
                                isActive={
                                  item?.account?.address === extensionAccount?.account?.address
                                }
                                key={index}
                                accountName={item?.account?.meta?.name || `Account ${index}`}
                                address={item?.account?.address}
                                onClick={() => console.log("not implemented")}
                              />
                            ))
                          ) : (
                            <S.SelectMessage>
                              You dont have account, please create one
                            </S.SelectMessage>
                          )}
                        </S.SelectContent>
                      </Dropdown>
                    )}

                    <S.SelectAccount>
                      <p>
                        I am aware that Polkadex does not store any information related to
                        Wallet or Mnemonic.
                      </p>
                      {!isMnemonicFromSignUp && (
                        <Button background="secondaryBackground" color="black" type="button">
                          Unlock QR Code
                        </Button>
                      )}
                    </S.SelectAccount>
                  </S.StepContent>
                </S.Step>
                {isMnemonicFromSignUp && (
                  <>
                    <S.Step>
                      <S.StepTitle>
                        <h3>Save your Mnemonic Phrases</h3>
                        <p>Never share your mnemonic seed with anyone. </p>
                      </S.StepTitle>
                      <S.StepContent>
                        <S.Phrases>
                          {mnemonic?.map((phrase, i) => (
                            <div key={i}>
                              <span>{i + 1}.</span>
                              <p>{phrase}</p>
                            </div>
                          ))}
                        </S.Phrases>
                        <Button
                          onClick={handlePrint}
                          type="button"
                          background="transparent"
                          color="black"
                          style={{ padding: 0, marginTop: "2rem" }}
                          icon={{
                            size: "large",
                            name: "Print",
                            background: "inverse",
                            color: "text",
                          }}>
                          Download mnemonic
                        </Button>
                      </S.StepContent>
                    </S.Step>
                    <S.Step>
                      <S.StepTitle>
                        <h3>Mnemonic Phrases QR Code</h3>
                        <p>Open Polkadex Exchange App and import your wallet via QR code. </p>
                      </S.StepTitle>
                      <S.StepContent>
                        <QrCode mnemoicString={mnemoicString} />
                      </S.StepContent>
                    </S.Step>
                  </>
                )}
              </LoadingSection>
            </S.AsideLeft>
            <S.AsideRight></S.AsideRight>
          </S.Container>
        </S.Content>
        <S.Box>
          <S.Card>
            <S.CardContent>
              <Icon size="extraLarge" color="inverse" name="Mnemonic" />
              <h4>What do you use mnemonic for?</h4>
              <p>
                A Mnemonic Phrase is also called Seed Phrase or Recovery Backup for a
                decentralized wallet. It is a list of words and proof of ownership of your
                crypto assets. Polkadex does not store any information about your wallet.
                <strong>Never share your mnemonic phrase with anyone</strong>
              </p>
            </S.CardContent>
          </S.Card>
        </S.Box>
      </S.Wrapper>
      <style jsx global>
        {`
          body {
            overflow-y: scroll;
          }
        `}
      </style>
    </S.Main>
  );
};
