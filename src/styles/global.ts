import { createGlobalStyle, css } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-size: 62.5%;
  }

  ${({ theme }) => css`
    body {
      font-family: ${theme.font.family};
      font-size: ${theme.font.sizes.xsmall};
      background-color: ${theme.colors.primaryBackground};
      color: ${theme.colors.text};
    }
    svg {
      fill: ${theme.colors.text};
      display: block;
      margin: auto;
      height: 100%;
      width: 100%;
    }
  `}

  .animation {
    animation-duration: 0.3s;
    -webkit-animation-duration: 0.3s;
    -webkit-animation-name: slideIn;
    animation-name: slideIn;
  }

  @keyframes slideIn {
    0% {
      transform: translateY(1rem);
      opacity: 0;
    }
    100% {
      transform: translateY(0rem);
      opacity: 1;
    }
    0% {
      transform: translateY(1rem);
      opacity: 0;
    }
  }
  .pg-trading-chart {
    height: 100%;
  }
 /* inter-100 - latin */
 @font-face {
        font-family: "Inter";
        font-style: normal;
        font-weight: 100;
        src: url("/fonts/inter/inter-v3-latin-100.eot"); /* IE9 Compat Modes */
        src: local(""),
          url("/fonts/inter/inter-v3-latin-100.eot?#iefix") format("embedded-opentype"),
          /* IE6-IE8 */ url("/fonts/inter/inter-v3-latin-100.woff2") format("woff2"),
          /* Super Modern Browsers */ url("/fonts/inter/inter-v3-latin-100.woff")
            format("woff"),
          /* Modern Browsers */ url("/fonts/inter/inter-v3-latin-100.ttf")
            format("truetype"),
          /* Safari, Android, iOS */ url("/fonts/inter/inter-v3-latin-100.svg#Inter")
            format("svg"); /* Legacy iOS */
      }
      /* inter-200 - latin */
      @font-face {
        font-family: "Inter";
        font-style: normal;
        font-weight: 200;
        src: url("/fonts/inter/inter-v3-latin-200.eot"); /* IE9 Compat Modes */
        src: local(""),
          url("/fonts/inter/inter-v3-latin-200.eot?#iefix") format("embedded-opentype"),
          /* IE6-IE8 */ url("/fonts/inter/inter-v3-latin-200.woff2") format("woff2"),
          /* Super Modern Browsers */ url("/fonts/inter/inter-v3-latin-200.woff")
            format("woff"),
          /* Modern Browsers */ url("/fonts/inter/inter-v3-latin-200.ttf")
            format("truetype"),
          /* Safari, Android, iOS */ url("/fonts/inter/inter-v3-latin-200.svg#Inter")
            format("svg"); /* Legacy iOS */
      }
      /* inter-300 - latin */
      @font-face {
        font-family: "Inter";
        font-style: normal;
        font-weight: 300;
        src: url("/fonts/inter/inter-v3-latin-300.eot"); /* IE9 Compat Modes */
        src: local(""),
          url("/fonts/inter/inter-v3-latin-300.eot?#iefix") format("embedded-opentype"),
          /* IE6-IE8 */ url("/fonts/inter/inter-v3-latin-300.woff2") format("woff2"),
          /* Super Modern Browsers */ url("/fonts/inter/inter-v3-latin-300.woff")
            format("woff"),
          /* Modern Browsers */ url("/fonts/inter/inter-v3-latin-300.ttf")
            format("truetype"),
          /* Safari, Android, iOS */ url("/fonts/inter/inter-v3-latin-300.svg#Inter")
            format("svg"); /* Legacy iOS */
      }
      /* inter-regular - latin */
      @font-face {
        font-family: "Inter";
        font-style: normal;
        font-weight: 400;
        src: url("/fonts/inter/inter-v3-latin-regular.eot"); /* IE9 Compat Modes */
        src: local(""),
          url("/fonts/inter/inter-v3-latin-regular.eot?#iefix")
            format("embedded-opentype"),
          /* IE6-IE8 */ url("/fonts/inter/inter-v3-latin-regular.woff2") format("woff2"),
          /* Super Modern Browsers */ url("/fonts/inter/inter-v3-latin-regular.woff")
            format("woff"),
          /* Modern Browsers */ url("/fonts/inter/inter-v3-latin-regular.ttf")
            format("truetype"),
          /* Safari, Android, iOS */ url("/fonts/inter/inter-v3-latin-regular.svg#Inter")
            format("svg"); /* Legacy iOS */
      }
      /* inter-500 - latin */
      @font-face {
        font-family: "Inter";
        font-style: normal;
        font-weight: 500;
        src: url("/fonts/inter/inter-v3-latin-500.eot"); /* IE9 Compat Modes */
        src: local(""),
          url("/fonts/inter/inter-v3-latin-500.eot?#iefix") format("embedded-opentype"),
          /* IE6-IE8 */ url("/fonts/inter/inter-v3-latin-500.woff2") format("woff2"),
          /* Super Modern Browsers */ url("/fonts/inter/inter-v3-latin-500.woff")
            format("woff"),
          /* Modern Browsers */ url("/fonts/inter/inter-v3-latin-500.ttf")
            format("truetype"),
          /* Safari, Android, iOS */ url("/fonts/inter/inter-v3-latin-500.svg#Inter")
            format("svg"); /* Legacy iOS */
      }
      /* inter-600 - latin */
      @font-face {
        font-family: "Inter";
        font-style: normal;
        font-weight: 600;
        src: url("/fonts/inter/inter-v3-latin-600.eot"); /* IE9 Compat Modes */
        src: local(""),
          url("/fonts/inter/inter-v3-latin-600.eot?#iefix") format("embedded-opentype"),
          /* IE6-IE8 */ url("/fonts/inter/inter-v3-latin-600.woff2") format("woff2"),
          /* Super Modern Browsers */ url("/fonts/inter/inter-v3-latin-600.woff")
            format("woff"),
          /* Modern Browsers */ url("/fonts/inter/inter-v3-latin-600.ttf")
            format("truetype"),
          /* Safari, Android, iOS */ url("/fonts/inter/inter-v3-latin-600.svg#Inter")
            format("svg"); /* Legacy iOS */
      }
      /* inter-700 - latin */
      @font-face {
        font-family: "Inter";
        font-style: normal;
        font-weight: 700;
        src: url("/fonts/inter/inter-v3-latin-700.eot"); /* IE9 Compat Modes */
        src: local(""),
          url("/fonts/inter/inter-v3-latin-700.eot?#iefix") format("embedded-opentype"),
          /* IE6-IE8 */ url("/fonts/inter/inter-v3-latin-700.woff2") format("woff2"),
          /* Super Modern Browsers */ url("/fonts/inter/inter-v3-latin-700.woff")
            format("woff"),
          /* Modern Browsers */ url("/fonts/inter/inter-v3-latin-700.ttf")
            format("truetype"),
          /* Safari, Android, iOS */ url("/fonts/inter/inter-v3-latin-700.svg#Inter")
            format("svg"); /* Legacy iOS */
      }
      /* inter-800 - latin */
      @font-face {
        font-family: "Inter";
        font-style: normal;
        font-weight: 800;
        src: url("/fonts/inter/inter-v3-latin-800.eot"); /* IE9 Compat Modes */
        src: local(""),
          url("/fonts/inter/inter-v3-latin-800.eot?#iefix") format("embedded-opentype"),
          /* IE6-IE8 */ url("/fonts/inter/inter-v3-latin-800.woff2") format("woff2"),
          /* Super Modern Browsers */ url("/fonts/inter/inter-v3-latin-800.woff")
            format("woff"),
          /* Modern Browsers */ url("/fonts/inter/inter-v3-latin-800.ttf")
            format("truetype"),
          /* Safari, Android, iOS */ url("/fonts/inter/inter-v3-latin-800.svg#Inter")
            format("svg"); /* Legacy iOS */
      }
      /* inter-900 - latin */
      @font-face {
        font-family: "Inter";
        font-style: normal;
        font-weight: 900;
        src: url("/fonts/inter/inter-v3-latin-900.eot"); /* IE9 Compat Modes */
        src: local(""),
          url("/fonts/inter/inter-v3-latin-900.eot?#iefix") format("embedded-opentype"),
          /* IE6-IE8 */ url("/fonts/inter/inter-v3-latin-900.woff2") format("woff2"),
          /* Super Modern Browsers */ url("/fonts/inter/inter-v3-latin-900.woff")
            format("woff"),
          /* Modern Browsers */ url("/fonts/inter/inter-v3-latin-900.ttf")
            format("truetype"),
          /* Safari, Android, iOS */ url("/fonts/inter/inter-v3-latin-900.svg#Inter")
            format("svg"); /* Legacy iOS */
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
textarea
{
margin:0;
border:0;
padding:0;
display:inline-block;
vertical-align:middle;
white-space:normal;
background:none;
line-height:1;

/* Browsers have different default form fonts */
font-size:13px;
font-family:Arial;
}

/* Remove the stupid outer glow in Webkit */
input:focus
{
outline:0;
}

/* Box Sizing Reset
-----------------------------------------------*/

/* All of our custom controls should be what we expect them to be */
input,
textarea
{
-webkit-box-sizing:content-box;
-moz-box-sizing:content-box;
box-sizing:content-box;
}

/* These elements are usually rendered a certain way by the browser */
button,
input[type=reset],
input[type=button],
input[type=submit],
input[type=checkbox],
input[type=radio],
select
{
-webkit-box-sizing:border-box;
-moz-box-sizing:border-box;
box-sizing:border-box;
}

/* Text Inputs
-----------------------------------------------*/

input[type=date],
input[type=datetime],
input[type=datetime-local],
input[type=email],
input[type=month],
input[type=number],
input[type=password],
input[type=range],
input[type=search],
input[type=tel],
input[type=text],
input[type=time],
input[type=url],
input[type=week]
{
}

/* File Uploads
-----------------------------------------------*/

input[type=file]
{

}

/* Search Input
-----------------------------------------------*/

/* Make webkit render the search input like a normal text field */
input[type=search]
{
-webkit-appearance:textfield;
-webkit-box-sizing:content-box;
}

/* Turn off the recent search for webkit. It adds about 15px padding on the left */
::-webkit-search-decoration
{
display:none;
}

/* Buttons
-----------------------------------------------*/

button,
input[type="reset"],
input[type="button"],
input[type="submit"]
{
/* Fix IE7 display bug */
overflow:visible;
width:auto;
color: inherit;
cursor: pointer;
}

/* IE8 and FF freak out if this rule is within another selector */
::-webkit-file-upload-button
{
padding:0;
border:0;
background:none;
}

/* Textarea
-----------------------------------------------*/

textarea
{
/* Move the label to the top */
vertical-align:top;

/* Turn off scroll bars in IE unless needed */
overflow:auto;
}

/* Selects ------------------------------------
-----------------------------------------------*/

select
{

}

select[multiple]
{
/* Move the label to the top */
vertical-align:top;
}
/* Custom Scroll ------------------------------------
-----------------------------------------------*/
::-webkit-scrollbar {
  width: 0.5rem;
}
/* Track */
::-webkit-scrollbar-track {
  background: #5F697E;
  border-radius: 2rem;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 2rem;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
/* React Tabs ------------------------------------
-----------------------------------------------*/
.react-tabs__tab-list {
  border-bottom:none;
  padding: 0;
  font-size: 1.4rem;
  margin: 0;
}

.react-tabs__tab {
  padding: 0;
  cursor: pointer;
}
.react-tabs__tab:first-child {
  margin-right:1rem;
}
.react-tabs__tab--selected {
  font-weight:bold;
  background: none;
  border:none;
}

.react-tabs__tab:focus {
  box-shadow: none;
  border-color: transparent;
  outline: none;
}

.react-tabs__tab:focus:after {
  background:transparent;
}
/* React StockCharts ------------------------------------
-----------------------------------------------*/

`;

export default GlobalStyles;
