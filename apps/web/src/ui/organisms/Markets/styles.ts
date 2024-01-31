import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Main = styled.section<{ hasMargin?: boolean }>`
  ${({ theme, hasMargin }) => css`
    grid-area: Markets;
    border-radius: ${normalizeValue(1.5)};
    background: ${theme.colors.secondaryBackgroundSolid};
    box-shadow: ${theme.shadows.secondary};
    display: flex;
    height: 100%;
    flex-flow: column nowrap;
    margin-left: ${hasMargin ? normalizeValue(1) : 0};
    margin-top: ${hasMargin ? normalizeValue(1) : 0};
    min-width: 90vw;
    @media screen and (min-width: 440px) {
      min-width: ${normalizeValue(36)};
      max-width: ${normalizeValue(36)};
    }
  `}
`;

// Header
export const HeaderWrapper = styled.div`
  ${() => css`
    padding: ${normalizeValue(1.5)} ${normalizeValue(1.5)} 0
      ${normalizeValue(1.5)};
    position: relative;
    ${Favorite} {
      position: absolute;
      right: ${normalizeValue(2)};
      top: ${normalizeValue(2)};
      display: none;
      @media screen and (max-width: 440px) {
        display: flex;
      }
    }
  `}
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: auto auto fit-content(100%);
  grid-gap: ${normalizeValue(1)};
  align-items: center;
  cursor: pointer;
`;

export const HeaderAsideContainer = styled.div<{ background: boolean }>`
  ${({ theme, background }) => css`
    display: flex;
    align-items: center;
    background: ${background
      ? theme.colors.secondaryBackgroundOpacity
      : theme.colors.transparent};
    border-radius: 0px 6px 6px 6px;
    margin-block: ${normalizeValue(0.6)};
  `}
`;
export const HeaderAsideLeft = styled.div`
  display: flex;
  align-items: center;
  padding: ${normalizeValue(0.5)} ${normalizeValue(0.6)};
`;

export const ArrowBottom = styled.button`
  vertical-align: middle;
  margin-inline: ${normalizeValue(1.2)} ${normalizeValue(0.9)};
  svg {
    width: ${normalizeValue(1)};
  }
`;

export const HeaderToken = styled.div`
  ${({ theme }) => css`
    width: ${normalizeValue(4.5)};
    height: ${normalizeValue(4.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: ${normalizeValue(30)};
  `}
`;

export const HeaderAsideCenter = styled.div`
  height: 100%;
  width: 100%;
  max-width: ${normalizeValue(10)};
  height: ${normalizeValue(4)};
  min-width: ${normalizeValue(10)};
  margin-left: ${normalizeValue(1)};
  svg {
    height: 100%;
    width: 100%;
  }
  @media (min-width: 780px) and (max-width: 850px) {
    display: none;
  }
`;
export const HeaderInfo = styled.div`
  margin-left: ${normalizeValue(1)};
  p {
    opacity: 0.5;
    font-size: ${normalizeValue(1.3)};
  }
`;
export const HeaderInfoContainer = styled.div`
  display: flex;
  align-items: center;
  span {
    font-weight: 600;
    white-space: nowrap;
    font-size: ${normalizeValue(1.3)};
  }
`;

export const HeaderInfoActions = styled.div`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: ${normalizeValue(10)};
    width: ${normalizeValue(2)};
    height: ${normalizeValue(2)};
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;
// Content
export const Content = styled.div`
  overflow-x: hidden;
  overflow-y: auto;

  flex: 1;
`;

export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${theme.colors.secondaryBackgroundSolid};
    padding: ${normalizeValue(1)} ${normalizeValue(2)};
    gap: ${normalizeValue(1)};
    h2 {
      font-size: ${normalizeValue(1.5)};
      font-weight: 600;
    }
  `}
`;

export const TitleActions = styled.div`
  display: flex;
  gap: ${normalizeValue(1)};
  justify-content: flex-end;
  flex: 1;
`;

export const TitleActionCard = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${normalizeValue(3)};
    height: ${normalizeValue(3)};
    border-radius: ${normalizeValue(20)};
    border: 1px solid ${theme.colors.secondaryBackground};
    transition: border 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
      border-color: ${theme.colors.text};
    }
  `}
`;

export const Favorite = styled(TitleActionCard)`
  min-width: ${normalizeValue(3)};
  min-height: ${normalizeValue(3)};
  button {
    width: 100%;
    height: 100%;
  }
  @media screen and (max-width: 430px) {
    display: none;
  }
