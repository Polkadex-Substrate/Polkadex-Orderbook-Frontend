import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${normalizeValue(1)};
    background-color: ${theme.colors.tertiaryBackgroundOpacity};
    padding: ${normalizeValue(2)};
    width: max-content;
  `}
`;
export const Image = styled.div`
  width: ${normalizeValue(2)};
  height: ${normalizeValue(2)};
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  cursor: pointer;
`;
export const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const RatingText = styled.div<{ value: string }>`
  ${({ theme, value }) => css`
    background-color: ${theme.colors.secondaryBackgroundOpacity};
    height: ${normalizeValue(6)};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 ${normalizeValue(2)};
    text-transform: capitalize;
    transition: width 0.2s ease-in-out;
    ${widthModifier[value]()};
  `}
`;
const widthModifier = {
  good: () => css`
    width: 7.5rem;
  `,
  average: () => css`
    width: ${normalizeValue(9)};
  `,
  best: () => css`
    width: 6.5rem;
  `,
  worst: () => css`
    width: ${normalizeValue(8)};
  `,
};
