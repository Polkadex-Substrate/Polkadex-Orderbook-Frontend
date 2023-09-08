import styled, { css } from "styled-components";

import { InputProps } from ".";

const inputModifier = {
  Flex: () => css`
    display: flex;
    flex-direction: row;
  `,
};

export const Wrapper = styled.div`
  margin-bottom: 2rem;
`;
export const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Label = styled.label`
  ${({ theme }) => css`
    font-size: 1.2rem;
    color: ${theme.colors.text};
    font-weight: 500;
    svg {
      display: inline-block;
      width: 1.1rem;
      height: 1.1rem;
      margin-right: 0.5rem;
    }
  `}
`;
export const Box = styled.div<Partial<InputProps>>`
  ${({ theme, inputInfo, fullWidth }) => css`
    padding: 1rem;
    border-bottom: 0.1rem solid ${theme.colors.secondaryBackground};
    width: ${fullWidth ? "100%" : "20rem"};
    transition: border 0.5s ease-in-out;
    ${inputInfo && inputModifier.Flex()}
    &:hover {
      border-bottom-color: ${theme.colors.text};
    }
  `}
`;
export const Span = styled.span`
  color: #8ba1be;
`;

export const Input = styled.input`
  ${({ theme }) => css`
    width: 100%;
    color: ${theme.colors.text};
  `}
`;
