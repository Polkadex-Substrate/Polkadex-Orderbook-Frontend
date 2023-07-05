import { useCallback, useState } from "react";

import { FAQsidebar } from "../FAQsidebar";

import * as S from "./styles";
const HomeLayout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const closeSidebar = useCallback(() => {
    setShowSidebar(false);
  }, []);
  return (
    <S.HomeLayout>
      {children}
      <FAQsidebar closeSidebar={closeSidebar} show={showSidebar} />
      <S.Sticker onClick={() => setShowSidebar(true)}>Still have questions?</S.Sticker>
    </S.HomeLayout>
  );
};

export default HomeLayout;
