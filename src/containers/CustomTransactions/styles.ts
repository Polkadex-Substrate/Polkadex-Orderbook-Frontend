import { Wrapper as WrapperCheckbox } from "src/components/CustomCheckbox/styles";
import { Wrapper as WrapperDropdown } from "src/components/CustomDropdown/styles";
import { WrapperIcon, WrapperToken } from "src/components/CustomIcon/styles";
import styled, { css } from "styled-components";

import { Props } from "./types";

type StyleCardProps = {
  isSell: boolean
}

export const Wrapper = styled.section`
  grid-area: Transactions;
  padding: 1rem 0;
  flex: 1;
`;

// Header
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Tabs = styled.ul`
  ${({ theme }) => css`
    background: ${theme.colors.gradientBackground};
    border-radius: ${theme.border.radius.primary.small};
  `}
  padding: 1rem;
  list-style: none;
`;

export const Tab = styled.li`
  ${({ theme,  }) => css`
    display: inline-block;
    :not(:last-child) {
      margin-right: 0.5rem;
    }
  `}
`;

export const Filters = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  max-width: 50rem;
  width: 100%;
`;
export const FiltersContainer = styled.div`
  display: flex;

  ${WrapperDropdown}, ${WrapperCheckbox} {
    align-self: center;
    :first-child {
      margin-right: 1rem;
    }
  }
`;

export const Template = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 1fr 1fr 1fr 1fr 1fr 1fr 0.5fr;
  grid-gap: 1rem;
`

// Content
export const Content = styled.div`
  ${({ theme }) => css`
    margin-top: 1rem;
  `}
`;

export const ContentHeader = styled(Template)`
  margin-bottom: 1rem;
  padding: 0 0.5rem;
  span {
    opacity: 0.5;
    font-weight: 500;
  }
`
export const ContentWrapper = styled.div``

export const OpenOrders = styled.div``

//My Trade History
export const MyTradeHistory = styled.div``

export const MyTradeHistoryHeader = styled.div`
  display: flex;
  align-items: center;
  span {
    :not(:last-child) {
      margin-right: 1rem;
    }
  }
`

// Card
export const CardWrapper = styled(Template)`
  ${({ theme }) => css`
    background: ${theme.colors.gradientBackground};
    border-radius: ${theme.border.radius.primary.small};
    padding: 0.5rem;
    align-items:center;
    :not(:last-child) {
      margin-bottom: 1rem;
    }
  `}
`;

export const CardSideWrapper = styled.div<StyleCardProps>`
   ${({ theme, isSell }) => css`
    span {
      font-size: 1.1rem;
      font-weight:bold;
      background: ${isSell ? theme.colors.green : theme.colors.primary};
      border-radius: 0.5rem;
      padding: 0.2rem;
      width: fit-content;
    }
  `}
`
export const CardContainer = styled.div`
 ${({ theme}) => css`
    position: relative;
    span {
      display: block;
      font-weight: 500;
    }
  `}
`

export const CardFlex = styled.div`
  display: flex;
  align-items: center;
`



export const CardPair = styled.div`
${({ theme}) => css`
    display: flex;
    align-items: center;
    margin-right: 0.5rem;
    ${WrapperToken}:last-child {
      margin-left: -0.4rem;
    }
    ${WrapperToken}:first-child {
      box-shadow: ${theme.shadow.primary};
    }
  `}
`
export const CardFilled = styled.span<StyleCardProps>`
  ${({ theme, isSell }) => css`
    position: absolute;
    top: 0;
    left: 0;
    background: ${isSell ? theme.colors.gradientGreen : theme.colors.gradientRed};
    height: 1rem;
    opacity: 0.5;
  `}
`