import { createGlobalStyle, css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";
const iconThemingModifier = {
  dark: () => css`
    background-image: url("data:image/svg+xml;utf8,<svg width='9px' height='6px' viewBox='0 0 9 6' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g id='Artboard' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(-636.000000, -171.000000)' fill-opacity='0.368716033'><g id='input' transform='translate(172.000000, 37.000000)' fill='white' fill-rule='nonzero'><g id='Group-9' transform='translate(323.000000, 127.000000)'><path d='M142.280245,7.23952813 C141.987305,6.92353472 141.512432,6.92361662 141.219585,7.23971106 C140.926739,7.5558055 140.926815,8.06821394 141.219755,8.38420735 L145.498801,13 L149.780245,8.38162071 C150.073185,8.0656273 150.073261,7.55321886 149.780415,7.23712442 C149.487568,6.92102998 149.012695,6.92094808 148.719755,7.23694149 L145.498801,10.7113732 L142.280245,7.23952813 Z' id='arrow'></path></g></g></g></svg>");
  `,
  light: () => css`
    background-image: url("data:image/svg+xml;utf8,<svg width='9px' height='6px' viewBox='0 0 9 6' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g id='Artboard' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(-636.000000, -171.000000)' fill-opacity='0.368716033'><g id='input' transform='translate(172.000000, 37.000000)' fill='black' fill-rule='nonzero'><g id='Group-9' transform='translate(323.000000, 127.000000)'><path d='M142.280245,7.23952813 C141.987305,6.92353472 141.512432,6.92361662 141.219585,7.23971106 C140.926739,7.5558055 140.926815,8.06821394 141.219755,8.38420735 L145.498801,13 L149.780245,8.38162071 C150.073185,8.0656273 150.073261,7.55321886 149.780415,7.23712442 C149.487568,6.92102998 149.012695,6.92094808 148.719755,7.23694149 L145.498801,10.7113732 L142.280245,7.23952813 Z' id='arrow'></path></g></g></g></svg>");
  `,
};

export const GlobalStyles = createGlobalStyle`
${({ theme }) => css`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  *:focus {
    outline: none;
  }

  body {
    background-color: ${theme.colors.primaryBackground};
    color: ${theme.colors.text};
    overflow-x: hidden;
    font-variant: tabular-nums;
    @media screen and (max-width: 1180px) {
      overflow-y: inherit;
    }
  }
  svg {
    fill: ${theme.colors.text};
    display: block;
    margin: auto;
    height: 100%;
    width: 100%;
  }

  .Toastify__toast-theme--colored.Toastify__toast--success {
    background-color: ${theme.colors.green};
  }

  .Toastify__toast-theme--colored.Toastify__toast--error {
    background-color: ${theme.colors.red};
  }

  .infinite-scroll-component {
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .animation {
    animation-duration: 0.3s;
    -webkit-animation-duration: 0.3s;
    -webkit-animation-name: slideIn;
    animation-name: slideIn;
  }

  @keyframes slideIn {
    0% {
      transform: translateY(0.625rem);
      opacity: 0;
    }
    100% {
      transform: translateY(0rem);
      opacity: 1;
    }
    0% {
      transform: translateY(0.625rem);
      opacity: 0;
    }
  }
  .pg-trading-chart {
    height: 100%;
  }

  .flex-1 {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  /* ----------------------------------------------------------------------------------------------------
Transition
----------------------------------------------------------------------------------------------------*/

  &.enter {
    transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  &.fadeEnterFrom,
  &.fadeLeaveFrom {
    transition: opacity 150ms ease-out;
  }
  &.fadeEnterFrom {
    opacity: 0;
  }
  &.fadeEnterTo,
  &.fadeLeaveTo {
    transition: opacity 150ms ease-out;
  }
  &.fadeEnterTo {
    opacity: 1;
    transition: opacity 150ms ease-in;
  }
  &.leave {
    transition: 100ms cubic-bezier(0.4, 0, 1, 1);
  }
  &.fadeLeaveFrom {
    opacity: 1;
  }
  &.fadeLeaveTo {
    opacity: 0;
  }

  &.transformEnterFrom {
    opacity: 0;
    transform: scale(0.95);
    transition:
      opacity 150ms ease-out,
      transform 150ms ease-out;
  }

  &.transformEnterTo {
    opacity: 1;
    transform: scale(1);
    transition:
      opacity 150ms ease-out,
      transform 150ms ease-out;
  }

  &.transformLeaveFrom {
    opacity: 1;
    transform: scale(1);
    transition:
      opacity 150ms ease-in,
      transform 150ms ease-in;
  }
  &.transformLeaveTo {
    opacity: 0;
    transform: scale(0.95);
    transition:
      opacity 150ms ease-in,
      transform 150ms ease-in;
  }

  /* ----------------------------------------------------------------------------------------------------
Reset Link
----------------------------------------------------------------------------------------------------*/

  a,
  a:hover,
  a:active,
  a:visited {
    text-decoration: none;
    color: inherit;
  }
  /* ----------------------------------------------------------------------------------------------------
Super Form Reset
----------------------------------------------------------------------------------------------------*/
  input,
  label,
  select,
  button,
  textarea {
    margin: 0;
    border: 0;
    padding: 0;
    display: inline-block;
    vertical-align: middle;
    white-space: normal;
    background: none;
    line-height: 1;

    /* Browsers have different default form fonts */
    font-size: 13px;
    font-family: ${theme.font.family};
  }

  /* Remove the stupid outer glow in Webkit */
  input:focus {
    outline: 0;
  }

  /* Box Sizing Reset
-----------------------------------------------*/

  /* All of our custom controls should be what we expect them to be */
  input,
  textarea {
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
  }

  /* These elements are usually rendered a certain way by the browser */
  button,
  input[type="reset"],
  input[type="button"],
  input[type="submit"],
  input[type="checkbox"],
  input[type="radio"],
  select {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  /* Text Inputs
-----------------------------------------------*/

  input[type="date"],
  input[type="datetime"],
  input[type="datetime-local"],
  input[type="email"],
  input[type="month"],
  input[type="number"],
  input[type="password"],
  input[type="range"],
  input[type="search"],
  input[type="tel"],
  input[type="text"],
  input[type="time"],
  input[type="url"],
  input[type="week"] {
  }

  /* File Uploads
-----------------------------------------------*/

  input[type="file"] {
  }

  /* Search Input
-----------------------------------------------*/

  /* Make webkit render the search input like a normal text field */
  input[type="search"] {
    -webkit-appearance: textfield;
    -webkit-box-sizing: content-box;
  }

  /* Turn off the recent search for webkit. It adds about 15px padding on the left */
  &::-webkit-search-decoration {
    display: none;
  }

  /* Buttons
-----------------------------------------------*/

  button,
  input[type="reset"],
  input[type="button"],
  input[type="submit"] {
    /* Fix IE7 display bug */
    overflow: visible;
    width: auto;
    color: inherit;
    cursor: pointer;
  }

  /* IE8 and FF freak out if this rule is within another selector */
  &::-webkit-file-upload-button {
    padding: 0;
    border: 0;
    background: none;
  }

  /* Textarea
-----------------------------------------------*/

  textarea {
    /* Move the label to the top */
    vertical-align: top;

    /* Turn off scroll bars in IE unless needed */
    overflow: auto;
  }

  /* Selects ------------------------------------
-----------------------------------------------*/

  select {
  }

  select[multiple] {
    /* Move the label to the top */
    vertical-align: top;
  }
  /* Custom Scroll ------------------------------------
-----------------------------------------------*/
  &::-webkit-scrollbar {
    width: ${normalizeValue(0.3125)};
  }
  /* Track */
  &::-webkit-scrollbar-track {
    background: ${theme.colors.secondaryBackgroundOpacity};
    border-radius: ${normalizeValue(2)};
  }
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.secondaryBackground};
    border-radius: ${normalizeValue(2)};
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    /* background: ${theme.colors.primary}; */
  }
  /* Calendar ------------------------------------
-----------------------------------------------*/
  .rdrDateRangePickerWrapper {
    display: flex;
    border: 1px solid ${theme.colors.secondaryBackground};
    box-shadow: ${theme.shadows.primary};
    @media screen and (max-width: 836px) {
      flex-direction: column;
    }

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
    }
    .rdrDateDisplayItemActive {
      border-color: ${theme.colors.primary};
    }
    .rdrDefinedRangesWrapper {
      border-right-color: ${theme.colors.secondaryBackgroundOpacity};
      background: ${theme.colors.tertiaryBackground};
      width: 100%;
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
      opacity: 0.5;
    }
    .rdrDay span,
    .rdrDayPassive .rdrDayNumber span {
      font-family: ${theme.font.family};
      font-weight: 500;
    }

    .rdrStaticRangeLabel {
      @media screen and (min-width: 1144px) {
        white-space: nowrap;
      }
    }
    .rdrStaticRange:hover .rdrStaticRangeLabel,
    .rdrStaticRange:focus .rdrStaticRangeLabel {
      background: ${theme.colors.secondaryBackgroundOpacity};
    }

    .rdrMonthPicker,
    .rdrYearPicker {
      background: ${theme.colors.primaryBackgroundOpacity};
      border-radius: ${normalizeValue(0.3125)};
    }
    .rdrNextPrevButton {
      background: ${theme.colors.secondaryBackground};
      transition: background 0.5s ease-in-out;
      :hover {
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
    }

    .rdrMonthAndYearWrapper {
      :first-child i {
        border-color: transparent ${theme.colors.text} transparent transparent !important;
      }
      :last-child i {
        border-color: transparent transparent transparent ${theme.colors.text};
      }
    }

    .rdrDayToday .rdrDayNumber span::after {
      border: none;
      height: 0;
    }

    .rdrInRange,
    .rdrStartEdge,
    .rdrEndEdge {
      background: ${theme.colors.primary};
    }

    .rdrDay {
      span {
        border-color: ${theme.colors.primary};
      }
    }

    .rdrMonthAndYearPickers select {
      option {
        background: ${theme.colors.inverse};
      }
      color: ${theme.colors.text}99;
      font-family: ${theme.font.family};
      ${iconThemingModifier[
        theme.colors.text === "#ffffff" ? "dark" : "light"
      ]()};
    }
  }
`}
    `;
