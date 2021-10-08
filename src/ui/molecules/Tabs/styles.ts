import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    & ul {
      list-style: none;
      padding: 1rem;
      border-radius: ${theme.border.radius.primary.small};
    }
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    margin-top: 0.3rem;
    padding: 1.5rem;
    background: ${theme.colors.primaryBackground};
    border-radius: ${theme.border.radius.primary.small};
  `}
`;

export const WrapperTab = styled.li``;
