import * as S from "./styles";
import * as T from "./types";

export const SliderPercentage = ({
  percentage = "25%",
  percentageNum = 1,
  isActive = false,
  handleOnClick,
  isDisabled = false,
}: T.Props) => {
  return (
    <S.Wrapper
      isActive={isActive}
      onClick={() =>
        handleOnClick({
          percentage,
          percentageNum,
        })
      }
    >
      <button type="button" disabled={isDisabled}>
        {percentage}
      </button>
    </S.Wrapper>
  );
};
