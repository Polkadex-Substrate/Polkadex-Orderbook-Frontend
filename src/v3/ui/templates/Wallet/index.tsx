import { useRouter } from "next/router";
import { useEffect } from "react";
import dynamic from "next/dynamic";

import * as S from "./styles";

import { Tabs, TabContent, TabHeader, Icon } from "@polkadex/orderbook-ui/molecules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { selectHasUser, selectUserFetching } from "@polkadex/orderbook-modules";
import History from "@polkadex/orderbook-ui/organisms/History";
import { WalletContent } from "@polkadex/orderbook/v2/ui/molecules";
import Withdraw from "@polkadex/orderbook-ui/organisms/Withdraw";
const Menu = dynamic(() => import("@polkadex/orderbook/v3/ui/organisms/Menu"), {
  ssr: false,
});
const Deposit = dynamic(() => import("@polkadex/orderbook/v3/ui/organisms/Deposit"), {
  ssr: false,
});

export const WalletTemplate = () => {
  const router = useRouter();
  const user = useReduxSelector(selectHasUser);
  const isLoading = useReduxSelector(selectUserFetching);

  // useEffect(() => {
  //   if (!isLoading && !user) router.push("/login");
  // }, [isLoading, user, router]);

  // if (!user) return <div />;
  return (
    <S.Wrapper>
      <Menu isWallet />
      <WalletContent hasMargin title="Tokens" locked={false} hasLink={false} />
      <Tabs>
        <S.Content>
          <S.ContainerWrapper>
            <S.GoBack onClick={() => router.back()}>
              <Icon name="SingleArrowLeft" size="extraSmall" />
              Go back
            </S.GoBack>

            <S.EstimateBalance>
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
        </S.Content>
      </Tabs>
    </S.Wrapper>
  );
};
