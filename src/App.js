import React from "react";
import logo from "./logo.svg";
import styled, { keyframes, createGlobalStyle } from "styled-components";

const AppWrapper = styled.div`
  text-align: center;
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const AppLogo = styled.img`
  animation: ${rotate360} infinite 20s linear;
  height: 40vmin;
  pointer-events: none;
`;

const CodeWrapper = styled.code`
  font-size: 1.3rem;
`;

const AppHeader = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;
const AppLink = styled.a`
  color: #61dafb;
`;
const AppIntro = styled.p``;

const GlobalStyle = createGlobalStyle`
    body {
    padding: 0;
    margin: 0;
    font-family: sans-serif;
  }
`;

function App() {
  return (
    <AppWrapper>
      <GlobalStyle />
      <AppHeader>
        <AppLogo src={logo} alt="logo" />
        <AppIntro>
          Edit <CodeWrapper>src/App.js</CodeWrapper> and save to reload.
        </AppIntro>
        <AppLink
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </AppLink>
      </AppHeader>
    </AppWrapper>
  );
}

export default App;
