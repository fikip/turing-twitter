import React, { useState } from "react";
import logo from "./img/turing-twitter.png";
import styled, { ThemeProvider } from "styled-components";
import Switch from "./Components/Common/Switch";
import { themes, GlobalStyle } from "./style/theme";

const AppWrapper = styled.div`
  text-align: center;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.primary};
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const AppLogo = styled.img`
  height: 60px;
  width: auto;
  pointer-events: none;
`;

const AppHeader = styled.div`
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: calc(10px + 2vmin);
  margin: 20px 40px;
  padding: 20px 40px;
  background-color: ${props => props.theme.secondary};
  color: white;
`;
const HeaderLeftWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const HeaderInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Hashtag = styled.div`
  color: ${props => props.theme.twitter};
  font-weight: bolder;
  font-size: 60px;
  position: relative;
  left: 50px;
`;
const HeaderInput = styled.input`
  background-color: ${props => props.theme.tertiary};
  color: ${props => props.theme.primary};
  border-style: none;
  width: 450px;
  height: 60px;
  font-size: 40px;
  margin-left: 10px;
  padding: 0 0 0 45px;
  &:focus {
    outline: none;
  }
  ::placeholder,
  ::-webkit-input-placeholder,
  :-ms-input-placeholder {
    color: ${props => props.theme.secondary};
  }
`;
const SubscribeButton = styled.button`
  color: ${props => props.theme.tertiary};
  border: 1px solid ${props => props.theme.tertiary};
  background-color: ${props => props.theme.background};
  padding: 19px 40px;
  font-size: 20px;
  line-height: 20px;
  cursor: pointer;
  margin-left: 30px;
  outline: none;
  transition: background-color 0.2s linear, border 0.2s linear,
    color 0.2s linear;
  &:active {
    color: ${props => props.theme.background};
    border: 1px solid ${props => props.theme.background};
    background-color: ${props => props.theme.tertiary};
  }
`;
const App = () => {
  const [theme, setTheme] = useState(
    themes[localStorage.getItem("theme") || "dark"]
  );
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppWrapper>
        <AppHeader>
          <HeaderLeftWrapper>
            <AppLogo src={logo} alt="turing-twitter" />
            <HeaderInputWrapper>
              <Hashtag>#</Hashtag>
              <HeaderInput placeholder={"Bitcoin"} />
              <SubscribeButton>Subscribe</SubscribeButton>
            </HeaderInputWrapper>
          </HeaderLeftWrapper>
          <Switch
            onChange={() => {
              const newTheme =
                theme.name === "light" ? themes["dark"] : themes["light"];
              setTheme(newTheme);
              localStorage.setItem("theme", newTheme.name);
            }}
            checked={theme.name === "light"}
            scale={2}
          >
            Flip this shit
          </Switch>
        </AppHeader>
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;
