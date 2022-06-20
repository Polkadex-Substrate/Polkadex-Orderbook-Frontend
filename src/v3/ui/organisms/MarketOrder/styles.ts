import styled, { css } from "styled-components";

import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";

export const Section = styled.section`
  margin-left: 1rem;
  min-width: 32rem;
  max-width: 32rem;
  & .react-tabs__tab--selected {
    color: green;
  }
`;
// Header
export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 1rem;
`;
export const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
`;

export const ActionItem = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    border-radius: 1rem;
    width: 100%;
    text-align: center;
    cursor: pointer;
    transition: background 0.4s ease-in-out, opacity 0.4s ease-in-out;
    font-weight: 500;
    ${Icon} {
      display: inline-block;
      margin-right: 0.2rem;
    }
    :first-child {
      margin-right: 2rem;
      color: ${isActive ? theme.colors.green : theme.colors.text};
      svg {
        fill: ${isActive ? theme.colors.green : theme.colors.text};
      }
    }
    :last-child {
      color: ${isActive ? theme.colors.primary : theme.colors.text};
      svg {
        fill: ${isActive ? theme.colors.primary : theme.colors.text};
      }
    }
    :hover {
      opacity: ${isActive ? 1 : 0.6};
    }
  `}
`;
