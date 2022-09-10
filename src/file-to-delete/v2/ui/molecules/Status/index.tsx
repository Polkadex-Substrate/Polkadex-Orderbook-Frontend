import { Tooltip, TooltipHeader, TooltipContent } from "../../../../../ui/molecules";

import * as S from "./styles";
import * as T from "./types";

export const Status = ({ isActive = false, isLoading = true }: T.Props) => {
  const status = isActive ? "Keyring Connected" : "Inactive";

  return (
    <Tooltip>
      <TooltipHeader>
        <S.Wrapper isActive={isActive} isLoading={isLoading}>
          <div />
          <p>Status</p>
        </S.Wrapper>
      </TooltipHeader>
      <TooltipContent position="bottomCenter" minWidth="20rem">
        <S.Message>{isLoading ? "Loading" : status}</S.Message>
      </TooltipContent>
    </Tooltip>
  );
};
