import * as S from "./styles";

export const FAQHeader = ({ heading, lastCrumb }) => {
  return (
    <S.Header>
      <S.BreadCrumbWrapper>
        Home/<S.LastCrumb>{lastCrumb}</S.LastCrumb>
      </S.BreadCrumbWrapper>
      <S.Heading>{heading}</S.Heading>
    </S.Header>
  );
};
