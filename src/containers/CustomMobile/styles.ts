import styled, { css } from "styled-components";
import { WrapperIcon } from "src/components/CustomIcon/styles";

export const Wrapper = styled.section`
  ${({ theme }) => css`
    background: ${theme.colors.primaryBackground};
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;
