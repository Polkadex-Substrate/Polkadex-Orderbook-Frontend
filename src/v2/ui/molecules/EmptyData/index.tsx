import * as S from "./styles";

export const EmptyData = ({ title = "You don't have any recent transactions" }) => {
  return (
    <S.Wrapper>
      <S.Container>
        <S.Box>
          <img src="/img/emptyData.png" alt="Empty Orders" />
          <p>{title}</p>
        </S.Box>
      </S.Container>
    </S.Wrapper>
  );
};
