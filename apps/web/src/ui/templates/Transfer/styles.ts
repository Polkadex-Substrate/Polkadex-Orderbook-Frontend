import styled, { css } from "styled-components";

export const Main = styled.main`
  ${({ theme }) => css`
    position: relative;
    background: ${theme.colors.primaryBackground};
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    max-width: 160rem;
    box-shadow: 0px -36px 99px rgba(0, 0, 0, 0.15);
    flex-direction: column;
  `}
`;
export const Flex = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column-reverse;
  @media screen and (min-width: 590px) {
    flex-direction: row;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1rem;
  margin-left: 1rem;
`;

export const ContainerMain = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    padding-top: 4rem;
    max-width: 100vw;
    border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
  `}
`;

export const Header = styled.div``;
export const Content = styled.div``;
export const Form = styled.div``;
export const History = styled.div``;
