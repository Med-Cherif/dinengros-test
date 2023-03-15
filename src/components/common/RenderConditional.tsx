import { Fragment } from "react";

interface IProps {
  when: boolean;
  render: JSX.Element;
  otherwise: JSX.Element;
  Wrapper?: JSX.Element;
}

const RenderConditional = ({ when, render, otherwise }: IProps) => {
  return when ? render : otherwise;
};

export default RenderConditional;
