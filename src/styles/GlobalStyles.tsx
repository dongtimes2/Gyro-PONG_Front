import { createGlobalStyle } from 'styled-components';

import theme from './theme';

const GlobalStyles = createGlobalStyle`
  /*
  Josh's Custom CSS Reset
  https://www.joshwcomeau.com/css/custom-css-reset/
 */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  * {
    margin: 0;
  }
  html,
  body,
  #root {
    height: 100%;
  }
  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }
  input,
  button,
  textarea,
  select {
    font: inherit;
  }
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }
  #root,
  #__next {
    isolation: isolate;
  }

  /* font */
  @font-face {
  font-family: 'DungGeunMo';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/DungGeunMo.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  }

  body {
    background-color: black;
    color: ${theme.colors.green};
    font-family: 'DungGeunMo';
    user-select: none;
    overflow: hidden;
  }

  button {
    color: ${theme.colors.green};
    background-color: transparent;
    border: 1px solid ${theme.colors.green};
    font-family: 'DungGeunMo';
    cursor: pointer;
  }

  button:hover {
    color: black;
    background-color: ${theme.colors.green};
  }

  button:active {
    background-color: black;
    color: ${theme.colors.green};
  }

  a {
    color: ${theme.colors.green};
    text-decoration: none;
    border: 1px solid ${theme.colors.green};
  }

  a:hover {
    color: black;
    background-color: ${theme.colors.green};
  }

  a:active {
    background-color: black;
    color: ${theme.colors.green};
  }
`;

export default GlobalStyles;
