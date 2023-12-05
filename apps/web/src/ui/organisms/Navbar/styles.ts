import styled, { css } from "styled-components";
import { LogoText } from "@polkadex/orderbook-ui/molecules/Logo/styles";
import { Wrapper as Button } from "@polkadex/orderbook-ui/molecules/Button/styles";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.section`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  gap: ${normalizeValue(1)};
  width: 100%;
`;

export const ContainerPair = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ContainerInfo = styled.div`
  ${({ theme }) => css`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: ${normalizeValue(5)};
    border-radius: 0 0 ${normalizeValue(2)} ${normalizeValue(2)};
    box-shadow: ${theme.shadows.smooth};
    padding: ${normalizeValue(1)} ${normalizeValue(1.5)};
    @media screen and (max-width: 1268px) {
      grid-column-gap: ${normalizeValue(4)};
    }

    @media screen and (max-width: 494px) {
      grid-template-columns: 1fr 1fr;
      grid-row-gap: ${normalizeValue(0.5)};
      grid-column-gap: ${normalizeValue(1)};
    }
  `}
`;
export const WrapperInfo = styled.div`
  display: flex;
  flex: 1;
  gap: ${normalizeValue(1)};
  justify-content: space-between;
  @media screen and (max-width: 780px) {
    flex-direction: column;
    margin-top: ${normalizeValue(1)};
  }
`;

export const Box = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${normalizeValue(0.4)} ${normalizeValue(1)};
    ${Button} {
      transition: background 0.5s ease-in-out;
      background: ${theme.colors.primary};
      &:hover {
        background: ${theme.colors.primary}D8;
      }
    }
    @media screen and (max-width: 1100px) {
      position: fixed;
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

export const BoxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${normalizeValue(0.5)};
  justify-self: flex-end;
`;

export const VolumeHigh = styled.div`
  align-items: center;
  ${({ theme }) => css`
    p {
      color: ${theme.colors.green};
    }
  `}
`;

export const VolumeLow = styled.div<{ isNegative?: boolean }>`
  align-items: baseline;
  ${({ theme }) => css`
    p {
      color: ${theme.colors.primary};
    }
  `}
`;
export const WrapperVolume = styled.div`
  display: flex;
`;

export const ContainerVolume = styled.div`
  ${({ theme }) => css`
    span {
      display: block;
      margin-right: ${normalizeValue(1)};
      font-size: ${normalizeValue(1.1)};
      color: #8ba1be;
      opacity: 0.7;
      font-weight: 500;
      white-space: nowrap;
    }
    div {
      display: grid;
      grid-template-columns: 1fr auto;
      justify-content: flex-end;
    }
    p {
      font-weight: 500;
      font-size: ${theme.font.sizes.medium};
    }
  `}
`;

// Dropdown
export const WrapperDropdownContent = styled.a`
  padding: ${normalizeValue(0.5)};
  &:not(:last-child) {
    margin-bottom: ${normalizeValue(1)};
  }
  &:hover {
    opacity: 0.7;
  }
`;

export const DropdownTitle = styled.p`
  font-size: ${normalizeValue(1.3)};
  font-weight: 600;
`;

export const DropdownDescription = styled.p`
  font-size: ${normalizeValue(1.2)};
  opacity: 0.6;
`;
