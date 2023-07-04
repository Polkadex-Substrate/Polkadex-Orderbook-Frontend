import { FAQsidebar } from "../FAQsidebar";

import * as S from "./styles";
const HomeLayout = ({ children }) => {
  return (
    <S.HomeLayout>
      {children}
      <FAQsidebar />
    </S.HomeLayout>
  );
};

export default HomeLayout;
