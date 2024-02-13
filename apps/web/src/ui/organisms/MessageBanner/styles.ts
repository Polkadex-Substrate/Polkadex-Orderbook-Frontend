import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";
export const Banner = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background-color: ${theme.colors.primary};
    padding: ${normalizeValue(0.5)};
    @media screen and (max-width: 500px) {
      flex-direction: column;
    }
    a,
    p {
      font-size: ${normalizeValue(1.4)};
    }
    p {
      font-weight: 550;
    }
    strong {
      text-decoration: underline;
    }
    a {
      background: ${theme.colors.primaryBackgroundSolid};
      padding: ${normalizeValue(0.6)} ${normalizeValue(1)};
      border-radius: ${normalizeValue(0.9)};
      transition: ease opacity 0.5s;
      white-space: nowrap;
      &:hover {
        opacity: 0.9;
      }
    }
  `}
`;
