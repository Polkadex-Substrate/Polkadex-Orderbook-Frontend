import styled, { css } from "styled-components";

import { Props } from "./types";

export const Wrapper = styled.section`
  ${({ theme }) => css`
    grid-area: Market;
    background: ${theme.colors.secondaryBackgroundOpacity};
  `}
`;
export const Header = styled.div`
  padding: 1rem;
  h2 {
    ${({ theme }) => css`
      font-size: ${theme.font.sizes.small};
      font-weight: 600;
    `}
  }
`;

export const Content = styled.div``;

const Template = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem;
`;

export const HeaderBox = styled(Template)`
  padding: 0 1rem;
  margin-bottom: 1rem;
  ${({ theme }) => css`
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

export const Box = styled.div`
  overflow-y: scroll;
  scrollbar-width: none;
  max-height: 25rem;
`;

export const CardWrapper = styled(Template)<Partial<Props>>`
  ${({ theme, isSell }) => css`
    padding: 0 1rem;
    margin-bottom: 1rem;

    span {
      font-size: ${theme.font.sizes.xsmall};
      :not(:first-child) {
        text-align: end;
      }
      :nth-child(2) {
        color: ${isSell ? theme.colors.primary : theme.colors.green};
      }
    }
  `}
`;
