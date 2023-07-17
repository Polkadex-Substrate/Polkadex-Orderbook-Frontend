import styled, { css } from "styled-components";
export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 1rem;
    background-color: ${theme.colors.tertiaryBackgroundOpacity};
    padding: 2rem;
    width: max-content;
  `}
`;
export const Image = styled.div`
  width: 2rem;
  height: 2rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  cursor: pointer;
`;
export const RatingWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
  `}
`;
export const RatingText = styled.div<{ value: string }>`
  ${({ theme, value }) => css`
    background-color: ${theme.colors.secondaryBackgroundOpacity};
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 2rem;
    text-transform: capitalize;
    transition: width 0.2s ease-in-out;
    width: ${(value === "best" && "6.5rem") ||
    (value === "good" && "7.5rem") ||
    (value === "average" && "9rem") ||
    (value === "worst" && "8rem")};
  `}
`;
