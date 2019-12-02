import React, { useEffect, useRef, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import queryString from "query-string";

import logo from "./img/turing-twitter.png";
import { GlobalStyle, themes } from "./style/theme";
import { Switch } from "./Components/Common";
import {
  AppHeader,
  AppLogo,
  Hashtag,
  HeaderInput,
  HeaderInputWrapper,
  HeaderLeftWrapper,
  SubscribeButton
} from "./Components/Header";
import {
  ChannelCancel,
  ChannelStatuses,
  ChannelTitle,
  ChannelTop,
  ChannelWrapper
} from "./Components/Channel";
import {
  ScreenName,
  StatusAuthor,
  StatusAvatar,
  StatusText,
  StatusTextWrapper,
  StatusWrapper
} from "./Components/Status";

const AppWrapper = styled.div`
  text-align: center;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.primary};
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const AppBody = styled.div`
  height: calc(100% - 140px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: auto;
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

  const subscribe = () => {
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
  };

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
                onKeyDown={e => e.key === "Enter" && subscribe()}
              />
              <SubscribeButton onClick={subscribe}>Subscribe</SubscribeButton>
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
