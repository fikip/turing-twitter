import styled from "styled-components";

export const AppHeader = styled.div`
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
export const HeaderLeftWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
export const HeaderInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Hashtag = styled.div`
  color: ${props => props.theme.twitter};
  font-weight: bolder;
  font-size: 60px;
  position: relative;
  left: 50px;
`;
export const HeaderInput = styled.input`
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
export const SubscribeButton = styled.button`
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
export const AppLogo = styled.img`
  height: 60px;
  width: auto;
  pointer-events: none;
`;
