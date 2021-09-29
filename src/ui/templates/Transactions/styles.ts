import styled, { css } from "styled-components";

import { Wrapper as WrapperCheckbox } from "src/ui/molecules/Checkbox/styles";
import { WrapperToken } from "src/ui/components/Icon/styles";

type StyleCardProps = {
  isSell?: boolean;
};
type StyleProps = {
  isActive?: boolean;
};

export const Wrapper = styled.section`
  ${({ theme }) => css`
    grid-area: Transactions;
    background: ${theme.colors.secondaryBackgroundOpacity};
    padding: 0.5rem 0;
  `}
`;

// Header
export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1.5rem 1rem 1.5rem;
    border-bottom: 1px solid;
    border-bottom-color: ${theme.colors.secondaryBackground};
  `}
`;

export const Tabs = styled.ul`
  ${({ theme }) => css`
    list-style: none;
  `}
`;

export const Tab = styled.li<StyleProps>`
  ${({ theme, isActive }) => css`
    display: inline-block;
    cursor: pointer;
    opacity: ${isActive ? 1 : 0.6};
    font-weight: 550;
    :not(:last-child) {
      margin-right: 1.5rem;
    }
    position: relative;

    :before {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      border-bottom: 2px solid;
      border-bottom-color: ${isActive ? theme.colors.primary : "transparent"};
      bottom: -70%;
    }
  `}
`;

export const Filters = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ${WrapperCheckbox} {
    margin-right: 1rem;
  }
`;

export const Template = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 0.5fr 0.3fr 0.8fr 0.8fr 0.3fr 0.8fr 0.3fr;
  grid-gap: 0.5rem;
  text-align: left;
`;

// Content
export const Content = styled.div`
  ${({ theme }) => css`
    margin-top: 1rem;
  `}
`;

export const ContentHeader = styled(Template)`
  ${({ theme }) => css`
    margin-bottom: 1rem;
    padding: 0 1.5rem;
    span {
      font-size: ${theme.font.sizes.xxsmall};
      font-weight: 500;
      opacity: 0.5;
    }
  `}
`;
export const ContentWrapper = styled(Template)`
  text-align: center;
`;

export const OpenOrders = styled.div``;

// My Trade History
export const MyTradeHistory = styled.div``;

export const MyTradeHistoryHeader = styled.div`
  display: flex;
  align-items: center;
  span {
    :not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

// Card
export const CardWrapper = styled(Template)`
  ${({ theme }) => css`
    font-size: 1.3rem;
    padding: 0 1rem;
    :not(:last-child) {
      margin-bottom: 0.5rem;
    }
  `}
`;

export const CardSideWrapper = styled.div<StyleCardProps>`
  ${({ theme, isSell }) => css`
    span {
      font-weight: bold;
      background: ${isSell ? theme.colors.green : theme.colors.primary};
      border-radius: 0.5rem;
      padding: 0.2rem;
      width: fit-content;
    }
  `}
`;
export const CardContainer = styled.div`
  ${({ theme }) => css`
    position: relative;
    span {
      display: block;
      font-weight: 500;
    }
    button {
      color: #0090e1;
    }
  `}
`;
export const Side = styled.div<StyleCardProps>`
  ${({ theme, isSell }) => css`
    color: ${isSell ? theme.colors.green : theme.colors.primary};
    text-transform: capitalize;
  `}
`;

export const CardFlex = styled.div`
  display: flex;
  align-items: center;
`;

export const CardPair = styled.div`
  ${({ theme }) => css`
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
`;
export const CardFilled = styled.span<StyleCardProps>`
  ${({ theme, isSell }) => css`
    position: absolute;
    top: 0;
    left: 0;
    background: ${isSell ? theme.colors.gradientGreen : theme.colors.gradientRed};
    height: 1rem;
    opacity: 0.5;
  `}
`;
