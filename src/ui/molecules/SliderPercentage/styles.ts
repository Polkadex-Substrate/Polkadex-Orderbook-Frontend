import styled, { css } from "styled-components";

export const Wrapper = styled.div<{isActive: boolean}>`
  ${({ theme, isActive }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: ${isActive? theme.colors.primary : theme.colors.tertiaryBackground};
    width: 100%;
    :hover {
      background: ${isActive? theme.colors.primary : theme.colors.secondaryBackgroundOpacity};
    }
  `}
`;
