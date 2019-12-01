import styled, { keyframes } from "styled-components";

export const fadein = keyframes`
  from {
        opacity:0;
    }
    to {
        opacity:1;
    }
`;
export const ChannelWrapper = styled.div`
  min-height: 180px;
  margin: 20px 40px;
  padding: 10px 40px;
  background-color: ${props => props.theme.secondary};
  animation: ${fadein} 1s;
  width: calc(100% - 160px);
`;
export const ChannelTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  font-weight: bold;
  font-size: 30px;
  margin: 0 10px;
`;
export const ChannelTitle = styled.div`
  color: ${props => props.theme.primary};
  border-bottom: 2px solid ${props => props.theme.tertiary};
`;
export const ChannelStatuses = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  overflow-x: auto;
  min-width: 1500px;
`;
export const ChannelCancel = styled.div`
  color: ${props => props.theme.tertiary};
  cursor: pointer;
`;
