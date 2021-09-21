import * as S from "./styles";

import { Skeleton } from "src/ui/components";

export const AssetInfo = ({ name = "", available = "", reserved = "" }) => (
  <S.Wrapper>
    <S.Container>
      {name ? (
        <p>{name}</p>
      ) : (
        <Skeleton height="10px" style={{ width: "3rem" }} />
      )}
    </S.Container>
    <S.Container>
      <span>
        <small>Available</small>
        {reserved ? (
          <strong>{available}</strong>
        ) : (
          <Skeleton
            height="10px"
            style={{ display: "inline-block", width: "5rem" }}
          />
        )}
      </span>
      <span>
        <small>Reserved</small>
        {reserved ? (
          <strong>{reserved}</strong>
        ) : (
          <Skeleton
            height="10px"
            style={{ display: "inline-block", width: "5rem" }}
          />
        )}
      </span>
    </S.Container>
  </S.Wrapper>
);
