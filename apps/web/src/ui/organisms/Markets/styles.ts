import styled, { css } from "styled-components";

export const Main = styled.section<{ hasMargin?: boolean }>`
  ${({ theme, hasMargin }) => css`
    grid-area: Markets;
    border-radius: 1.5rem;
    background: ${theme.colors.secondaryBackgroundSolid};
    box-shadow: ${theme.shadows.secondary};
    display: flex;
    height: 100%;
    flex-flow: column nowrap;
    margin-left: ${hasMargin ? "1rem" : 0};
    margin-top: ${hasMargin ? "1rem" : 0};
    min-width: 90vw;
    @media screen and (min-width: 440px) {
      min-width: 36rem;
      max-width: 36rem;
    }
  `}
`;

// Header
export const HeaderWrapper = styled.div`
  ${() => css`
    padding: 1.5rem 1.5rem 0 1.5rem;
    position: relative;
    ${Favorite} {
      position: absolute;
      right: 2rem;
      top: 2rem;
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
  grid-gap: 1rem;
  align-items: center;
  cursor: pointer;
  width: 100%;
`;

export const HeaderAsideContainer = styled.div<{ background: boolean }>`
  ${({ theme, background }) => css`
    display: flex;
    align-items: center;
    background: ${background
      ? theme.colors.secondaryBackgroundOpacity
      : theme.colors.transparent};
    border-radius: 0px 6px 6px 6px;
    margin-block: 0.6rem;
  `}
`;
export const HeaderAsideLeft = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.6rem;
`;

export const ArrowBottom = styled.button`
  vertical-align: middle;
  margin-inline: 1.2rem 0.9rem;
  svg {
    width: 1rem;
  }
`;

export const HeaderToken = styled.div`
  ${({ theme }) => css`
    width: 4.5rem;
    height: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: 30rem;
  `}
`;

export const HeaderAsideCenter = styled.div`
  height: 100%;
  width: 100%;
  max-width: 10rem;
  height: 4rem;
  min-width: 10rem;
  margin-left: 1rem;
  @media screen and (max-width: 850px) {
    display: none;
  }
`;
export const HeaderInfo = styled.div`
  margin-left: 1rem;
  p {
    opacity: 0.5;
  }
`;
export const HeaderInfoContainer = styled.div`
  display: flex;
  align-items: center;
  span {
    font-weight: 550;
    white-space: nowrap;
  }
`;

export const HeaderInfoActions = styled.div`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: 10rem;
    width: 2rem;
    height: 2rem;
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
    padding: 1rem 2rem;
    gap: 1rem;
    h2 {
      font-size: 1.5rem;
      font-weight: 550;
    }
  `}
`;

export const TitleActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  flex: 1;
`;

export const TitleActionCard = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: 20rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    transition: border 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
      border-color: ${theme.colors.text};
    }
  `}
`;

export const Favorite = styled(TitleActionCard)`
  min-width: 3rem;
  min-height: 3rem;
  button {
    width: 100%;
    height: 100%;
  }
  @media screen and (max-width: 430px) {
    display: none;
  }
`;

export const ContainerWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const ContainerTitle = styled.div``;

// Card
export const Card = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 0.5rem;
    border-radius: 1.2rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    margin: 0 1.5rem;
    cursor: pointer;
    transition: border 0.4s ease-in-out;
    span,
    small,
    p {
      font-size: 1.2rem;
    }
    span {
      font-weight: 550;
    }
    p {
      opacity: 0.6;
    }
    &:not(:last-child) {
      margin-bottom: 1rem;
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
  padding: 1rem 0.9rem 1rem 0;
  gap: 1rem;
  @media screen and (max-width: 430px) {
    padding-left: 0.9rem;
  }
  @media screen and (min-width: 430px) {
    grid-template-columns: repeat(3, auto);
  }
`;
export const CardInfoContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

export const CardInfo = styled.button`
  display: flex;
  align-items: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10rem;
  width: 2.4rem;
  margin-left: 0.5rem;
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
    border-radius: 20rem;
    width: 3.6rem;
    height: 3.6rem;
  `}
`;

export const CardInfoWrapper = styled.div`
  margin-left: 0.5rem;
  span small {
    opacity: 0.6;
  }
  p {
    opacity: 0.6;
  }
  span,
  p {
    white-space: nowrap;
    max-width: 8rem;
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
    padding-right: 0.3rem;
    justify-self: flex-end;
    span {
      position: relative;
      &::before {
        content: "";
        width: 0;
        height: 0;
        border-style: solid;
        border-width: ${isNegative ? "0.5rem" : "0"} 0.5rem
          ${isNegative ? "0" : "0.5rem"} 0.5rem;
        border-color: ${isNegative ? theme.colors.primary : "transparent"}
          transparent ${isNegative ? "transparent" : theme.colors.green}
          transparent;

        display: inline-block;
        vertical-align: middle;
        margin-right: 0.3rem;
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
    padding: 1rem;
    border-radius: 1rem;
    gap: 0.5rem;
    overflow-x: auto;
    scrollbar-width: none;
  `}
`;

export const FooterCard = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    padding: 1rem;
    background: ${isActive ? theme.colors.primary : "none"};
    color: ${isActive ? theme.colors.white : theme.colors.inverse};
    border-radius: 1rem;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 1.1rem;
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
