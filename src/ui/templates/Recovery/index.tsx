import Link from "next/link";

import * as S from "./styles";

import { HeaderBack } from "@polkadex/orderbook-ui/organisms";
import { Button, Icon } from "@polkadex/orderbook-ui/molecules";
import { MnemonicImport } from "@polkadex/orderbook-ui/molecules/Mnemonic";

export const RecoveryTemplate = () => {
  return (
    <S.Main>
      <S.Wrapper>
        <S.Content>
          <HeaderBack />
          <S.Container>
            <S.AsideLeft>
              <S.Title>
                <h1>Import an account</h1>
                <p>
                  Do you have an account? <Link href="/login"> Sign in </Link>
                </p>
              </S.Title>
              <S.Form>
                <MnemonicImport
                  label="12-word mnemonic seed"
                  handleChange={() => console.log("...")}
                />
                <Button size="extraLarge" type="submit" style={{ marginTop: 20 }}>
                  Import Account
                </Button>
              </S.Form>
            </S.AsideLeft>
            <S.AsideRight></S.AsideRight>
          </S.Container>
        </S.Content>
        <S.Box>
          <S.Card>
            <S.CardContent>
              <Icon size="extraLarge" color="inverse" name="Mnemonic" />
              <h4>What do you use mnemonic for?</h4>
              <p>
                A Mnemonic Phrase is also called Seed Phrase or Recovery Backup for a
                decentralized wallet. It is a list of words and proof of ownership of your
                crypto assets. Polkadex does not store any information about your wallet.
                <strong>Never share your mnemonic phrase with anyone</strong>
              </p>
            </S.CardContent>
          </S.Card>
        </S.Box>
      </S.Wrapper>
    </S.Main>
  );
};
