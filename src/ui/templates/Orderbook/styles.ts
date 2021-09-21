import styled, { css } from "styled-components";

import { WrapperIcon } from "src/ui/components/Icon/styles";

export const Wrapper = styled.section`
  ${({ theme }) => css`
    grid-area: Orderbook;
    background: ${theme.colors.secondaryBackgroundOpacity};
    padding: 0.5rem 0;
  `}
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  h2 {
    ${({ theme }) => css`
      font-size: ${theme.font.sizes.small};
      font-weight: 600;
    `}
  }
`;

export const Options = styled.div`
  display: flex;
  align-items: center;
  ul {
    list-style: none;
    margin-right: 0.5rem;
    li {
      display: inline-block;
      cursor: pointer;

      :not(:last-child) {
        margin-right: 0.5rem;
      }
    }
  }
`;
export const Content = styled.div`
  display: grid;
  grid-template-rows: 1fr min-content 1fr;
`;
export const Box = styled.div``;
export const BoxHeader = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 0.3rem;
    padding: 0 1rem;
    span {
      font-size: ${theme.font.sizes.xxsmall};
      font-weight: 500;
      opacity: 0.5;

      :not(:first-child) {
        text-align: end;
      }
    }
  `}
`;

export const BoxContent = styled.div`
  max-height: 22.2rem;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  font-weight: 600;
  padding: 0 1rem;
`;

export const OrderbookItemContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  ${WrapperIcon} {
    margin: 0 0.5rem;
  }
`;

export const OrderbookPrice = styled.span<{ isSell?: boolean }>`
  ${({ theme, isSell }) => css`
    span {
      color: ${isSell ? theme.colors.green : theme.colors.primary};
    }
  `}
`;

export const OrderbookItemWrapper = styled.div`
  width: 100%;
  text-align: end;
  span {
    display: inline-block;
  }
`;

export const OrderbookAmount = styled(OrderbookItemWrapper)``;

export const OrderbookItem = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1rem;
    align-items: center;
    font-size: ${theme.font.sizes.xsmall};
    cursor: pointer;
    z-index: 1;
    transition: ${theme.transition.default};
    position: relative;
    :hover {
      opacity: 0.8;
    }

    :not(:last-child) {
      margin-bottom: 0.2rem;
    }
  `}
`;

export const Select = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xxsmall};
    padding: 1rem;
    text-align: center;
    margin: 0.8rem 0;
    font-weight: 600;
  `}
`;

export const LastPriceWrapper = styled.p`
  margin: 0;
`;

export const LastPrice = styled.strong<{ isPositive?: boolean }>`
  ${({ theme, isPositive }) => css`
    color: ${isPositive ? theme.colors.green : theme.colors.primary};
    margin-left: 0.3rem;
  `}
`;

export const OrderbookVolume = styled.div`
  display: flex;
  flex-direction: column;
  left: 0;
  overflow: hidden;
  position: absolute;
  width: 100%;
  top: 0;
  z-index: 0;
`;

export const VolumeSpan = styled.span`
  box-sizing: border-box;
  display: block;
  height: 1.9rem;
  width: 30%;
  opacity: 0.15;
  margin-bottom: 0.2rem;
`;

export const OrderbookDropdown = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundSolid};
    box-shadow: : ${theme.shadow.primary};
    padding: 1rem;
    border-radius: 1rem;
    text-align: left;
    width: max-content;
    button {
      font-weight: bold;

      :first-child {
        margin-bottom: 1rem;
        display: block;
      }
    }
  `}
`;
