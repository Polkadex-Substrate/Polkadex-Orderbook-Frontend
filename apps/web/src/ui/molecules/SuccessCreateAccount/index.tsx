import { useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { useReactToPrint } from "react-to-print";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { PaperWallet } from "@polkadex/orderbook-ui/organisms";
import { useProfile } from "@orderbook/core/providers/user/profile";

import * as S from "./styles";

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
  mnemonic = "",
  account,
}: Props) => {
  const [state, setState] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const mnemonicRef = useRef<HTMLButtonElement | null>(null);

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
  const componentRef = useRef<HTMLDivElement | null>(null);
  const mnemonicArr = useMemo(() => {
    if (mnemonic) mnemonic?.split(" ");
    return [];
  }, [mnemonic]);
  const {
    userData: { userAccounts },
  } = useProfile();

  const controllerAccount = useMemo(
    () =>
      userAccounts?.find(
        ({ tradeAddress }) =>
          tradeAddress?.toLowerCase() === account?.address?.toLowerCase()
      ),
    [userAccounts, account?.address]
  );
  const handlePrint = useReactToPrint({
    content: () => componentRef?.current,
  });
  const copyAddress = async () => {
    if (account?.address) {
      await navigator.clipboard.writeText(account?.address);
      if (buttonRef.current) buttonRef.current.innerHTML = "Copied";
    }
  };

  const copyMnemonic = async () => {
    await navigator.clipboard.writeText(mnemonic);
    if (mnemonicRef.current) {
      mnemonicRef.current.innerHTML = "Copied";
      mnemonicRef.current.classList.add("active");
    }
  };

  const handleOnMouseOut = () => {
    if (mnemonicRef.current) {
      mnemonicRef.current.innerHTML = "Copy";
      mnemonicRef?.current.classList.remove("active");
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
            <button
              disabled={!account?.address?.length}
              ref={buttonRef}
              onClick={copyAddress}
            >
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
                    Save your account&apos;s mnemonic seed in a safe place. Do
                    not share it with anyone.
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
                <S.MnemonicFlex>
                  <S.WordsContainer>
                    {mnemonicArr?.map((value, i) => (
                      <div key={i}>{`${i + 1}. ${value}`}</div>
                    ))}
                  </S.WordsContainer>
                  <S.CopyButton
                    type="button"
                    onClick={copyMnemonic}
                    onMouseOut={handleOnMouseOut}
                    ref={mnemonicRef}
                  >
                    Copy
                  </S.CopyButton>
                </S.MnemonicFlex>
              )}
            </S.Words>
            <S.Words>
              <S.WordsWrapper>
                <S.WordsInfo>
                  <p>Paper wallet</p>
                  <span>
                    Download your paper wallet and scan the QR code from
                    Polkadex mobile App.
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
