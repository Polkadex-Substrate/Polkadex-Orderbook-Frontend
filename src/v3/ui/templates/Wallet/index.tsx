import { useRouter } from "next/router";
import { useEffect, useState, MouseEvent } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

import * as S from "./styles";

import { Tabs, TabContent, TabHeader, Icon } from "@polkadex/orderbook-ui/molecules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { selectHasUser, selectUserFetching } from "@polkadex/orderbook-modules";
import History from "@polkadex/orderbook-ui/organisms/History";
import { WalletContent } from "@polkadex/orderbook/v2/ui/molecules";
const Menu = dynamic(() => import("@polkadex/orderbook/v3/ui/organisms/Menu"), {
  ssr: false,
});
const Deposit = dynamic(() => import("@polkadex/orderbook/v3/ui/organisms/Deposit"), {
  ssr: false,
});
const Withdraw = dynamic(() => import("@polkadex/orderbook/ui/organisms/Withdraw"), {
  ssr: false,
});

export const WalletTemplate = () => {
  const router = useRouter();
  const user = useReduxSelector(selectHasUser);
  const isLoading = useReduxSelector(selectUserFetching);
  const [isDepositActive, setIsDepositActive] = useState(true);

  const handleWalletTabSelected = (tab: MouseEvent) => {
    const target = tab.target as HTMLElement;
    setIsDepositActive(target.outerText.toLowerCase().trim() === "deposit");
  };

  useEffect(() => {
    if (!isLoading && !user) router.push("/login");
  }, [isLoading, user, router]);

  if (!user) return <div />;
  return (
    <>
      <Head>
        <title>Wallet | Polkadex Orderbook</title>
        <meta name="description" content="High frequency trading but make it non-custodial" />
      </Head>
      <S.Wrapper>
        <Menu isWallet />
        <S.Main>
          <WalletContent hasMargin title="Tokens" locked={false} hasLink={false} isWallet />
          <Tabs>
            <S.Content>
              <S.ContainerWrapper>
                <S.GoBack onClick={() => router.back()}>
                  <Icon name="SingleArrowLeft" size="extraSmall" />
                  Go back
                </S.GoBack>

                <S.EstimateBalance>
                  <S.HeaderContainer>
                    <S.Header onClick={(e) => handleWalletTabSelected(e)}>
                      <TabHeader>
                        <S.Tab color="green">Deposit</S.Tab>
                      </TabHeader>
                      {/* <TabHeader>
                        <S.Tab color="primary">Withdraw</S.Tab>
                      </TabHeader> */}
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
                  <History isDepositActive={isDepositActive} />
                </S.Grid>
              </S.ContainerWrapper>
            </S.Content>
          </Tabs>
        </S.Main>
      </S.Wrapper>
    </>
  );
};
