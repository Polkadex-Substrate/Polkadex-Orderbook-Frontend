import { createGlobalStyle, css } from "styled-components";

const GlobalStyles = createGlobalStyle` 
${({ theme }) => css`
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

 
    body {
      font-family: ${theme.font.family};
      font-size: ${theme.font.sizes.small};
      background-color: ${theme.colors.primaryBackground};
      color: ${theme.colors.text};
    }
    svg {
      fill: ${theme.colors.text};
      display: block;
      margin: auto;
    }


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
  /* work-sans-300 - latin */
  @font-face {
    font-family: 'Work Sans';
    font-style: normal;
    font-weight: 300;
    src: local(''),
        url('/fonts/work-sans-v8-latin-300.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
  }
  /* work-sans-regular - latin */
  @font-face {
    font-family: 'Work Sans';
    font-style: normal;
    font-weight: 400;
    src: local(''),
    url('/fonts/work-sans-v8-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
  }
  /* work-sans-600 - latin */
  @font-face {
    font-family: 'Work Sans';
    font-style: normal;
    font-weight: 600;
    src: local(''),
    url('/fonts/work-sans-v8-latin-600.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
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

dl, ol, ul { 
  margin-bottom: 0;
}
  `}
`;

export default GlobalStyles;
