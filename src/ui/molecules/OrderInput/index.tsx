import * as S from "./styles";
import { Props } from "./types";

import { Skeleton } from "src/ui";

export const OrderInput = ({ token = "", label = "", ...props }: Props) => {
  return (
    <S.Wrapper>
      <label htmlFor={props.name}>{label}</label>
      <div>
        <input type="text" {...props} />
        {token ? (
          <span>{token}</span>
        ) : (
          <Skeleton height="10px" style={{ display: "inline-block", width: "2rem" }} />
        )}
      </div>
    </S.Wrapper>
  );
};
