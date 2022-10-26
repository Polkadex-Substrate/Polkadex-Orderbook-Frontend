import { useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { useReactToPrint } from "react-to-print";
import Link from "next/link";

import { Switch } from "../Switcher";

import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";
import { PaperWallet } from "@polkadex/orderbook-ui/organisms";

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
  useEffect(() => {
    confetti({
      zIndex: 9999,
      origin: {
        x: 0.8,
        y: 0.4,
      },
    });
  }, []);
  const IconComponent = Icons[state ? "Hidden" : "Show"];
  const componentRef = useRef();
  const mnemonicArr = useMemo(() => mnemonic?.split(" "), [mnemonic]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <S.Wrapper>
      {!!mnemonic?.length && (
        <div style={{ display: "none" }}>
          <PaperWallet mnemonic={mnemonicArr} mnemoicString={mnemonic} ref={componentRef} />
        </div>
      )}
      <S.Title>
        <h3>{title}</h3>
        <p>{description}</p>
      </S.Title>
      <S.Content>
        <S.Wallet>
          <p>
            {account?.name} <strong>(Linked to Orderbook testing)</strong>
          </p>
          <S.WalletContent>
            <button type="button">
              <Icons.Copy />
            </button>
            <span>{account?.address}</span>
          </S.WalletContent>
        </S.Wallet>
        {!!mnemonicArr?.length && (
          <S.Words>
            <S.WordsWrapper>
              <S.WordsInfo>
                <p>Mnemonic</p>
                <span>
                  Save your account&apos;s mnemonic seed in a safe place. Do not share it with
                  anyone.
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
              <>
                <S.WordsContainer>
                  {mnemonicArr?.map((value, i) => (
                    <div key={i}>{`${i + 1}. ${value}`}</div>
                  ))}
                </S.WordsContainer>
                <S.WordsFooter>
                  <span>Paper wallet</span>
                  <button type="button" onClick={handlePrint}>
                    <div>
                      <Icons.Print />
                    </div>
                    Print
                  </button>
                </S.WordsFooter>
              </>
            )}
          </S.Words>
        )}

        <S.DefaultAccount>
          <span>Default trade account</span>
          <Switch />
        </S.DefaultAccount>
      </S.Content>
    </S.Wrapper>
  );
};
