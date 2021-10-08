import styled, { css } from "styled-components";
type Props = {
  isPositive: boolean;
};
export const Wrapper = styled.span<Props>`
  ${({ theme, isPositive }) => css`
    background: ${isPositive ? theme.colors.green : theme.colors.primary};
    font-size: ${theme.font.sizes.xxsmall};
    padding: 0.2rem;
    border-radius: 0.5rem;
    display: block;
    font-weight: 600;
    width: fit-content;
    height: fit-content;
  `}
`;
