import * as S from "./styles";

import ConnectWalletButton from "@/ui/organisms/Header/connect";

export const EmptyMyAccount = ({
  balances = false,
  hasLimit = false,
  image = "loginEmpty",
  title = "Looks like you're not logged in",
  description = "Explore a new way of trading with your own wallet!",
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
      </S.EmptyContent>
      <ConnectWalletButton />
    </S.EmptyContainer>
  </S.Empty>
);
