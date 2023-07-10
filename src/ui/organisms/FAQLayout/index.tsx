import { useState } from "react";
import dynamic from "next/dynamic";

import * as S from "./styles";

const FAQsidebar = dynamic(
  () => import("@polkadex/orderbook-ui/organisms").then((mod) => mod.FAQsidebar),
  {
    ssr: false,
  }
);

const FAQLayout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <S.HomeLayout>
      {children}
      <FAQsidebar closeSidebar={() => setShowSidebar(false)} show={showSidebar} />
      <S.Sticker onClick={() => setShowSidebar(true)}>Still have questions?</S.Sticker>
    </S.HomeLayout>
  );
};

export default FAQLayout;
