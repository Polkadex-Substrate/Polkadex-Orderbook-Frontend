import { useRouter } from "next/router";

import * as S from "./styles";

export const Question = () => {
  const router = useRouter();
  const title = router.query.question;
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
};
