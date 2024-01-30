import { Button } from "@polkadex/ux";

import * as S from "./styles";

export const EmptyMyAccount = ({
  balances = false,
  hasLimit = false,
  image = "loginEmpty",
  title = "Looks like you're not logged in",
  description = "Explore a new way of trading with your own wallet!",
  buttonTitle = "Connect wallet",
  buttonAction = () => {},
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
      {buttonTitle && (
        <Button.Solid onClick={buttonAction} size="sm">
          {buttonTitle}
        </Button.Solid>
      )}
    </S.EmptyContainer>
  </S.Empty>
);
