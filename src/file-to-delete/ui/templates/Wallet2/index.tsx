import { useRouter } from "next/router";
import { useEffect, useState, MouseEvent } from "react";
import Head from "next/head";

import * as S from "./styles";

import { Tabs, TabContent, TabHeader, Icon } from "@polkadex/orderbook-ui/molecules";
import History from "@polkadex/orderbook/file-to-delete/v2/ui/organisms/History";
import { WalletContent } from "@polkadex/orderbook/v2/ui/molecules";
import Menu from "@polkadex/orderbook/v3/ui/organisms/Menu";
import Deposit from "@polkadex/orderbook/v3/ui/organisms/Deposit";
import Withdraw from "@polkadex/orderbook/file-to-delete/ui/organisms/Withdraw";

export const WalletTemplate = () => {
  // TODO: remove this component
  const router = useRouter();
  const [isDepositActive, setIsDepositActive] = useState(true);

  const handleWalletTabSelected = (tab: MouseEvent) => {
    const target = tab.target as HTMLElement;
    setIsDepositActive(target.outerText.toLowerCase().trim() === "deposit");
  };
  if (true) return <div />;
  return (
    <>
      <Head>
        <title>Wallet | Polkadex Orderbook</title>
        <meta name="description" content="High frequency trading but make it non-custodial" />
      </Head>
      <S.Wrapper>
        <Menu isWallet />
        <S.Main>
          <WalletContent />
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
