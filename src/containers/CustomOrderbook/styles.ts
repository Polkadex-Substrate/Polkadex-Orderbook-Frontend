import { WrapperIcon } from "src/components/CustomIcon/styles";
import styled, { css } from "styled-components";

type SelectProps = {
  isPositive: boolean;
};

type StyleProps = {
  isSell?:boolean
}

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.primaryBackground};
    box-shadow: ${theme.shadow.primary};
    border-radius: ${theme.border.radius.primary.small};
    padding: 1.3rem;
    min-width: 32rem;
    max-width: 34rem;
  `}
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.7rem;
  h2 {
    ${({ theme }) => css`
      font-size: ${theme.font.sizes.medium};
      font-weight: 500;
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
  max-height: 60rem;
`;
export const Box = styled.div``;
export const BoxHeader = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 0.3rem;

    span {
      font-size: ${theme.font.sizes.xxsmall};
      font-weight: 500;
      opacity: 0.5;
    }
  `}
`;

export const BoxContent = styled.div`
  max-height: 20rem;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  font-weight: 600;
`;

export const OrderbookItemContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  ${WrapperIcon} {
    margin: 0 0.5rem;
  }
`;

export const OrderbookPrice = styled.span``

export const OrderbookItemWrapper = styled.div`
  width: 100%;
  span {
    display: inline-block;
  }
`

export const OrderbookAmount = styled(OrderbookItemWrapper)<StyleProps>`
  ${({theme, isSell})=> css`
    span {
      color: ${isSell ? theme.colors.green : theme.colors.primary};
    }
  `}
`;

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
    background: ${theme.colors.secondaryBackground};
    padding: 1rem;
    border-radius: 0.8rem;
    text-align: center;
    margin: 0.8rem 0;
    font-weight: 600;
  `}
`;

export const LastPriceWrapper = styled.p`
  margin: 0;
`
export const LastPrice = styled.strong<SelectProps>`
  ${({ theme, isPositive }) => css`
    color: ${isPositive ? theme.colors.green : theme.colors.primary};
    margin-left: 0.3rem;
  `}
`
export const OrderbookVolume = styled.div`
  display: flex;
  flex-direction: column;
  left: 0;
  overflow: hidden;
  position: absolute;
  width: 100%;
  top: 0; 
  z-index: 0;
`

export const VolumeSpan = styled.span`
  box-sizing: border-box;
  display: block;
  height: 1.9rem;
  width: 30%;
  opacity: 0.3;
  margin-bottom: 0.2rem;
`

export const OrderbookDropdown = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundSolid};
    box-shadow: : ${theme.shadow.primary};
    padding: 1rem;
    border-radius: 1rem;
    text-align: left;
    width: max-content;

    button:first-child {
      margin-bottom: 1rem;
      display: block;
    }
  `}
`
