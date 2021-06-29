import { WrapperIcon } from "src/components/CustomIcon/styles";
import styled, { css, DefaultTheme } from "styled-components";

import { InformationItemProps, SearchProps } from "./types";

const itemModifier = {
  white: (theme: DefaultTheme) => css`
    color: ${theme.colors.text};
  `,
  red: (theme: DefaultTheme) => css`
    color: ${theme.colors.primary};
  `,
  green: (theme: DefaultTheme) => css`
    color: ${theme.colors.green};
  `,
  vertical: () => css`
    span {
      display: block;
      margin-bottom: 0.3rem;
    }
    @media screen and (max-width: 560px) {
      margin-bottom: 1rem;
    }
  `,
  horizontal: () => css`
    span {
      display: inline-block;
      margin-right: 0.5rem;
      :not(:last-child) {
        margin-bottom: 0.5rem;
      }
    }
  `,
};
export const Wrapper = styled.header`
  grid-area: Header;
  display: grid;
  grid-template-columns: min-content minmax(70rem, 127rem) auto;
  grid-gap: 2rem;
  align-items: center;
`;

export const Container = styled.div`
  :last-child {
    justify-self: flex-end;
  }`;

// Information Component
export const InformationWrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    align-items: center;
    background: ${theme.colors.gradientBackground};
    box-shadow: ${theme.shadow.primary};
    border-radius: 0 1rem 1rem 1rem;
    padding: 1.2rem;
    justify-content: space-between;
    @media screen and (min-width: 560px) {
      grid-template-columns: 1fr 1fr 1fr auto;
    }
    @media screen and (min-width: 360px) and (max-width: 560px) {
      grid-template-columns: 1fr 1fr;
    }
  `}
`;

export const InformationChangeWrapper = styled.div``;
export const ItemWrapper = styled.div<Partial<InformationItemProps>>`
  ${({ theme, orientation, color }) => css`
    ${itemModifier[orientation]};

    span {
      line-height: 1;
    }
    span:first-child {
      font-weight: 400;
      font-size: 1.2rem;
      opacity: 0.7;
    }

    span:last-child {
      font-weight: 600;
      font-size: 1.5rem;
      ${itemModifier[color](theme)};
    }
  `}
`;

// Pair Component
export const PairWrapper = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

export const PairItemWrapper = styled.div``;

export const PairWrapperCoin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const PairWrapperExchange = styled.div`
  margin: 0 2rem;
`;
// Header Currency
export const HeaderWrapper = styled.div`
  div {
    display: flex;
    align-items: center;
    span {
      font-size: 1.2rem;
      font-weight: 600;
      text-transform: uppercase;
      margin-left: 0.5rem;
    }
  }
`;
export const HeaderContainer = styled.div`
  margin-top: 0.5rem;
  ${WrapperIcon} {
    margin-left: 0.5rem;
  }
`;

export const HeaderLabel = styled.div`
  font-size: 1.1rem;
  font-weight: 400;
  opacity: 0.7;
`;

// Content Currency
export const ContentWrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.gradientBackground};
    padding: 1rem;
    border-radius: 1.5rem;
    max-width: 40rem;
    width: max-content;
  `}
`;

export const ContentContainer = styled.div`
  margin-top: 1.5rem;
`;

export const ContentHeader = styled.div`
  margin-bottom: 1rem;
  h5 {
    font-size: 1.3rem;
    font-weight: 600;
  }
`;
export const ContentSearchWrapper = styled.div``;

export const SearchWrapper = styled.div<Partial<SearchProps>>`
  ${({ theme, fullWidth }) => css`
    background: rgba(255, 255, 255, 0.05);
    padding: 1rem;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    max-width: ${fullWidth ? "initial" : "25rem"};
    img {
      max-width: 1.5rem;
      opacity: 0.5;
    }
    input {
      margin-left: 0.8rem;
      width: 100%;
    }
  `}
`;

export const ContentCardWrapper = styled.div`
  display: flex;
  align-items: center;
  :not(:last-child) {
    margin-bottom: 1.5rem;
  }

  div {
    margin-left: 0.5rem;
    span:first-child {
      font-size: 1.3rem;
      text-transform: uppercase;
      font-weight: 600;
      line-height: 1;
    }

    span:last-child {
      font-size: 1.2rem;
      opacity: 0.5;
    }
  }
  img {
    max-width: 3rem;
  }
  span {
    display: block;
  }
`;
