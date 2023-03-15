import FlexBox from "@component/FlexBox";
import React from "react";

interface IProps {
  children: React.ReactNode[];
}

const FlexBoxInput = ({ children }: IProps) => {
  return (
    <FlexBox
      justifyContent="center"
      style={{
        gap: 16,
      }}
    >
      {children}
    </FlexBox>
  );
};

export default FlexBoxInput;
