import styled from "styled-components";
import PropTypes from "prop-types";
import React from "react";

const SwitchLabel = styled.label`
  display: block;
  position: relative;
  box-shadow: inset 0 0 0 1px #d5d5d5;
  text-indent: -5000px;
  height: ${props => `${props.scale * 30}px`};
  width: ${props => `${props.scale * 50}px`};
  border-radius: ${props => `${props.scale * 15}px`};
  cursor: pointer;
  &:before {
    content: "";
    position: absolute;
    display: block;
    height: ${props => `${props.scale * 30}px`};
    width: ${props => `${props.scale * 30}px`};
    top: 0;
    left: 0;
    border-radius: ${props => `${props.scale * 15}px`};
    background: rgba(19, 191, 17, 0);
    -moz-transition: 0.25s ease-in-out;
    -webkit-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;
  }
  &:after {
    content: "";
    position: absolute;
    display: block;
    height: ${props => `${props.scale * 26}px`};
    width: ${props => `${props.scale * 26}px`};
    top: ${props => `${props.scale * 2}px`};
    left: ${props => `${props.scale * 2}px`};
    border-radius: ${props => `${props.scale * 15}px`};
    background: white;
    box-shadow: inset 0 0 0 1px ${props => props.theme.tertiary},
      0 2px 4px rgba(0, 0, 0, 0.2);
    -moz-transition: 0.25s ease-in-out;
    -webkit-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;
  }
`;
const Input = styled.input`
  max-height: 0;
  max-width: 0;
  opacity: 0;
  position: absolute;
`;
const Wrapper = styled.div`
  ${Input}:checked + ${SwitchLabel}:before {
    width: ${props => `${props.scale * 50}px`};
    background: ${props => props.theme.tertiary};
  }

  ${Input}:checked + ${SwitchLabel}:after {
    left: ${props => `${props.scale * 23}px`};
    box-shadow: inset 0 0 0 1px ${props => props.theme.tertiary},
      0 2px 4px rgba(0, 0, 0, 0.2);
  }

  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: ${props => `${props.scale * 75}px`};
  color: ${props => props.theme.primary};
  font-size: 30px;
`;
const Moon = styled.div`
  padding-right: 5px;
`;
const Sun = styled.div`
  padding-left: 5px;
`;

export const Switch = ({ onChange, checked, scale }) => {
  return (
    <Wrapper scale={scale}>
      <Moon>&#9790;</Moon>
      <Input
        type="checkbox"
        name="toggle"
        id="toggle"
        checked={checked}
        onChange={onChange}
        scale={scale}
      />
      <SwitchLabel htmlFor="toggle" scale={scale} />
      <Sun>&#9788;</Sun>
    </Wrapper>
  );
};

Switch.propTypes = {
  onClick: PropTypes.func,
  checked: PropTypes.bool,
  scale: PropTypes.number
};
Switch.defaultProps = {
  scale: 1
};
