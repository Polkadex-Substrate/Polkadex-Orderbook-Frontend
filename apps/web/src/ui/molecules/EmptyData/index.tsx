import * as S from "./styles";

export const EmptyData = ({
  title = "You don't have any recent orders",
  image = "emptyData",
  alt = "Empty Orders",
  ...props
}) => {
  return (
    <S.Wrapper {...props}>
      <S.Container>
        <S.Box>
          <img src={`/img/${image}.png`} alt={alt} />
          <p>{title}</p>
        </S.Box>
      </S.Container>
    </S.Wrapper>
  );
};
