import * as S from "./styles";

import {
  Logo,
  ThemeSwitch,
  Dropdown,
  Button,
  Toolbar,
  MyAccountContent,
  MyAccountHeader,
  SignContent,
} from "src/ui";
import { useReduxSelector, useWindowSize } from "src/hooks";
import { selectUserInfo } from "src/modules";

export const Header = () => {
  const user = useReduxSelector(selectUserInfo);

  const { width } = useWindowSize();
  return (
    <S.Wrapper>
      <S.Container>
        <S.Column>
          <Logo />
          {width >= 880 && <Toolbar />}
        </S.Column>
        <S.Column>
          <ThemeSwitch />
          {user.address ? (
            <Dropdown
              isOpacity
              variant={2}
              style={{ top: 0 }}
              title={<MyAccountHeader accountName={user.username} address={user.address} />}
              direction="bottom">
              <MyAccountContent accountName={user.username} address={user.address} />
            </Dropdown>
          ) : (
            <Dropdown
              isOpacity
              style={{ top: 0 }}
              title={<Button title="Connect to a Wallet" />}
              direction="bottomLeft"
              variant={2}>
              <SignContent />
            </Dropdown>
          )}
        </S.Column>
      </S.Container>
    </S.Wrapper>
  );
};
