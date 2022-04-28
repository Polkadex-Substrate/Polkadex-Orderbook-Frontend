import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

import * as S from "./styles";

import { HeaderBack, QrCode } from "@polkadex/orderbook-ui/organisms";
import {
  Button,
  Dropdown,
  Icon,
  Loading,
  MyAccountLoading,
  SelectAccount,
} from "@polkadex/orderbook-ui/molecules";
import { PaperWallet } from "@polkadex/orderbook-ui/templates";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { useMnemonic, useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  selectExtensionWalletAccounts,
  selectMainAccount,
  setMainAccountFetch,
} from "@polkadex/orderbook-modules";

export const ConnectToPhone = () => {
  const dispatch = useDispatch();
  const componentRef = useRef();
  // Change to Saga
  const [isVisible, setIsVisible] = useState(false);
  const isLoading = false;
  const isSuccess = true;
  const mnemonicTest = [
    "test1",
    "test2",
    "test3",
    "test4",
    "test5",
    "test6",
    "test7",
    "test8",
    "test9",
    "test10",
    "test11",
    "test12",
  ];
  // Change to Saga
  const { mnemonic, mnemoicString } = useMnemonic();

  const selectedAccount = useReduxSelector(selectMainAccount);
  const accounts = useReduxSelector(selectExtensionWalletAccounts);

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
                    <h3>1. Download Polkadex App</h3>
                    <p>Any device at any time, trade on the go</p>
                  </S.StepTitle>
                  <S.StepContent>
                    <S.Download>
                      <S.DownloadButton href="#">
                        <Icons.DownloadApple />
                      </S.DownloadButton>
                      <S.DownloadButton href="#">
                        <Icons.DownloadAndroid />
                      </S.DownloadButton>
                    </S.Download>
                  </S.StepContent>
                </S.Step>
                <S.Step>
                  <S.StepTitle>
                    <h3>2. Select your account</h3>
                    <p>Read and accet our terms of use to continue</p>
                  </S.StepTitle>
                  <S.StepContent>
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
                                isVisible
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
                    {!isVisible && (
                      <S.SelectAccount>
                        <p>
                          I am aware that Polkadex does not store any information related to
                          Wallet or Mnemonic.
                        </p>
                        <Button
                          background="secondaryBackground"
                          color="black"
                          type="button"
                          onClick={() => setIsVisible(true)}>
                          Unlock QR Code
                        </Button>
                      </S.SelectAccount>
                    )}
                  </S.StepContent>
                </S.Step>
                {isVisible && (
                  <>
                    <S.Step>
                      <S.StepTitle>
                        <h3>3. Save your Mnemonic Phrases</h3>
                        <p>Never share your mnemonic seed with anyone. </p>
                      </S.StepTitle>
                      <S.StepContent>
                        <S.Phrases>
                          {mnemonicTest.map((phrase, i) => (
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
                          Print mnemonic
                        </Button>
                      </S.StepContent>
                    </S.Step>
                    <S.Step>
                      <S.StepTitle>
                        <h3>4. Mnemonic Phrases QR Code</h3>
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
