import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Main = styled.main`
  ${({ theme }) => css`
    position: relative;
    background: ${theme.colors.primaryBackground};
    height: 100vh;
    display: flex;
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
    margin-left: ${normalizeValue(2)};
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
  gap: ${normalizeValue(1)};
  padding: ${normalizeValue(2)};
  max-width: ${normalizeValue(100)};
  @media screen and (min-width: 1110px) {
    padding: ${normalizeValue(4)};
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: ${normalizeValue(1)};
  align-self: flex-end;
  span {
    font-size: ${normalizeValue(1.5)};
    font-weight: 500;
  }
`;

export const Heading = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(0.6)};

    h1 {
      font-size: ${normalizeValue(2.5)};
      font-weight: 500;
    }
    h2 {
      font-size: ${theme.font.sizes.small};
      font-weight: normal;
      opacity: 0.5;
    }
  `}
`;
