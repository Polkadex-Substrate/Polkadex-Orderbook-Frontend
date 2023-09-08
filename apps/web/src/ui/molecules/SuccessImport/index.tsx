import { useEffect } from "react";
import confetti from "canvas-confetti";
import { Icons } from "@polkadex/orderbook-ui/atoms";

import { Switch } from "../Switcher";

import * as S from "./styles";

export const SuccessImport = () => {
  useEffect(() => {
    confetti({
      zIndex: 9999,
      origin: {
        x: 0.8,
        y: 0.4,
      },
    });
  }, []);
  return (
    <S.Wrapper>
      <S.Title>
        <h3>Congratulations!</h3>
        <p>
          Now you can operate in orderbook, receive deposits and make
          withdrawals.
        </p>
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
        <S.DefaultAccount>
          <span>Default trade account</span>
          <Switch />
        </S.DefaultAccount>
      </S.Content>
    </S.Wrapper>
  );
};
