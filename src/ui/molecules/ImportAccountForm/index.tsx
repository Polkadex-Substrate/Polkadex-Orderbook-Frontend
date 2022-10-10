import { Switch } from "../Switcher";

import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";

export const ImportAccountForm = ({ onCancel = undefined }) => (
  <S.Wrapper>
    <S.Method>
      <span>Import wallet method</span>
      <div>
        <label htmlFor="mnemonic">
          <input type="radio" id="mnemonic" name="mnemonic" value="mnemonic" />
          Mnemonic phrase
        </label>

        <label htmlFor="json">
          <input disabled type="radio" id="json" name="json" value="json" />
          Json file
        </label>

        <label htmlFor="ledger">
          <input disabled type="radio" id="ledger" name="ledger" value="ledger" />
          Ledger device
        </label>
      </div>
    </S.Method>
    <S.Words>
      <S.WordsWrapper>
        <div>
          <Icons.Info />
        </div>
        <span>12-word mnemonic seed</span>
      </S.WordsWrapper>
      <S.WordsContainer>
        {["tower", "despair", "road", "again", "ice", "least", "coffee", "shame", "open"].map(
          (value, i) => (
            <div key={i}>{value}</div>
          )
        )}
        <input type="text" value="Ma" />
      </S.WordsContainer>
      <S.WorrdsFooter>Click to paste</S.WorrdsFooter>
    </S.Words>
    <S.WalletName>
      <div>
        <span>Wallet Name</span>
        <input type="text" value="Occasional-chamois" />
      </div>
      <button type="button">Random</button>
    </S.WalletName>
    <S.Password>
      <S.PasswordHeader>
        <span>Protect by password</span>
        <Switch />
      </S.PasswordHeader>
      <S.PasswordFooter>
        <input type="text" value="*********" />
        <button type="button">
          <Icons.Show />
        </button>
      </S.PasswordFooter>
    </S.Password>
    <S.Footer>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
      <button type="submit">Import account</button>
    </S.Footer>
  </S.Wrapper>
);
