import { useRouter } from "next/router";
import { useEffect } from "react";

import * as S from "./styles";

import { Header } from "@orderbook/v2/ui/organisms";
import { Tokens, History, Deposit, Withdraw } from "@polkadex/orderbook-ui/organisms";
import { Icon, Tabs, TabContent, TabHeader } from "@polkadex/orderbook-ui/molecules";
import { FlexCenter } from "@polkadex/orderbook-ui/atoms";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { selectHasUser, selectUserFetching } from "@polkadex/orderbook-modules";

export const WalletTemplate = () => {
  const router = useRouter();
  const user = useReduxSelector(selectHasUser);
  const isLoading = useReduxSelector(selectUserFetching);

  const { id } = router.query;
  useEffect(() => {
    if (!isLoading && !user) router.push("/login");
  }, [isLoading, user, router]);

  if (!id) return <div />;
  return (
    <S.Main>
      <Header />
      <S.Wrapper>
        <Tokens />
        <S.Grid>
          <S.Container>
            <S.EstimateBalance>
              <h2>Estimated Balance</h2>
              <p>0.93871332 BTC</p>
              <span>~4243.00 USD</span>
            </S.EstimateBalance>
            <S.TokenInfo>
              <FlexCenter>
                <Icon
                  name="Btc"
                  size="giant"
                  background="secondaryBackground"
                  style={{ marginRight: "0.8rem" }}
                  isToken
                />
                <div>
                  <span>Bitcoin</span>
                  <p>BTC</p>
                </div>
              </FlexCenter>
              <FlexCenter>
                <Icon
                  name="Wallet"
                  size="extraLarge"
                  stroke="text"
                  style={{ marginRight: "0.8rem", padding: "0.5rem" }}
                />
                <div>
                  <p>Available</p>
                  <span>0.9387332 BTC</span>
                </div>
              </FlexCenter>
              <FlexCenter>
                <Icon
                  name="Locked"
                  size="extraLarge"
                  background="primaryBackground"
                  style={{ marginRight: "0.8rem" }}
                />
                <div>
                  <p>Locked</p>
                  <span>0.00000 BTC</span>
                </div>
              </FlexCenter>
            </S.TokenInfo>
            <Tabs>
              <S.HeaderContainer>
                <S.Header>
                  <TabHeader>
                    <S.Tab color="green">Deposit</S.Tab>
                  </TabHeader>
                  <TabHeader>
                    <S.Tab color="primary">Withdraw</S.Tab>
                  </TabHeader>
                </S.Header>
              </S.HeaderContainer>
              <TabContent>
                <Deposit />
              </TabContent>
              <TabContent>
                <Withdraw />
              </TabContent>
            </Tabs>
          </S.Container>
          <History />
        </S.Grid>
      </S.Wrapper>
    </S.Main>
  );
};
