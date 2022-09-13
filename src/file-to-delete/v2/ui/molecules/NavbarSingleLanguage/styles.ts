import styled, { css } from "styled-components";

export const Image = styled.img``;

export const WrapperSingleLanguage = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  & :hover {
    opacity: 0.8;
  }
  & :not(:last-child) {
    margin-bottom: 0.8rem;
  }

  & ${Image} {
    margin-right: 0.5rem;
    width: 2rem;
    height: 2rem;
  }
`;

export const Title = styled.span`
  margin-right: 0.5rem;
`;
