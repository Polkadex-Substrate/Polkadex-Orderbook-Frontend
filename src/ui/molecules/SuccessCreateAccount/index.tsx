import { useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { useReactToPrint } from "react-to-print";

import { Button } from "../Button";

import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";
import { PaperWallet } from "@polkadex/orderbook-ui/organisms";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";

type Props = {
  title: string;
  description: string;
  mnemonic?: string;
  account?: {
    name: string;
    address: string;
  };
};
export const SuccessCreateAccount = ({
  title = "",
  description = "",
  mnemonic,
  account,
}: Props) => {
  const [state, setState] = useState(false);
  const buttonRef = useRef(null);
  const [mnemonicCopied, setMnemonicCopied] = useState(false);
  useEffect(() => {
    confetti({
      zIndex: 9999,
      origin: {
        x: 0.8,
        y: 0.4,
      },
    });
  }, []);
  const IconComponent = Icons[state ? "Show" : "Hidden"];
  const componentRef = useRef();
  const mnemonicArr = useMemo(() => mnemonic?.split(" "), [mnemonic]);
  const {
    userData: { userAccounts },
  } = useProfile();

  const controllerAccount = useMemo(
    () =>
      userAccounts?.find(
        ({ tradeAddress }) => tradeAddress?.toLowerCase() === account?.address?.toLowerCase()
      ),
    [userAccounts, account?.address]
  );
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const copyAddress = async () => {
    if (account?.address) {
      await navigator.clipboard.writeText(account?.address);
      buttonRef.current.innerHTML = "Copied";
    }
  };
  const copyMnemonic = async () => {
    if (account?.address) {
      await navigator.clipboard.writeText(mnemonic);
      setMnemonicCopied(true);
    }
  };
  return (
    <S.Wrapper>
      {!!mnemonic && (
        <div style={{ display: "none" }}>
          <PaperWallet
            mnemonic={mnemonicArr}
            mnemoicString={mnemonic}
            controllerAddress={controllerAccount?.mainAddress}
            ref={componentRef}
          />
        </div>
      )}
      <S.Title>
        <h3>{title}</h3>
        <p>{description}</p>
      </S.Title>
      <S.Content>
        <S.Wallet>
          <p>{account?.name}</p>
          <S.WalletContent>
            <button ref={buttonRef} onClick={copyAddress}>
              <Icons.Copy />
            </button>
            <span>{account?.address}</span>
          </S.WalletContent>
        </S.Wallet>
        {!!mnemonicArr && (
          <>
            <S.Words>
              <S.WordsWrapper>
                <S.WordsInfo>
                  <p>Mnemonic</p>
                  <span>
                    Save your account&apos;s mnemonic seed in a safe place. Do not share it
                    with anyone.
                  </span>
                </S.WordsInfo>
                <S.WordsTitle type="button" onClick={() => setState(!state)}>
                  <div>
                    <IconComponent />
                  </div>
                  <span>{state ? "Hide" : "Show"}</span>
                </S.WordsTitle>
              </S.WordsWrapper>
              {state && (
                <S.WordsContainer>
                  {mnemonicArr?.map((value, i) => (
                    <div key={i}>{`${i + 1}. ${value}`}</div>
                  ))}
                </S.WordsContainer>
              )}
              <Button
                background={mnemonicCopied ? "gradientGreen" : "secondaryBackgroundOpacity"}
                color="text"
                hoverColor={mnemonicCopied ? "gradientGreen" : "inverse"}
                isFull
                size="large"
                onClick={copyMnemonic}>
                {mnemonicCopied ? "Copied" : "Copy"}
              </Button>
            </S.Words>
            <S.Words>
              <S.WordsWrapper>
                <S.WordsInfo>
                  <p>Paper wallet</p>
                  <span>
                    Download your paper wallet and scan the QR code from Polkadex mobile App.
                  </span>
                </S.WordsInfo>
              </S.WordsWrapper>
              <S.WordsFooter>
                <button type="button" onClick={handlePrint}>
                  <div>
                    <Icons.Print />
                  </div>
                  Print
                </button>
              </S.WordsFooter>
            </S.Words>
          </>
        )}
      </S.Content>
    </S.Wrapper>
  );
};
