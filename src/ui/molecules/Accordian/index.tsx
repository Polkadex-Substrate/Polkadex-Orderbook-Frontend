import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";

import { Icon } from "../Icon";

import * as S from "./styles";
import * as T from "./type";
export const Accordion = ({ title, questions }: T.Props): JSX.Element => {
  const [isExpanded, setExpand] = useState<boolean>();

  const contentRef = useRef<HTMLDivElement>();
  const contentHeight = isExpanded ? contentRef.current.scrollHeight : 0;

  const handleExpandToggle = useCallback(() => {
    setExpand(!isExpanded);
  }, [isExpanded]);

  const router = useRouter();
  const question = router.query.question;
  const item = "is this real";
  console.log(router.query.categories, `faq/${router.query.categories}/${item}`);

  return (
    <S.Container>
      <S.Title onClick={handleExpandToggle}>
        {title}
        {isExpanded ? (
          <Icon name="ArrowTopFilled" background="none" stroke="none" size="medium" />
        ) : (
          <Icon name="ArrowBottomFilled" background="none" stroke="none" size="medium" />
        )}
      </S.Title>
      <S.ContentWrapper maxHeight={contentHeight}>
        <S.Content ref={contentRef}>
          {questions.map((item) => {
            return (
              <S.Single
                href={`faq/${router.query.categories}/${item}`}
                active={question === item}
                key={item}>
                {item}?
              </S.Single>
            );
          })}
        </S.Content>
      </S.ContentWrapper>
    </S.Container>
  );
};
