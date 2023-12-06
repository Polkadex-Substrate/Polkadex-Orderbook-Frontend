import styled, { css } from "styled-components";
import { Wrapper as Button } from "@polkadex/orderbook-ui/molecules/Button/styles";
import { LogoText } from "@polkadex/orderbook-ui/molecules/Logo/styles";

import { normalizeValue } from "@/utils/normalize";

export const Container = styled.div`
  min-height: 100vh;
`;

export const Wrapper = styled.main`
  display: flex;
  flex-direction: row;
  box-shadow: 0px -36px 99px rgba(0, 0, 0, 0.15);
  height: 100vh;
  overflow: auto;
  overflow-x: hidden;
  flex-direction: column;
`;

export const WrapperMain = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: ${normalizeValue(1)};
  max-width: 1920px;
  margin-left: auto;
  margin-right: auto;
  overflow-y: scroll;
`;

export const ContainerMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(1)};

  padding: 0 ${normalizeValue(0.8)};
  flex: 1;
  @media screen and (max-width: 590px) {
    margin-bottom: ${normalizeValue(8)};
  }
`;

export const Content = styled.div``;
export const WrapperGraph = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(0.8)};
  flex: 1;
  overflow: hidden;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

export const CenterWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: ${normalizeValue(0.8)};
  @media screen and (max-width: 1180px) {
    flex-direction: column;
  }
`;
export const GraphEpmty = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const WrapperRight = styled.div`
  min-width: ${normalizeValue(28)};
  width: 25%;
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(0.8)};
  @media screen and (max-width: 1180px) {
    flex-direction: row;
    width: 100%;
    gap: ${normalizeValue(1)};
    height: 4 ${normalizeValue(1.4)};
  }
  @media screen and (max-width: 750px) {
    flex-direction: column;
    height: max-content;
  }
`;
export const Actions = styled.div<{ isSignedIn?: boolean }>`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1080px) {
    display: none;
  }
`;
export const Box = styled.div`
  ${({ theme }) => css`
    justify-content: space-between;
    align-items: center;
    display: none;
    padding: 0 ${normalizeValue(1)};
    ${Button} {
      transition: background-color 0.5s ease-in-out;
      margin-left: ${normalizeValue(2)};
    }
    ${Logo} {
      margin: ${normalizeValue(1)} 0;
    }

    ${Profile} {
      margin: ${normalizeValue(1)} 0;
    }

    @media screen and (max-width: 800px) {
      display: flex;
      position: sticky;
      top: 0;
      right: 0;
      width: 100%;
      z-index: 32;
      background: ${theme.colors.primaryBackground};
      box-shadow: ${theme.shadows.tertiary};
    }
  `}
`;
export const Logo = styled.div`
  ${() => css`
    visibility: hidden;
    @media screen and (max-width: 590px) {
      visibility: visible;
      ${LogoText} {
        display: block;
        opacity: 1;
      }
    }
  `}
`;
export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: ${normalizeValue(0.7)};
  justify-self: flex-end;
  align-self: flex-end;
`;

export const Flex = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column-reverse;
  overflow: hidden;
  @media screen and (min-width: 590px) {
    flex-direction: row;
  }
`;
