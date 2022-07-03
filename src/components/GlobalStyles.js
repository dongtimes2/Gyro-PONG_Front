import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}

  @font-face {
  font-family: 'DungGeunMo';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/DungGeunMo.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  }

  body {
    background-color: black;
    color: white;
    font-family: 'DungGeunMo';
    user-select: none;
  }

  button {
    color: white;
    background-color: transparent;
    border: 1px solid white;
    font-family: 'DungGeunMo';
    cursor: pointer;
  }

  button:hover {
    color: black;
    background-color: white;
  }

  button:active {
    color: #e2e2e2;
  }

  a {
    color: white;
    text-decoration: none;
    border: 1px solid white;
  }

  a:hover {
    color: black;
    background-color: white;
  }
`;

export default GlobalStyles;
