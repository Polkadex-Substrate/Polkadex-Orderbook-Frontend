import { useCallback, useState } from "react";
import { useTranslation } from "next-i18next";

import { FAQsidebar } from "../FAQsidebar";

import * as S from "./styles";
const FAQLayout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const closeSidebar = useCallback(() => {
    setShowSidebar(false);
  }, []);

  const { t: translation } = useTranslation("organisms");
  const t = (key: string) => translation(`faqLayout.${key}`);

  return (
    <S.HomeLayout>
      {children}
      <FAQsidebar closeSidebar={closeSidebar} show={showSidebar} />
      <S.Sticker onClick={() => setShowSidebar(true)}>
        {t("stillHaveQuestions")}
      </S.Sticker>
    </S.HomeLayout>
  );
};

export default FAQLayout;
