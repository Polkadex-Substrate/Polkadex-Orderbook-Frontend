import * as S from "./styles";
import * as T from "./types";

import { Icon } from "@polkadex/orderbook-ui/molecules";

export const MyAccount = ({
  balance = "0.000000",
  address = "0x000000000",
  accountName = "Account",
  isFull = false,
  ...props
}: T.Props) => {
  return (
    <S.Wrapper isFull={isFull} {...props}>
      <Icon name="Avatar" background="secondaryBackground" size="giant" />
      <S.AccountInfo>
        <S.AccountInfoHeader>
          <p>
            {accountName} ({address})
          </p>
          <span>Estimated: {balance}</span>
        </S.AccountInfoHeader>
      </S.AccountInfo>
    </S.Wrapper>
  );
};
