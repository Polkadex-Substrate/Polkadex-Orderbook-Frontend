import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  user-select: none;
`;
export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    place-items: center;
    gap: 1rem;
    background: ${theme.colors.primaryBackgroundOpacity};
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 0.3rem;
    padding: 0.25rem;
    svg {
      stroke: ${theme.colors.text};
    }
  `}
`;
