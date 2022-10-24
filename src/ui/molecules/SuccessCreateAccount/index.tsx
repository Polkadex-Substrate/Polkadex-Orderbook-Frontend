import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

import { Switch } from "../Switcher";

import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";

type Props = {
  title: string;
  description: string;
  mnemonic?: string[];
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
  return (
    <S.Wrapper>
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
        {!!mnemonic?.length && (
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
                <span>Hide</span>
              </S.WordsTitle>
            </S.WordsWrapper>
            {state && (
              <>
                <S.WordsContainer>
                  {mnemonic?.map((value, i) => (
                    <div key={i}>{`${i + 1}. ${value}`}</div>
                  ))}
                </S.WordsContainer>
                <S.WordsFooter>
                  <span>Paper wallet</span>
                  <button type="button">
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
