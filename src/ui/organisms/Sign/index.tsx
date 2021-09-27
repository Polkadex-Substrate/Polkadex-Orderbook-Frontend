import Link from "next/link";
import { useState } from "react";

import * as S from "./styles";

import { Icon, TabHeader, TabContent, Tabs, Button, Dropdown } from "src/ui/components";
import { MyAccountHeader, MyCurrentAccount } from "src/ui/organisms";
import { Checkbox, Input, MnemonicImport, MnemonicExport } from "src/ui/molecules";

export const SignContent = () => {
  return (
    <S.Wrapper>
      <S.Title>
        <Icon icon="Wallet" />
        <h3>Connect to wallet</h3>
      </S.Title>
      <S.Content>
        <Tabs>
          <div>
            <h4>I want</h4>
            <S.TabHeader>
              <TabHeader>
                <S.ListItem>Create an account</S.ListItem>
              </TabHeader>
              <TabHeader>
                <S.ListItem>Sign In</S.ListItem>
              </TabHeader>
            </S.TabHeader>
          </div>

          <S.TabContent>
            <TabContent>
              <CreateAccount />
            </TabContent>
            <TabContent>
              <Login />
            </TabContent>
          </S.TabContent>
        </Tabs>
      </S.Content>
    </S.Wrapper>
  );
};

const CreateAccount = () => {
  const [state, setstate] = useState(false);

  const phrases = [
    "witch",
    "collapse",
    "practice",
    "feed",
    "shame",
    "open",
    "despair",
    "road",
    "again",
    "ice",
    "least",
    "coffee",
  ];
  return (
    <S.SignUpWrapper>
      <S.SignUpConteiner>
        {state ? (
          <MnemonicImport
            value="witch collapse practice feed shame open despair road again ice least coffee"
            label="12-word mnemonic seed"
            onChange={() => setstate(false)}
          />
        ) : (
          <MnemonicExport
            label="12-word mnemonic seed"
            onChange={() => setstate(true)}
            phrases={phrases}
          />
        )}
        <p>
          The mnemonic can be used to restore your wallet. Having the mnemonic phrases can have
          a full control over the assets.
        </p>
      </S.SignUpConteiner>

      <Input
        label="Account name"
        placeholder="Enter a name fot this account"
        type="text"
        onChange={(e) => console.log(e.currentTarget.value)}
      />
      <Input
        label="Password"
        placeholder="Enter a new password fot this account"
        type="password"
        onChange={(e) => console.log(e.currentTarget.value)}
      />
      <Checkbox label="I have saved my mnemonic seed safely" />
      <Button
        title="Sign In"
        type="submit"
        style={{ width: "100%", marginTop: 20, justifyContent: "center" }}
      />
    </S.SignUpWrapper>
  );
};

const Login = () => {
  return (
    <S.LoginWrapper>
      <h4>Sign In</h4>
      <form>
        <MyCurrentAccount />
        <Input
          label="Password"
          placeholder="Enter a new password fot this account"
          type="password"
          onChange={(e) => console.log(e.currentTarget.value)}
        />
        <Button
          title="Sign In"
          type="submit"
          style={{ width: "100%", marginTop: 20, justifyContent: "center" }}
        />
      </form>
    </S.LoginWrapper>
  );
};
