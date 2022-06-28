import styled, { css } from "styled-components";

export const LoadingWrapper = styled.div`
  ${({ theme }) => css`
    position: absolute;
    width: 100%;
    z-index: 20;
    height: 100%;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.tertiaryBackground};
  `}
`;

export const LoadingeMessage = styled.div`
  display: flex;
  align-items: center;
  background: gray;
`;
export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Container = styled.div`
  flex: 1;
  height: 100%;
`;
