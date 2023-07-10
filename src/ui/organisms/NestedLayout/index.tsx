import { useRouter } from "next/router";
import { useState } from "react";

import { FAQquestionBar } from "../FAQquestionBar";

import * as S from "./styles";

import { FAQHeader } from "@polkadex/orderbook-ui/molecules/FAQHeader";
import { Icon } from "@polkadex/orderbook-ui/molecules";

export const NestedLayout = ({ children }) => {
  const router = useRouter();
  const pathname = `/faq/${router.query.categories}/${router.query.question}`;
  const [showQuestionBar, setShowQuestionBar] = useState(false);
  return (
    <S.Container>
      <S.Menu onClick={() => setShowQuestionBar(!showQuestionBar)}>
        <Icon name="ArrowRightFilled" size="small" />
        <p>Menu</p>
      </S.Menu>
      <FAQHeader noBorder pathname={pathname} />
      <S.Wrapper>
        <FAQquestionBar show={showQuestionBar} />
        {children}
      </S.Wrapper>
    </S.Container>
  );
};
