import styled, { css } from "styled-components";

export const Wrapper = styled.div<{ width: string; height: string }>`
  ${({ width, height }) => css`
    width: ${width};
    height: ${height};
    text-align: center;
    display: inline-block;
    vertical-align: top;
  `}
`;
