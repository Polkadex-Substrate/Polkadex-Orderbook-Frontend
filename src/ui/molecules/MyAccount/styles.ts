import styled, { css } from "styled-components";

export const Wrapper = styled.div<{ isHeader: boolean }>`
  ${({ theme, isHeader }) => css`
    display: flex;
    align-items: center;
    background-color: ${isHeader
      ? theme.colors.secondaryBackground
      : "transparent"};
    border-radius: 1rem;
    padding: 0.6rem;
  `}
`;

export const AccountInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 0.5rem;
`;

export const AccountInfoHeader = styled.div`
  ${({ theme }) => css`
    margin-right: 1.5rem;
    p {
      font-size: ${theme.font.sizes.xsmall};
      font-weight: 600;
      display: inline-block;
      line-height: 1;
    }
    span {
      display: block;
      font-size: ${theme.font.sizes.xxsmall};
    }
  `}
`;

export const AccountContent = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.tertiaryBackground};
    border-radius: 1.4rem;
    width: 100%;
    box-shadow: ${theme.shadow.primary};
  `}
`;

export const AccountContentHeader = styled.div`
  padding: 1rem;
  margin-top: 1rem;
`;

export const AccountContentInfo = styled.div`
  padding: 0 1rem;
  :first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    a {
      margin-right: 4rem;
      opacity: 0.6;
      font-size: 1.1rem;
    }
  }
  :last-child {
    margin-top: 1.5rem;
    font-size: 1.2rem;
    p {
      opacity: 0.6;
      display: inline-block;
    }
    a {
      margin-left: 0.5rem;
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

export const AccountContentSection = styled.div`
  padding: 1rem;
  a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
`;

export const AccountContentFooter = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.secondaryBackground};
    border-radius: 1.4rem;
    text-align: center;
    margin-top: 0.7rem;
  `}
`;
