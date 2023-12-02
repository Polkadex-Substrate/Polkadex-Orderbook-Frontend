import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(1)};
  padding: ${normalizeValue(2)};
  small {
    font-size: ${normalizeValue(1.2)};
    opacity: 0.5;
  }
`;

export const Paragraph = styled.p`
  white-space: break-spaces;
  font-size: ${normalizeValue(1.9)};
  font-weight: 500;
  span {
    opacity: 0.5;
  }
`;

export const Icon = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    border-radius: ${normalizeValue(0.5)};
    width: ${normalizeValue(2.3)};
    height: ${normalizeValue(2.3)};
    padding: ${normalizeValue(0.5)};
    svg {
      stroke: ${theme.colors.tertiaryText};
    }
  `}
`;

export const Footer = styled.div`
  ${({ theme }) => css`
    border-top: 1px solid ${theme.colors.secondaryBackgroundOpacity};

    display: flex;
    flex: 1;
    align-items: center;
    gap: ${normalizeValue(1)};
    padding: ${normalizeValue(1.5)} ${normalizeValue(2)};
    span {
      color: ${theme.colors.tertiaryText};
    }
  `}
`;

export const Message = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: ${normalizeValue(0.5)};
  div {
    width: ${normalizeValue(1.5)};
    height: ${normalizeValue(1.5)};
  }
`;
