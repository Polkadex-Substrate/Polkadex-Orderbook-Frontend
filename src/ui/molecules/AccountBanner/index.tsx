import Link from "next/link";

import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";

export const AccountBanner = ({ title, onClose }) => (
  <S.Wrapper>
    <S.Container>
      <S.Column>
        <img src="/img/welcomeBack.svg" alt="Man in tie with open arms welcoming" />
      </S.Column>
      <S.Content>
        <div>
          <h2>{title}</h2>
          <p>
            Looks like you’re using this browser for the first time.
            <br />
            <br />
            Please create a new trading account.
          </p>
        </div>
        <div>
          <button type="button" onClick={onClose}>
            Close
          </button>
          <Link href="/settings">Create Account</Link>
        </div>
      </S.Content>
    </S.Container>
    <S.Close type="button" onClick={onClose}>
      <Icons.Close />
    </S.Close>
  </S.Wrapper>
);
