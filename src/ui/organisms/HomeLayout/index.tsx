import { FAQsidebar } from "../FAQsidebar";

import * as S from "./styles";
const HomeLayout = ({ children }) => {
  return (
    <S.HomeLayout>
      <div>{children}</div>
      <FAQsidebar />
    </S.HomeLayout>
  );
};

export default HomeLayout;
