import Link from "next/link";

import * as S from "./styles";

export const EmptyMyAccount = ({
  balances = false,
  hasLimit = false,
  image = "loginEmpty",
  title = "Looks like you're not logged in",
  description = "Explore a new way of trading with your own wallet!",
  primaryLink = "/sign",
  primaryLinkTitle = "Sign Up",
  secondaryLink = "/signIn",
  secondaryLinkTitle = "Login",
}) => (
  <S.Empty balances={balances} hasLimit={hasLimit}>
    <S.EmptyContainer>
      <S.EmptyHeader>
        <figure>
          <img
            src={`/img/${image}.svg`}
            alt="Hand coming out of a smartphone with a pen in hand"
          />
        </figure>
      </S.EmptyHeader>
      <S.EmptyContent>
        <h2>{title}</h2>
        <p>{description}</p>
        <S.EmptyActions hasLimit={hasLimit}>
          <Link href={primaryLink}>{primaryLinkTitle}</Link>
          <Link href={secondaryLink}>{secondaryLinkTitle}</Link>
          <div />
        </S.EmptyActions>
      </S.EmptyContent>
    </S.EmptyContainer>
  </S.Empty>
);
