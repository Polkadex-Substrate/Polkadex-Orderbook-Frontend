import { useRouter } from "next/router";
import { useEffect } from "react";

import * as S from "./styles";

import { Header } from "@orderbook/v2/ui/organisms";
import { Tokens, History, Deposit, Withdraw } from "@polkadex/orderbook-ui/organisms";
import { Icon, Tabs, TabContent, TabHeader } from "@polkadex/orderbook-ui/molecules";
import { FlexCenter } from "@polkadex/orderbook-ui/atoms";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { selectHasUser, selectUserFetching } from "@polkadex/orderbook-modules";
import { MyWallet, WalletContent } from "@polkadex/orderbook/v2/ui/molecules";

export const WalletTemplate = () => {
  const router = useRouter();
  const user = useReduxSelector(selectHasUser);
  const isLoading = useReduxSelector(selectUserFetching);

  const { id } = router.query;
  // useEffect(() => {
  //   if (!isLoading && !user) router.push("/login");
  // }, []);

  if (!id) return <div />;
  return (
    <S.Main>
      <Header />
      <Tabs>
        <S.Wrapper>
          <WalletContent title="Tokens" locked={false} />
          <S.ContainerWrapper>
            <S.EstimateBalance>
              <S.EstimatedBalanceWrapper>
                <h2>Estimated Balance</h2>
                <p>0.93871332 BTC</p>
                <span>~4243.00 USD</span>
              </S.EstimatedBalanceWrapper>

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
            </S.EstimateBalance>
            <S.Grid>
              <S.Container>
                <S.TokenInfo>
                  <FlexCenter>
                    <Icon
                      name="Btc"
                      size="giant"
                      color="text"
                      style={{ marginRight: "0.8rem" }}
                      isToken
                    />
                    <div>
                      <span>Bitcoin</span>
                      <p>BTC</p>
                    </div>
                  </FlexCenter>
                  <FlexCenter>
                    <S.TokenInfoWrapper>
                      <Icon name="Wallet" size="medium" stroke="text" />
                    </S.TokenInfoWrapper>

                    <div>
                      <p>Available</p>
                      <span>0.9387332 BTC</span>
                    </div>
                  </FlexCenter>
                  <FlexCenter>
                    <S.TokenInfoWrapper>
                      <Icon name="Lock" size="medium" stroke="text" />
                    </S.TokenInfoWrapper>

                    <div>
                      <p>Locked</p>
                      <span>0.00000 BTC</span>
                    </div>
                  </FlexCenter>
                </S.TokenInfo>
                <TabContent>
                  <Deposit />
                </TabContent>
                <TabContent>
                  <Withdraw />
                </TabContent>
              </S.Container>
              <History />
            </S.Grid>
          </S.ContainerWrapper>
        </S.Wrapper>
      </Tabs>
    </S.Main>
  );
};
