import styled from "styled-components";
import { fadein } from "./Channel";

export const StatusWrapper = styled.div`
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
export const StatusAvatar = styled.img`
  height: 32px;
  width: 32px;
  border-radius: 20px;
  margin-right: 5px;
`;
export const StatusTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 350px;
`;
export const StatusAuthor = styled.div`
  font-weight: bold;
  font-size: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 0;
  color: ${props => props.theme.tertiary};
`;
export const ScreenName = styled.div`
  font-size: 10px;
  color: ${props => props.theme.primary};
  //vertical-align: middle;
  padding-left: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  line-height: 20px;
`;
export const StatusText = styled.div`
  //height: 80px;
  color: ${props => props.theme.primary};
  font-size: 13px;
  text-align: left;
`;
