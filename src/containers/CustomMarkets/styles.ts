import { WrapperToken } from "src/components/CustomIcon/styles";
import { Wrapper as WrapperTag } from "src/components/CustomTag/styles";
import styled, { css } from "styled-components";
type Props = {
  marketActive: boolean;
};

type StyleProps = {
  isActive?: boolean;
}
export const Section = styled.section<Props>`
  ${({ theme, marketActive }) => css`
    margin-right: 1rem;
    transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    min-width: 35rem;
    display: ${marketActive ? "block" : "none"};
    margin-top: 1rem;

    ${WrapperTag} {
      justify-self: flex-end;
    }
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.gradientBackground};
    border-radius: ${theme.border.radius.primary.small};
    margin-bottom: 1.5rem;
  `}
`;
export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  h3 {
    font-size: 1.5rem;
  }
`;
export const Pairs = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackground};
    padding: 1rem 2rem;
    border-radius: ${theme.border.radius.primary.small};
    display: flex;
    align-items: center;
    justify-content: space-between;
    ul {
      list-style: none;
    }
  `}
`;
export const PairBox = styled.div<StyleProps>`
    ${({ theme, isActive }) => css`
      background: ${isActive ? theme.colors.primary :theme.colors.primaryBackground};
      display: inline-block;
      padding: 0.5rem;
      border-radius: 0.5rem;
      cursor: pointer;
      :not(:last-child) {
        margin-right: 0.5rem;
      }
      :hover {
        opacity: 0.7;
      }
    `}
`;
export const Content = styled.div``;
export const TableHeader = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 2fr 1fr minmax(4rem, 6rem);
    padding: 0 1.5rem;
    margin-bottom: 1rem;
    span {
      font-size: ${theme.font.sizes.xsmall};
      font-weight: 500;
      opacity: 0.5;
      :last-child {
        text-align: right;
      }
    }
  `}
`;

export const TableContent = styled.div``;


export const ContentItemPrice = styled.div``;

export const ContentItemToken = styled.div`
  display: flex;
  align-items: center;

  ${WrapperToken} {
    margin-right: 1rem;
  }
`;

export const ContentItemWrapper = styled.a`
  ${({ theme }) => css`
    background: ${theme.colors.tertiaryBackground};
    display: grid;
    grid-template-columns: 2fr 1fr minmax(4rem, 6rem);
    align-items: center;
    padding: 1rem;
    border-radius: 1.5rem;
    cursor: pointer;

    :not(:last-child) {
      margin-bottom: 1rem;
    }
     p {
      font-weight: 600;
    }
     ${ContentItemToken} span,
    ${ContentItemPrice} span {
      display: block;
      font-size: 1.2rem;
      opacity: 0.5;
      font-weight: 600;
    }
  `}
`;
