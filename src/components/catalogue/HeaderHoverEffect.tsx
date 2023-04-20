import React from "react";
import styled, { StyledComponentProps } from "styled-components";

const Wrapper = styled.div`
  padding: 6px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #fff;
    color: #232323;
  }
`;

interface IProps extends StyledComponentProps<"div", any, {}, never> {
  children: React.ReactNode;
}

const HeaderHoverEffect = ({ children, ...rest }: IProps) => {
  return <Wrapper {...rest}>{children}</Wrapper>;
};

export default HeaderHoverEffect;