`;

export const ContainerWrapper = styled.div`
  margin-bottom: ${normalizeValue(1)};
`;

export const ContainerTitle = styled.div``;

// Card
export const Card = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${normalizeValue(0.5)};
    border-radius: ${normalizeValue(1.2)};
    border: 1px solid ${theme.colors.secondaryBackground};
    margin: 0 ${normalizeValue(1.5)};
    cursor: pointer;
    transition: border 0.4s ease-in-out;
    span,
    small,
    p {
      font-size: ${normalizeValue(1.2)};
    }
    span {
      font-weight: 600;
    }
    p {
      opacity: 0.6;
    }
    &:not(:last-child) {
      margin-bottom: ${normalizeValue(1)};
    }
    &:hover {
      border-color: ${theme.colors.text};
      box-shadow: ${theme.shadows.quaternary};
    }
  `}
`;

export const CardInfoContainer = styled.div`
  flex: 1;
  display: grid;
  align-items: center;
  padding: ${normalizeValue(1)} ${normalizeValue(0.9)} ${normalizeValue(1)} 0;
  gap: ${normalizeValue(1)};
  @media screen and (max-width: 430px) {
    padding-left: ${normalizeValue(0.9)};
  }
  @media screen and (min-width: 430px) {
    grid-template-columns: repeat(3, auto);
  }
`;
export const CardInfoContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${normalizeValue(0.3)};
`;

export const CardInfo = styled.button`
  display: flex;
  align-items: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${normalizeValue(10)};
  width: ${normalizeValue(2.4)};
  margin-left: ${normalizeValue(0.5)};
  &:hover {
    svg {
      stroke: orange;
    }
  }
  @media screen and (max-width: 430px) {
    display: none;
  }
`;

export const CardToken = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: ${normalizeValue(20)};
    width: ${normalizeValue(3.6)};
    height: ${normalizeValue(3.6)};
  `}
`;

export const CardInfoWrapper = styled.div`
  margin-left: ${normalizeValue(0.5)};
  span small {
    opacity: 0.6;
  }
  p {
    opacity: 0.6;
  }
  span,
  p {
    white-space: nowrap;
    max-width: ${normalizeValue(8)};
    overflow: hidden;
    text-overflow: ellipsis;
  }
  span {
    display: block;
  }
`;

export const CardPricing = styled.div`
  @media screen and (max-width: 430px) {
    display: flex;
    justify-content: space-between;
  }
`;
export const CardChange = styled.div<{ isNegative?: boolean }>`
  ${({ theme, isNegative }) => css`
    color: ${isNegative ? theme.colors.primary : theme.colors.green};
    padding-right: ${normalizeValue(0.3)};
    justify-self: flex-end;
    span {
      position: relative;
      &::before {
        content: "";
        width: 0;
        height: 0;
        border-style: solid;
        border-width: ${isNegative ? normalizeValue(0.5) : "0"}
          ${normalizeValue(0.5)} ${isNegative ? "0" : normalizeValue(0.5)}
          ${normalizeValue(0.5)};
        border-color: ${isNegative ? theme.colors.primary : "transparent"}
          transparent ${isNegative ? "transparent" : theme.colors.green}
          transparent;

        display: inline-block;
        vertical-align: middle;
        margin-right: ${normalizeValue(0.3)};
      }
    }
  `}
`;

// Footer
export const Footer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    background: ${theme.colors.text};
    color: ${theme.colors.inverse};
    padding: ${normalizeValue(1)};
    border-radius: ${normalizeValue(1)};
    gap: ${normalizeValue(0.5)};
    overflow-x: auto;
    scrollbar-width: none;
  `}
`;

export const FooterCard = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    padding: ${normalizeValue(1)};
    background: ${isActive ? theme.colors.primary : "none"};
    color: ${isActive ? theme.colors.white : theme.colors.inverse};
    border-radius: ${normalizeValue(1)};
    text-transform: uppercase;
    font-weight: 500;
    font-size: ${normalizeValue(1.1)};
    transition: background 0.4s ease-in-out;
    cursor: pointer;
    user-select: none;

    &:hover {
      background: ${isActive
        ? theme.colors.primary
        : theme.colors.secondaryBackgroundOpacity};
    }
  `}
`;
