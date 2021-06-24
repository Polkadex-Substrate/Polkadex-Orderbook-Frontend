import { Wrapper as WrapperCheckbox } from "src/components/CustomCheckbox/styles";
import { Wrapper as WrapperDropdown } from "src/components/CustomDropdown/styles";
import { WrapperIcon, WrapperToken } from "src/components/CustomIcon/styles";
import styled, { css } from "styled-components";

import { Props } from "./types";

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

// Content
export const Content = styled.div`
  ${({ theme }) => css`
    margin-top: 1rem;
    border-radius: ${theme.border.radius.primary.medium};
    padding: 1.5rem;
    background: ${theme.colors.gradientBackground};
  `}
`;
export const ContentHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 0.5fr 1fr 1fr 1fr 1fr 0.2fr;
  grid-gap: 1rem;
  margin-bottom: 1rem;
  padding: 0 0.5rem;

`
export const ContentWrapper = styled.div`

`

export const ContentItem = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.primaryBackground};
    border-radius: ${theme.border.radius.primary.medium};
    padding: 0.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr 0.5fr 1fr 1fr 1fr 1fr 0.2fr;
    align-items:center;
    grid-gap: 1rem;
    ${WrapperToken}, ${WrapperIcon} {
      display: inline-block;
      vertical-align: middle;
      margin-right: 0.5rem;
    }

    :not(:last-child) {
      margin-bottom: 1rem;
    }
  `}
`;
export const ContentFlex = styled.div`
  display: flex;
  align-items: center;
`
export const OpenOrders = styled.div``
//My Trade History
export const MyTradeHistory = styled.div`

`

export const MyTradeHistoryHeader = styled.div`
  display: flex;
  align-items: center;
  span {
    :not(:last-child) {
      margin-right: 1rem;
    }
  }
`