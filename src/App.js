import React, { useState, useEffect, useRef } from "react";
import logo from "./img/turing-twitter.png";
import styled, { keyframes, ThemeProvider } from "styled-components";
import Switch from "./Components/Common/Switch";
import { themes, GlobalStyle } from "./style/theme";
import queryString from "query-string";

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
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: calc(10px + 2vmin);
  margin: 20px 40px;
  padding: 20px 50px;
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

const AppBody = styled.div`
  height: calc(100% - 140px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: auto;
`;
const fadein = keyframes`
  from {
        opacity:0;
    }
    to {
        opacity:1;
    }
`;

const ChannelWrapper = styled.div`
  min-height: 180px;
  margin: 20px 40px;
  padding: 10px 40px;
  background-color: ${props => props.theme.secondary};
  animation: ${fadein} 1s;
  width: calc(100% - 160px);
`;

const ChannelTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  font-weight: bold;
  font-size: 30px;
  margin: 0 10px;
`;
const ChannelTitle = styled.div`
  color: ${props => props.theme.primary};
  border-bottom: 2px solid ${props => props.theme.tertiary};
`;
const ChannelStatuses = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  overflow-x: auto;
  min-width: 1500px;
`;

const ChannelCancel = styled.div`
  color: ${props => props.theme.tertiary};
  cursor: pointer;
`;

const StatusWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 120px;
  background-color: ${props => props.theme.background};
  padding: 10px;
  margin: 0 10px;
  min-width: 400px;
  animation: ${fadein} 1s;
  flex: 0 0 auto;
`;

const StatusAvatar = styled.img`
  height: 32px;
  width: 32px;
  border-radius: 20px;
  margin-right: 5px;
`;

const StatusTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 350px;
`;

const StatusAuthor = styled.div`
  font-weight: bold;
  font-size: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 0;
  color: ${props => props.theme.tertiary};
`;

const ScreenName = styled.div`
  font-size: 10px;
  color: ${props => props.theme.primary};
  //vertical-align: middle;
  padding-left: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  line-height: 20px;
`;

const StatusText = styled.div`
  //height: 80px;
  color: ${props => props.theme.primary};
  font-size: 13px;
  text-align: left;
`;

const fetchTweets = async channel => {
  const response = await fetch(
    `https://turing-twitter.filipdrgon.now.sh/api/search${channel.refreshUrl}`
  );
  const { search_metadata, statuses } = await response.json();
  const { refresh_url } = search_metadata;
  if (refresh_url) channel.refreshUrl = refresh_url;
  return statuses;
};
const App = () => {
  const [theme, setTheme] = useState(
    themes[localStorage.getItem("theme") || "dark"]
  );
  const [channels, setChannels] = useState([]);
  const [subscribeText, setSubscribeText] = useState("");
  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    channels.map(channel => {
      if (!channel.interval) {
        channel.interval = setInterval(async () => {
          const statuses = await fetchTweets(channel);
          setChannels(chnls =>
            chnls.map(oldChannel =>
              oldChannel.name === channel.name
                ? {
                    ...oldChannel,
                    statuses: [...oldChannel.statuses, ...statuses]
                  }
                : oldChannel
            )
          );
        }, 8000);
      }
    });
  }, [channels]);

  useEffect(() => {
    return () => {
      channels.map(
        channel => channel.interval && clearInterval(channel.interval)
      );
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const wrapperRef = useRef(null);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppWrapper>
        <AppHeader>
          <HeaderLeftWrapper>
            <AppLogo src={logo} alt="turing-twitter" />
            <HeaderInputWrapper>
              <Hashtag>#</Hashtag>
              <HeaderInput
                value={subscribeText}
                onChange={e => setSubscribeText(e.target.value)}
                placeholder={"Bitcoin"}
              />
              <SubscribeButton
                onClick={() => {
                  if (subscribeText) {
                    const newChannel = {
                      name: subscribeText,
                      refreshUrl: `?${queryString.stringify({
                        q: subscribeText
                      })}`,
                      statuses: []
                    };
                    setChannels([...channels, newChannel]);
                    setSubscribeText("");
                    setTimeout(
                      () =>
                        wrapperRef.current.scrollTo({
                          top: wrapperRef.current.scrollHeight,
                          behavior: "smooth"
                        }),
                      500
                    );
                  }
                }}
              >
                Subscribe
              </SubscribeButton>
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
          />
        </AppHeader>
        <AppBody ref={wrapperRef}>
          {channels.map(channel => (
            <ChannelWrapper key={channel.name}>
              <ChannelTop>
                <ChannelTitle>{channel.name}</ChannelTitle>
                <ChannelCancel
                  onClick={() => {
                    clearInterval(
                      channels.find(
                        oldChannel => oldChannel.name === channel.name
                      ).interval
                    );
                    setChannels(
                      channels.filter(
                        oldChannel => oldChannel.name !== channel.name
                      )
                    );
                  }}
                >
                  x
                </ChannelCancel>
              </ChannelTop>
              <ChannelStatuses>
                {channel.statuses.map(status => (
                  <StatusWrapper key={status.id}>
                    <StatusAvatar src={status.user.profile_image_url} />
                    <StatusTextWrapper>
                      <StatusAuthor>
                        {status.user.name}
                        <ScreenName>@{status.user.screen_name}</ScreenName>
                      </StatusAuthor>
                      <StatusText>{status.text}</StatusText>
                    </StatusTextWrapper>
                  </StatusWrapper>
                ))}
              </ChannelStatuses>
            </ChannelWrapper>
          ))}
        </AppBody>
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;
