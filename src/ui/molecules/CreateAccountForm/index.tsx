import { Switch } from "../Switcher";

import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";
import { Dropdown } from "@polkadex/orderbook/v3/ui/molecules";

export const CreateAccountForm = () => (
  <S.Wrapper>
    <S.WalletSelect>
      <Dropdown>
        <Dropdown.Trigger>
          <S.WalletSelectWrapper>
            <S.WalletSelectContainer>
              <S.WalletSelectContent>
                <div>
                  <Icons.Info />
                </div>
                <span>Controller account</span>
              </S.WalletSelectContent>
              <p>
                Orderbook testing <strong> • 5E1hRUGF5rCs...juU4NKGrX5P8</strong>{" "}
              </p>
            </S.WalletSelectContainer>
            <S.WalletSelectArrow>
              <Icons.ArrowBottom />
            </S.WalletSelectArrow>
          </S.WalletSelectWrapper>
        </Dropdown.Trigger>
        <Dropdown.Menu fill="secondaryBackgroundSolid">
          <Dropdown.Item>Test</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <small>18/30</small>
    </S.WalletSelect>
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
      <button type="button">Cancel</button>
      <button type="submit">Create Account</button>
    </S.Footer>
  </S.Wrapper>
);
