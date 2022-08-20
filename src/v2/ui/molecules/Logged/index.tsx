import Link from "next/link";

import * as S from "./styles";
export const Logged = () => {
  return (
    <S.Wrapper>
      <S.Container>
        <h2>Connect your Trading Account</h2>
        <p>Import your existing wallet, or create a new wallet</p>
        <div>
          <Link href="/accountManager">Use Existing</Link>
          <Link href="/sign">Create New</Link>
        </div>
      </S.Container>
    </S.Wrapper>
  );
};
