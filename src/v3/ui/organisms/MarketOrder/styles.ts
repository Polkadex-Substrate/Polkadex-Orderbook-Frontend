import styled, { css } from "styled-components";

export const Section = styled.section`
  margin-left: 1rem;
  & .react-tabs__tab--selected {
    color: green;
  }
`;
// Header
export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
`;
export const HeaderWrapper = styled.div`
  display: flex;
`;

export const HeaderContent = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    background: ${isActive ? theme.colors.primary : "none"};
    padding: 1rem;
    border-radius: 1rem;
    cursor: pointer;
  `}
`;
