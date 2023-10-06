import styled, { css } from "styled-components";
import media from "styled-media-query";
export const Tr = styled.tr`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    padding: 1.2rem;
    margin-bottom: 1.2rem;
    border-radius: 0 1rem 1rem 1rem;
    &:nth-child(even) {
      background: ${theme.colors.tertiaryBackgroundOpacity};
    }
  `}
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
      fill: ${isSell ? theme.colors.primary : theme.colors.green};
    }
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
