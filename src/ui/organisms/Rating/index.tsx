import * as S from "./styles";
import * as T from "./types";
export const Rating = ({ onClick, value }: T.Props) => {
  const stars = {
    worst: 0,
    average: 1,
    good: 2,
    best: 3,
  };

  const getNumber = (value) => {
    return stars[value];
  };
  return (
    <S.RatingWrapper>
      {" "}
      <S.Container>
        {Object.keys(stars).map((item) => {
          return (
            <S.Image key={item} onClick={() => onClick(item)}>
              <img
                src={
                  getNumber(value) >= stars[item] ? "/img/pinkStar.svg" : "/img/greyStar.svg"
                }
                alt=""
              />
            </S.Image>
          );
        })}
      </S.Container>
      <S.RatingText value={value}>{value}</S.RatingText>
    </S.RatingWrapper>
  );
};
