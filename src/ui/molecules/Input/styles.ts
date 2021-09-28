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

export const MnemonicContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      display: block;
      font-size: ${theme.font.sizes.xxsmall};
      white-space: nowrap;
      transition: all 0.5s;
      opacity: 0.7;
      :hover {
        opacity: 1;
      }
    }
  `}
`;

export const MnemonicAction = styled.button`
  text-align: center;
  width: 100%;
  margin-top: 2rem;
  position: relative;
`;

export const TagsContainer = styled.div`
  ${({ theme }) => css`
    margin-top: 1.2rem;
    display: flex;
    flex-wrap: wrap;
  `}
`;

export const Tag = styled.span`
  ${({ theme }) => css`
    padding: 0.5rem;
    border-radius: 0.5rem;
    background: ${theme.colors.secondaryBackground};
    width: fit-content;
    margin-bottom: 0.5rem;
    :not(:last-child) {
      margin-right: 0.5rem;
    }
  `}
`;
