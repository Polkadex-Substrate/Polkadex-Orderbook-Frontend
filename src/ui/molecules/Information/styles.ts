import styled, { css, DefaultTheme } from "styled-components";

import { InformationProps } from "./types";

const itemModifier = {
  white: (theme: DefaultTheme) => css`
    color: ${theme.colors.text};
  `,
  red: (theme: DefaultTheme) => css`
    color: ${theme.colors.primary};
  `,
  green: (theme: DefaultTheme) => css`
    color: ${theme.colors.green};
  `,
  vertical: () => css`
    span {
      display: block;
      margin-bottom: 0.3rem;
    }
    @media screen and (max-width: 560px) {
      margin-bottom: 1rem;
    }
  `,
  horizontal: () => css`
    span {
      display: inline-block;
      margin-right: 0.5rem;
      :not(:last-child) {
        margin-bottom: 0.5rem;
      }
    }
  `,
};

export const Wrapper = styled.div<Partial<InformationProps>>`
  ${({ theme, orientation, color }) => css`
    ${itemModifier[orientation]};

    span {
      line-height: 1;
    }

    span:first-child {
      font-weight: 500;
      font-size: ${theme.font.sizes.xxsmall};
      opacity: 0.8;
    }

    span:last-child {
      font-weight: 600;
      ${itemModifier[color](theme)};
    }

    :not(:last-child) {
      margin-right: 3rem;
    }
  `}
`;
