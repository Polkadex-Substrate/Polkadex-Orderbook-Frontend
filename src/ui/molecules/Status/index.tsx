import * as S from "./styles";
import * as T from "./types";

export const Status = ({ isActive = false, isLoading = true }: T.Props) => {
  const status = isActive ? "Active" : "Inactive";

  return (
    <S.Wrapper isActive={isActive} isLoading={isLoading}>
      <div />
      <p>{isLoading ? "Loading" : status}</p>
    </S.Wrapper>
  );
};
