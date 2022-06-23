import styled, { css } from "styled-components";
import media from "styled-media-query";
export const Tr = styled.tr`
  background-color: #2e303c;
  padding: 1.2rem;
  margin-bottom: 1.2rem;
  border-radius: 0 1rem 1rem 1rem;
  :nth-child(even) {
    background-color: #24272e;
  }
`;
export const Td = styled.td``;
export const ContainerFlex = styled.div`
  display: flex;
  align-items: center;
`;

export const Image = styled.div<{ isSell?: boolean }>`
  ${({ theme, isSell }) => css`
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: 30rem;
    margin-right: 0.5rem;
    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  `}
`;
export const ContainerActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  ${media.lessThan("large")`
      justify-content:flex-start;
  `}
`;
export const Tag = styled.span`
  display: block;
  margin-bottom: 1rem;
  display: none;
  opacity: 0.5;
  ${media.lessThan("large")`
    display: block;
  `}
`;
