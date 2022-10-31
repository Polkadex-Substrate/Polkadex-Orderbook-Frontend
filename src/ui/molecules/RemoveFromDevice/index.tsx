import * as S from "./styles";

import { Button } from "@polkadex/orderbook-ui/molecules";

export const RemoveFromDevice = ({ onAction, onClose }) => (
  <S.Wrapper>
    <S.Title>
      <h2>Remove this account from your browser?</h2>
      <p>Don’t worry your funds are safe in your funding account</p>
    </S.Title>
    <S.Content>
      <S.Actions>
        <Button
          size="large"
          background="transparent"
          color="tertiaryText"
          type="button"
          onClick={onClose}>
          Cancel
        </Button>
        <Button
          size="large"
          color="white"
          background="primary"
          type="submit"
          onClick={onAction}>
          Continue
        </Button>
      </S.Actions>
    </S.Content>
  </S.Wrapper>
);
