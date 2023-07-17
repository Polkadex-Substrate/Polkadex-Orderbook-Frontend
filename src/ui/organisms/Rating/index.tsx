import * as S from "./styles";
import * as T from "./types";
export const Rating = ({ onClick, value }: T.Props) => {
  const stars = ["worst", "average", "good", "best"];

  const getNumber = (value) => {
    if (value === "worst") return 0;
    else if (value === "average") return 1;
    else if (value === "good") return 2;
    else return 3;
  };
  return (
    <S.RatingWrapper>
      {" "}
      <S.Container>
        {stars.map((item, index) => {
          return (
            <S.Image key={item} onClick={() => onClick(item)}>
              <img
                src={getNumber(value) >= index ? "/img/pinkStar.svg" : "/img/greyStar.svg"}
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
