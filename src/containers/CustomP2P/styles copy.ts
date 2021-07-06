import { Wrapper as ButtonWrapper } from "src/components/CustomButton/styles";
import styled, { css } from "styled-components";

export const Wrapper = styled.section`
  ${({ theme }) => css`
    grid-area: P2P;
    background: ${theme.colors.gradientBackground};
    padding: 1rem;
    flex: 1;
    height: 100%;
  `}
`;

export const DropdownWrapper = styled.div`
    ${({ theme }) => css`
      background: ${theme.colors.primaryBackground};
      border-radius: 1rem;
      padding: 1.2rem;
    `}
`;

export const Header = styled.div`
`;

export const Navigation = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5rem;
    ul {
      list-style: none;
      background: ${theme.colors.gradientBackground};
      padding: 0.5rem;
      border-radius: ${theme.border.radius.primary.small};

      ${ButtonWrapper} {
        display: inline-block;
        :first-child {
          margin-right: 1rem;
        }
      }
    }
  `}
`;

export const MarketTypeDropdown = styled.div`
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
export const ActionsPercent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1rem;
`
export const ContentAction = styled.div`
  margin: 1rem auto;
`;

export const ContentChange = styled.div`
  ${({ theme }) => css`
    border: 0.2rem solid ${theme.colors.primaryBackground};
    border-radius: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1.2rem 0;
    padding: 1rem;
  `}
`;

export const ContentChangeBox = styled.div`
  ${({ theme }) => css`

    span {
      display: block;
      font-weight: 600;
      :first-child{
        opacity: 0.7;
        font-size: ${theme.font.sizes.xsmall};
      }

      :last-child{
        font-size: ${theme.font.sizes.medium};
      }
    }
  `}
`

export const Content = styled.div`
  ${({ theme }) => css`
    margin-top: 1rem;
  `}
`;
