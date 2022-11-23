import * as S from "./styles";
import * as T from "./types";

export const SliderPercentage = ({
  percentage = "25%",
  percentageNum = 1,
  isActive = false,
  handleOnClick,
}: T.Props) => {
  return (
    <S.Wrapper
      isActive={isActive}
      onClick={() =>
        handleOnClick({
          percentage,
          percentageNum,
        })
      }>
      <button type="button">{percentage}</button>
    </S.Wrapper>
  );
};
