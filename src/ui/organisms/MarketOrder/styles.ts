import styled, { css } from "styled-components";

export const Section = styled.section`
  width: 100%;
`;
// Header
export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
`;
export const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 0.5rem;
`;
export const DropdownTrigger = styled.div`
  ${({ theme }) => css`
    cursor: pointer;
    background: ${theme.colors.secondaryBackgroundOpacity};
    border-radius: 0.7rem;
    padding: 0.6rem 0.8rem;
    user-select: none;
    transition: background 0.4s ease-in-out, opacity 0.4s ease-in-out;
    svg {
      display: inline-block;
      vertical-align: middle;
      width: 0.8rem;
      height: 0.8rem;
    }
    :hover {
      background: ${theme.colors.secondaryBackground};
    }
  `}
`;

export const ActionItem = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    border-radius: 0.7rem;
    width: 100%;
    text-align: center;
    cursor: pointer;
    transition: background 0.4s ease-in-out;
    font-weight: 500;
    padding: 0.6rem 1.5rem;
    color: ${isActive ? theme.colors.white : theme.colors.text};
    user-select: none;
    :first-child {
      background: ${isActive ? theme.colors.green : theme.colors.secondaryBackgroundOpacity};
    }
    :last-child {
      background: ${isActive ? theme.colors.primary : theme.colors.secondaryBackgroundOpacity};
    }
    :hover {
      background: ${isActive ? "auto" : theme.colors.secondaryBackground};
    }
  `}
`;
