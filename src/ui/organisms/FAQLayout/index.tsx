import { useState } from "react";
import dynamic from "next/dynamic";

import * as S from "./styles";

import { FaqTopMessage } from "@polkadex/orderbook-ui/molecules";

const FAQsidebar = dynamic(
  () => import("@polkadex/orderbook-ui/organisms").then((mod) => mod.FAQsidebar),
  {
    ssr: false,
  }
);

const Header = dynamic(
  () => import("@polkadex/orderbook-ui/organisms").then((mod) => mod.Header),
  {
    ssr: false,
  }
);

const Menu = dynamic(
  () => import("@polkadex/orderbook-ui/organisms").then((mod) => mod.Menu),
  {
    ssr: false,
  }
);

const FAQLayout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <S.HomeLayout>
      <Header />
      <S.Flex>
        <Menu />
        <S.Container>
          <FaqTopMessage />
          <S.Wrapper>
            {children}
            <FAQsidebar closeSidebar={() => setShowSidebar(false)} show={showSidebar} />
            <S.Sticker onClick={() => setShowSidebar(true)}>Still have questions?</S.Sticker>
          </S.Wrapper>
        </S.Container>
      </S.Flex>
    </S.HomeLayout>
  );
};

export default FAQLayout;
