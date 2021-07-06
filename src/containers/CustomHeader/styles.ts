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
export const Main = styled.header`
  ${({ theme }) => css`
    position:fixed;
    max-width: 192rem;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${theme.colors.secondaryBackgroundSolid};
    padding: 0.5rem 1rem;
 `}
`

export const Container = styled.div``

export const Col = styled.div`
  display: flex;
  align-items: center;
`
export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: min-content minmax(70rem, 127rem) auto;
  grid-gap: 2rem;
  align-items: center;
`;

export const InformationContainer = styled.div` 
  :not(:last-child) {
    margin-right: 4rem;
  }
  
  :last-child{
    display: flex;
    align-items: center;
  }
  `;

// Information Component
export const InformationWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
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
      font-size: ${theme.font.sizes.xsmall};
      opacity: 0.8;
    }

    span:last-child {
      font-weight: 600;
      ${itemModifier[color](theme)};
    }
    :not(:last-child) {
      margin-right: 2rem;
    }
  `}
`;

export const DropdownHeader = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;

  span { 
    margin: 0 0.5rem 0 1rem;
  }
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
