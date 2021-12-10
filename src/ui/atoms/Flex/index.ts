import styled from "styled-components";

export const FlexCenter = styled.div`
  display: flex;
  align-items: center;
`;

export const FlexSpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 578px) {
    p {
      max-width: 15rem;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
`;
