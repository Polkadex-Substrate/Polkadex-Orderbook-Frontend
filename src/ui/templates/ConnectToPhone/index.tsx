import { useDispatch } from "react-redux";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import * as S from "./styles";

import {
  AvailableMessage,
  Button,
  Dropdown,
  Icon,
  Loading,
  MyAccountLoading,
  SelectAccount,
} from "@polkadex/orderbook-ui/molecules";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { useMnemonic, useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  connectPhoneFetch,
  selectConnectPhoneSuccess,
  selectExtensionWalletAccounts,
  selectMainAccount,
  setMainAccountFetch,
} from "@polkadex/orderbook-modules";
const HeaderBack = dynamic(
  () => import("@polkadex/orderbook-ui/organisms/Header").then((mod) => mod.HeaderBack),
  {
    ssr: false,
  }
);

const QrCode = dynamic(() => import("@polkadex/orderbook-ui/organisms/QrCode"), {
  ssr: false,
});
const PaperWallet = dynamic(() => import("@polkadex/orderbook-ui/templates/PaperWallet"), {
  ssr: false,
});

export const ConnectToPhone = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const componentRef = useRef();
  // Change to Saga
  const isLoading = false;
  const isSuccess = true;

  // Change to Saga
  const { mnemonic, mnemoicString, isMnemonicFromSignUp } = useMnemonic(
    router?.query?.mnemonic as string
  );

  const selectedAccount = useReduxSelector(selectMainAccount);
  const accounts = useReduxSelector(selectExtensionWalletAccounts);
  const connectPhoneSuccess = useReduxSelector(selectConnectPhoneSuccess);
  const showQrCode = connectPhoneSuccess || isMnemonicFromSignUp;
  const showUnlockQr = !connectPhoneSuccess && !isMnemonicFromSignUp;
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <S.Main>
      {!!mnemonic?.length && (
        <div style={{ display: "none" }}>
          <PaperWallet
            mnemonic={mnemonic}
            mnemoicString={mnemoicString}
            forwardedRef={componentRef}
          />
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
              <Loading isActive={!isSuccess} color="primaryBackgroundOpacity">
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
                            accountName={selectedAccount?.name || "Select your main account"}
                            address={selectedAccount?.address || "Polkadex is completely free"}
                          />
                        }>
                        <S.SelectContent isOverflow={accounts?.length > 2}>
                          {isLoading ? (
                            <MyAccountLoading />
                          ) : accounts?.length ? (
                            accounts.map((item, index) => (
                              <SelectAccount
                                isActive={item.address === selectedAccount?.address}
                                key={index}
                                accountName={item.meta.name || `Account ${index}`}
                                address={item.address}
                                onClick={() =>
                                  connectPhoneSuccess
                                    ? undefined
                                    : dispatch(setMainAccountFetch(accounts[index]))
                                }
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
                      {showUnlockQr && (
                        <Button
                          background="secondaryBackground"
                          color="black"
                          type="button"
                          onClick={() => {
                            dispatch(connectPhoneFetch({ mnemonic: mnemoicString }));
                          }}>
                          Unlock QR Code
                        </Button>
                      )}
                    </S.SelectAccount>
                  </S.StepContent>
                </S.Step>
                {showQrCode && (
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
                        <QrCode mnemoicString={"['test1','test2','test3' ]"} />
                      </S.StepContent>
                    </S.Step>
                  </>
                )}
              </Loading>
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
    </S.Main>
  );
};
