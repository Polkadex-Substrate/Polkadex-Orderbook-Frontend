import dynamic from "next/dynamic";

import * as S from "./styles";

const Header = dynamic(
  () => import("@orderbook/v3/ui/organisms/Header").then((mod) => mod.Header),
  {
    ssr: false,
  }
);

export const Trading = () => {
  return (
    <S.Main>
      <Header />
    </S.Main>
  );
};
