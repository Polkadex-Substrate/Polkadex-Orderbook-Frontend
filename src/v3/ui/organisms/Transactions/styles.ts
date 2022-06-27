import styled, { css } from "styled-components";
import media from "styled-media-query";

const iconThemingModifier = {
  dark: () => css`
    background-image: url("data:image/svg+xml;utf8,<svg width='9px' height='6px' viewBox='0 0 9 6' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g id='Artboard' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(-636.000000, -171.000000)' fill-opacity='0.368716033'><g id='input' transform='translate(172.000000, 37.000000)' fill='white' fill-rule='nonzero'><g id='Group-9' transform='translate(323.000000, 127.000000)'><path d='M142.280245,7.23952813 C141.987305,6.92353472 141.512432,6.92361662 141.219585,7.23971106 C140.926739,7.5558055 140.926815,8.06821394 141.219755,8.38420735 L145.498801,13 L149.780245,8.38162071 C150.073185,8.0656273 150.073261,7.55321886 149.780415,7.23712442 C149.487568,6.92102998 149.012695,6.92094808 148.719755,7.23694149 L145.498801,10.7113732 L142.280245,7.23952813 Z' id='arrow'></path></g></g></g></svg>");
  `,
  light: () => css`
    background-image: url("data:image/svg+xml;utf8,<svg width='9px' height='6px' viewBox='0 0 9 6' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g id='Artboard' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(-636.000000, -171.000000)' fill-opacity='0.368716033'><g id='input' transform='translate(172.000000, 37.000000)' fill='black' fill-rule='nonzero'><g id='Group-9' transform='translate(323.000000, 127.000000)'><path d='M142.280245,7.23952813 C141.987305,6.92353472 141.512432,6.92361662 141.219585,7.23971106 C140.926739,7.5558055 140.926815,8.06821394 141.219755,8.38420735 L145.498801,13 L149.780245,8.38162071 C150.073185,8.0656273 150.073261,7.55321886 149.780415,7.23712442 C149.487568,6.92102998 149.012695,6.92094808 148.719755,7.23694149 L145.498801,10.7113732 L142.280245,7.23952813 Z' id='arrow'></path></g></g></g></svg>");
  `,
};

export const Section = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// Header
export const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 2rem 0;
  justify-content: space-between;
  align-items: center;
  ${media.lessThan("large")`
      grid-template-columns: 1fr;
      grid-row-gap: 2rem;
    `}
`;
export const Content = styled.div``;
export const ContentWrapper = styled.div`
  padding: 10rem 0;
`;

export const HeaderContent = styled.ul`
  display: flex;
  gap: 2rem;
`;
export const TabHeader = styled.li<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    list-style: none;
    padding-bottom: 1rem;
    border-bottom: 2px solid;
    border-bottom-color: ${isActive ? theme.colors.text : "transparent"};
    cursor: pointer;
    white-space: nowrap;
    user-select: none;
    opacity: ${isActive ? 1 : 0.6};
    transition: opacity 0.5s ease-in-out;
    :hover {
      opacity: 1;
    }
  `}
`;

export const Tab = styled.ul`
  li {
    font-size: 1.4rem;
    font-weight: 800;
    display: inline-block;
  }

  li :not(:last-child) {
    margin-right: 2rem;
  }
`;
export const WrapperActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
`;
export const ContainerActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
`;

export const ContainerTransactions = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    .rdrCalendarWrapper {
      color: ${theme.colors.text};
      font-family: ${theme.font.family};
    }
    .rdrDateDisplayWrapper {
      background: ${theme.colors.primaryBackground};
    }
    .rdrDateDisplayWrapper {
      background: ${theme.colors.primaryBackground};
    }
    .rdrDateDisplayItem {
      background: ${theme.colors.secondaryBackgroundOpacity};
      /* box-shadow: 0 1px 2px 0 rgba(35, 57, 66, 0.21);
      border: 1px solid transparent; */
    }
    .rdrDateDisplayItemActive {
      /* background-color: ${theme.colors.primary}; */
      border-color: ${theme.colors.primary};
    }
    .rdrDefinedRangesWrapper {
      border-right-color: ${theme.colors.secondaryBackgroundOpacity};
      background: ${theme.colors.tertiaryBackground};
    }
    .rdrStaticRange {
      border-bottom-color: ${theme.colors.secondaryBackgroundOpacity};
      padding: 0;
      background: ${theme.colors.tertiaryBackground};
    }
    .rdrDateRangeWrapper {
      background: ${theme.colors.tertiaryBackground};
    }
    .rdrDay span,
    .rdrDayNumber span {
      color: ${theme.colors.text};
    }

    .rdrDayPassive span {
      color: ${theme.colors.text}55;
    }
    .rdrDay span,
    .rdrDayPassive .rdrDayNumber span {
      font-family: ${theme.font.family};
    }

    .rdrStaticRange:hover .rdrStaticRangeLabel,
    .rdrStaticRange:focus .rdrStaticRangeLabel {
      background: ${theme.colors.secondaryBackgroundOpacity};
    }

    .rdrMonthPicker,
    .rdrYearPicker {
      background: ${theme.colors.primaryBackgroundOpacity};
      border-radius: 0.5rem;
    }
    .rdrNextPrevButton {
      background: ${theme.colors.secondaryBackground};
      transition: background 0.5s ease-in-out;
      :hover {
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
      :first-child i {
        border-color: transparent ${theme.colors.text} transparent transparent;
      }
      :last-child i {
        border-color: transparent transparent transparent ${theme.colors.text};
      }
    }
    .rdrDayToday .rdrDayNumber span::after {
      border: none;
      height: 0;
    }

    .rdrMonthAndYearPickers select {
      color: ${theme.colors.text}99;
      font-family: ${theme.font.family};
      ${iconThemingModifier[theme.colors.text === "#ffffff" ? "dark" : "light"]()};
    }
  `}
`;
