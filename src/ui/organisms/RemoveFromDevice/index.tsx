import { useDispatch } from "react-redux";

import * as S from "./styles";

import { Button } from "@polkadex/orderbook-ui/molecules";
import { removeTradeAccountFromBrowser } from "@polkadex/orderbook-modules";

export const RemoveFromDevice = ({ handleClose, address }) => {
  const dispatch = useDispatch();
  return (
    <S.Wrapper>
      <S.Title>
        <h2>Remove account from the your browser</h2>
        <p>Don’t worry your funds are safe in the your main account</p>
      </S.Title>
      <S.Content>
        <S.Actions>
          <Button
            size="large"
            background="transparent"
            color="tertiraryText"
            type="button"
            onClick={handleClose}>
            Cancel
          </Button>
          <Button
            size="large"
            background="primary"
            type="submit"
            onClick={() => dispatch(removeTradeAccountFromBrowser({ address }))}>
            Continue
          </Button>
        </S.Actions>
      </S.Content>
    </S.Wrapper>
  );
};
