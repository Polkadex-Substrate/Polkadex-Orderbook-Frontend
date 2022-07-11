import styled, { css } from "styled-components";
import media from "styled-media-query";

import { Content as Dropdown } from "@polkadex/orderbook-ui/molecules/Dropdown/styles";
export const Section = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// Header
export const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 2rem 0;
  justify-content: space-between;
  align-items: flex-start;
  ${media.lessThan("large")`
      grid-template-columns: 1fr;
      grid-row-gap: 2rem;
    `}
`;
export const Content = styled.div``;
export const ContentWrapper = styled.div`
  padding: 10rem 0;
`;

export const HeaderContent = styled.ul`
  display: flex;
  gap: 2rem;
`;
export const TabHeader = styled.li<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    list-style: none;
    padding-bottom: 1rem;
    border-bottom: 2px solid;
    border-bottom-color: ${isActive ? theme.colors.text : "transparent"};
    cursor: pointer;
    white-space: nowrap;
    user-select: none;
    opacity: ${isActive ? 1 : 0.3};

    font-weight: ${isActive ? 550 : 500};
    transition: opacity 0.5s ease-in-out;
    :hover {
      opacity: 1;
    }
  `}
`;

export const Tab = styled.ul`
  li {
    font-size: 1.4rem;
    font-weight: 800;
    display: inline-block;
  }

  li :not(:last-child) {
    margin-right: 2rem;
  }
`;
export const WrapperActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const Flex = styled(WrapperActions)``;
export const Calendar = styled.div`
  @media screen and (max-width: 426px) {
    ${Dropdown} {
      transform: translateX(6rem);
    }
  }
`;

export const ContainerActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
`;

export const ContainerTransactions = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
  `}
`;
