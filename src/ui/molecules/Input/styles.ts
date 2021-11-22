import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    padding: 1rem;
    border-radius: 1rem;
    background: ${theme.colors.secondaryBackgroundOpacity};
    label {
      font-size: ${theme.font.sizes.xsmall};
      font-weight: 600;
      width: 100%;
    }
    input {
      margin-top: 1rem;
      display: block;
      font-size: ${theme.font.sizes.small};
      color: ${theme.colors.text};
      width: 100%;
    }
  `}
`;

export const Primary = styled.div`
  ${({ theme }) => css`
    padding: 1.2rem;
    border-radius: 1rem;
    background: ${theme.colors.white};
    border: 1px solid ${theme.colors.secondaryBackground};
    label {
      font-size: ${theme.font.sizes.xsmall};
      width: 100%;
      color: ${theme.colors.black};
    }
    input {
      margin-top: 1rem;
      display: block;
      font-size: ${theme.font.sizes.small};
      color: ${theme.colors.black};
      width: 100%;
    }
  `}
`;
