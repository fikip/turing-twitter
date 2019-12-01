/** Created by Filip Drgoň on 27/11/2019. */
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
    padding: 0;
    margin: 0;
    font-family: 'Helvetica Neue', sans-serif;
    height: 100vh;
  }
  div, button, span, p {
    transition: background-color 0.5s, color 0.5s;
  }
`;

export const themes = {
  dark: {
    name: "dark",
    primary: "#FFFFFF",
    secondary: "#1C1C1C",
    tertiary: "#40ED70",
    background: "#000000",
    twitter: "#38A1F3"
  },
  light: {
    name: "light",
    primary: "#000000",
    secondary: "#FFFFFF",
    tertiary: "#40ED70",
    background: "#E3E3E3",
    twitter: "#38A1F3"
  }
};
