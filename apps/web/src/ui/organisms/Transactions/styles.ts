import styled, { css } from "styled-components";
import media from "styled-media-query";

import { normalizeValue } from "@/utils/normalize";

export const Section = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: ${normalizeValue(28)};
`;

// Header
export const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${normalizeValue(1.5)};
  padding: ${normalizeValue(2)} 0;
  justify-content: space-between;
  align-items: flex-start;
  ${media.lessThan("large")`
      grid-template-columns: 1fr;
      grid-row-gap: ${normalizeValue(2)};
    `}
`;
export const Content = styled.div``;
export const ContentWrapper = styled.div`
  padding: ${normalizeValue(10)} 0;
`;

export const HeaderContent = styled.ul`
  display: flex;
  gap: ${normalizeValue(2)};
`;
export const TabHeader = styled.li<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    list-style: none;
    padding-bottom: ${normalizeValue(1)};
    border-bottom: 2px solid;
    border-bottom-color: ${isActive ? theme.colors.text : "transparent"};
    cursor: pointer;
    white-space: nowrap;
    user-select: none;
    opacity: ${isActive ? 1 : 0.3};
    font-size: ${normalizeValue(1.3)};
    font-weight: ${isActive ? 550 : 500};
    transition: opacity 0.5s ease-in-out;
    &:hover {
      opacity: 1;
    }
  `}
`;

export const Tab = styled.ul`
  li {
    font-size: ${normalizeValue(1.4)};
    font-weight: 800;
    display: inline-block;
  }

  li :not(:last-child) {
    margin-right: ${normalizeValue(2)};
  }
`;
export const WrapperActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${normalizeValue(1)};
  flex-wrap: wrap;
`;

export const Flex = styled(WrapperActions)``;
export const Calendar = styled.div``;

export const ContainerActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: ${normalizeValue(1)};
`;

export const ContainerTransactions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  gap: ${normalizeValue(0.5)};
  div {
    max-width: ${normalizeValue(0.8)};
  }
`;

export const SkeletonWrapper = styled.div`
  div {
    margin-block: ${normalizeValue(1)};
  }
`;
