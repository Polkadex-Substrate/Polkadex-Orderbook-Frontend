import { Wrapper as ButtonWrapper } from "src/components/CustomButton/styles";
import styled, { css } from "styled-components";

export const Wrapper = styled.section`
  ${({ theme }) => css`
    grid-area: P2P;
    margin-right: 1rem;
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
      background: ${theme.colors.secondaryBackground};
      padding: 0.8rem 1rem;
      border-radius: ${theme.border.radius.primary.small};

      ${ButtonWrapper} {
        display: inline-block;
        :first-child {
          margin-right: 0.5rem;
        }
      }
    }
  `}
`;

export const MarketTypeDropdown = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackground};
    padding: 0.8rem 1rem;
    border-radius: ${theme.border.radius.primary.small};
    
  `}
`
export const ActionsPercent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1rem;
`
export const ContentAction = styled.div`
  margin-top: 1em;
  text-align: center;
  margin: 1rem auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ContentChange = styled.div`
  text-align: center;
  margin: 1.5rem 0;
`;
export const Content = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackground};
    border-radius: ${theme.border.radius.primary.medium};
    padding: 1rem;
    margin-top: 1rem;
  `}
`;
