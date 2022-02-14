import * as S from "./styles";

export const EmptyData = ({
  title = "You don't have any recent transactions",
  image = "emptyData",
  alt = "Empty Orders",
}) => {
  return (
    <S.Wrapper>
      <S.Container>
        <S.Box>
          <img src={`/img/${image}.png`} alt={alt} />
          <p>{title}</p>
        </S.Box>
      </S.Container>
    </S.Wrapper>
  );
};
