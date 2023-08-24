import styled, { css } from "styled-components";

export const Wrapper = styled.div<{ isActive: boolean }>`
  ${({ theme, isActive }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.2rem 0.2rem 0.5rem 0.2rem;
    border-radius: 0.5rem;
    color: ${isActive && theme.colors.white};
    background-color: ${isActive ? theme.colors.primary : theme.colors.secondaryBackground};
    width: 100%;
    :hover {
      background: ${isActive ? theme.colors.primary : theme.colors.secondaryBackgroundOpacity};
    }
  `}
`;
