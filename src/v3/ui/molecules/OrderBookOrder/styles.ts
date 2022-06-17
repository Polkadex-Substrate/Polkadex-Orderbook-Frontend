import styled, { css } from "styled-components";

export const Tr = styled.tr`
  margin-bottom: 1.2rem;
  border-radius: 0 1rem 1rem 1rem;
`;
export const Td = styled.td``;
export const ContainerFlex = styled.div`
  display: flex;
  align-items: center;
`;

export const Image = styled.img`
  margin: 0 1rem;
  width: 1.5rem;
`;
export const Span = styled.span<{ sell?: boolean }>`
  ${({ theme, sell }) => css`
    color: ${sell ? theme.colors.primary : theme.colors.green};
  `}
`;
