import styled, { css } from "styled-components";

export const Main = styled.main`
  ${({ theme }) => css`
    position: relative;
    background: ${theme.colors.primaryBackground};
    height: 100vh;
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
  max-height: 95vh;
  overflow: hidden;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  @media screen and (min-width: 590px) {
    margin-left: 2rem;
  }
  overflow: auto;
`;

export const ContainerMain = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    max-width: 100vw;
    border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
  `}
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 2rem;
  max-width: 100rem;
  @media screen and (min-width: 1110px) {
    padding: 4rem;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  align-self: flex-end;
  span {
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

export const Heading = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 0.6rem;

    h1 {
      font-size: 2.5rem;
      font-weight: 500;
    }
    h2 {
      font-size: ${theme.font.sizes.small};
      font-weight: normal;
      opacity: 0.5;
    }
  `}
`;
