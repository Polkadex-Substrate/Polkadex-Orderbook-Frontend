import Link from "next/link";

import * as S from "./styles";

import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { selectIsUserSignedIn } from "@polkadex/orderbook-modules";

const data = [
  {
    title: "It seems that you are not logged in",
    description: "Explore a new way to trade with your own wallet!",
    linkOne: "/signUp",
    linkOneText: "Sign Up",
    linkTwo: "/sign",
    linkTwoText: "Login",
  },
  {
    title: "Connect your Trading Account",
    description: "Connect your existing trading account, or create a new one",
    linkOne: "/createAccount",
    linkOneText: "Create Account",
    linkTwo: "/settings",
    linkTwoText: "Connect Account",
  },
];

export const Logged = () => {
  const hasUser = useReduxSelector(selectIsUserSignedIn);
  const selectedData = !hasUser ? data[0] : data[1];

  return (
    <S.Wrapper>
      <S.Container>
        <h2>{selectedData.title}</h2>
        <p>{selectedData.description}</p>
        <div>
          <Link href={selectedData.linkOne}>{selectedData.linkOneText}</Link>
          <Link href={selectedData.linkTwo}>{selectedData.linkTwoText}</Link>
        </div>
      </S.Container>
    </S.Wrapper>
  );
};
