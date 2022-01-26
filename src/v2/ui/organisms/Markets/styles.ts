import styled, { css } from "styled-components";

export const Main = styled.section<{ isFull?: boolean }>`
  ${({ theme, isFull }) => css`
    background: ${theme.colors.white};
    color: ${theme.colors.black};
    max-width: ${isFull ? "auto" : "35rem"};
    border-radius: 1.5rem;
    box-shadow: ${theme.shadows.secondary};
    max-height: 100vh;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
  `}
`;

// Header
export const HeaderWrapper = styled.div`
  padding: 1.5rem 1.5rem 0 1.5rem;
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: auto auto fit-content(100%);
  grid-gap: 1rem;
  align-items: center;
`;

export const HeaderAsideLeft = styled.div`
  display: flex;
  align-items: center;
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

export const HeaderAsideCenter = styled.div``;
export const HeaderAsideRight = styled.div``;
export const HeaderInfo = styled.div`
  margin-left: 0.5rem;
  p {
    opacity: 0.5;
  }
`;
export const HeaderInfoContainer = styled.div`
  display: flex;
  align-items: center;
  span {
    font-weight: 550;
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
  flex: 1;
`;

export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${theme.colors.white};
    padding: 2rem 2rem 2rem 2rem;
    h2 {
      font-size: 1.5rem;
      font-weight: 550;
    }
  `}
`;

export const TitleActions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.5rem;
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
    :hover {
      border-color: ${theme.colors.black};
    }
  `}
`;

export const ContainerWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const ContainerTitle = styled.div``;

// Card
export const Card = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 0.5fr auto;
    grid-gap: 1rem;
    align-items: center;
    padding: 1rem 0.9rem;
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
    :not(:last-child) {
      margin-bottom: 1rem;
    }
    :hover {
      border-color: ${theme.colors.black};
      box-shadow: ${theme.shadows.quaternary};
    }
  `}
`;

export const CardInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const CardInfoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 0.4rem;
  :hover {
    svg {
      transition: all 0.4s ease-in-out;

      fill: orange;
      stroke: orange;
    }
  }
`;

export const CardInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const CardToken = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: 20rem;
    width: 4rem;
    height: 4rem;
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
`;

export const CardPricing = styled.div``;
export const CardChange = styled.div<{ isNegative?: boolean }>`
  ${({ theme, isNegative }) => css`
    color: ${isNegative ? theme.colors.primary : theme.colors.green};
    padding-right: 0.3rem;
    justify-self: flex-end;
    span {
      position: relative;
      ::before {
        content: "";
        width: 0;
        height: 0;
        border-style: solid;
        border-width: ${isNegative ? "0.5rem" : "0"} 0.5rem ${isNegative ? "0" : "0.5rem"}
          0.5rem;
        border-color: ${isNegative ? theme.colors.primary : "transparent"} transparent
          ${isNegative ? "transparent" : theme.colors.green} transparent;

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
    justify-content: space-between;
    background: ${theme.colors.black};
    color: ${theme.colors.white};
    padding: 1rem;
    border-radius: 1.5rem;
  `}
`;

export const FooterCard = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    padding: 1rem;
    background: ${isActive ? theme.colors.primary : "none"};
    border-radius: 1rem;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 1.1rem;
    transition: background 0.4s ease-in-out;
    cursor: pointer;
    :hover {
      background: ${theme.colors.text};
      color: ${theme.colors.inverse};
    }
  `}
`;
