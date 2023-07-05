import Head from "next/head";

import * as S from "./styles";

// import { Menu } from "@polkadex/orderbook-ui/organisms/Menu";
import { FaqTopMessage } from "@polkadex/orderbook-ui/molecules";

export const FaqTemplate = () => {
  return (
    <>
      <Head>
        <title>FAQ | Polkadex Orderbook</title>
        <meta name="description" content="A new era in DeFi" />
      </Head>
      <S.Main>
        <FaqTopMessage />
        <S.Flex>
          {/* <Menu /> */}
          <S.Wrapper>Content</S.Wrapper>
        </S.Flex>
      </S.Main>
    </>
  );
};
