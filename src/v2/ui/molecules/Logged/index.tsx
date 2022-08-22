import Link from "next/link";

import * as S from "./styles";
export const Logged = () => {
  return (
    <S.Wrapper>
      <S.Container>
        <h2>Connect your wallet</h2>
        <p>Import your existing wallet, or create a new wallet</p>
        <div>
          <Link href="/signIn">Login</Link>
          <Link href="/sign">Create New Wallet</Link>
        </div>
      </S.Container>
    </S.Wrapper>
  );
};
