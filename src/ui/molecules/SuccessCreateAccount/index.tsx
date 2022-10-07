import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

import { Switch } from "../Switcher";

import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";

export const SuccessCreateAccount = () => {
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
        <h3>Congratulations!</h3>
        <p>Now you can operate in orderbook, receive deposits and make withdrawals.</p>
      </S.Title>
      <S.Content>
        <S.Wallet>
          <p>
            Orderbook testing <strong>(Linked to Ordebrook testing)</strong>
          </p>
          <S.WalletContent>
            <button type="button">
              <Icons.Copy />
            </button>
            <span>5HmuAcVry1VWoK9vYvQ4zkGBHrXCcFYVuVfAur1gDAa7kaF8</span>
          </S.WalletContent>
        </S.Wallet>
        <S.Words>
          <S.WordsWrapper>
            <S.WordsInfo>
              <p>Mnemonic</p>
              <span>Never share your mnemonic seed with anyone.</span>
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
                {[
                  "witch",
                  "collapse",
                  "practive",
                  "feed",
                  "shame",
                  "tower",
                  "despair",
                  "road",
                  "again",
                  "ice",
                  "least",
                  "coffee",
                  "shame",
                  "open",
                ].map((value, i) => (
                  <div key={i}>{value}</div>
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

        <S.DefaultAccount>
          <span>Default trade account</span>
          <Switch />
        </S.DefaultAccount>
      </S.Content>
    </S.Wrapper>
  );
};
