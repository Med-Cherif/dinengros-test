import React, { Fragment, useEffect, useState } from "react";
import Box from "../Box";
import { Chip } from "../Chip";
import FlexBox from "../FlexBox";
import Arrow from "../../../public/assets/images/arrows.svg";
import Typography from "@component/Typography";
import styled from "styled-components";

type Step = {
  title: string;
  disabled: boolean;
  icon: string;
};

type StepperProps = {
  selectedStep?: number;
  stepperList: Step[];
  onChange?: (Step, index) => void;
};

const StepperItemWrapper = styled.div`
  display: flex;
`;

const Stepper: React.FC<StepperProps> = ({
  selectedStep,
  stepperList,
  onChange,
}) => {
  const [selected, setSelected] = useState(selectedStep - 1);

  const handleStepClick = (step: Step, ind) => () => {
    if (!step.disabled) {
      setSelected(ind);
      if (onChange) onChange(step, ind);
    }
  };

  useEffect(() => {
    setSelected(selectedStep - 1);
  }, [selectedStep]);

  return (
    <FlexBox
      alignItems="stretch"
      // flexWrap="wrap"
      justifyContent="center"
      my="-4px"
    >
      {stepperList.map((step, ind) => (
        <StepperItemWrapper key={step.title}>
          <div style={{ textAlign: "center" }}>
            <Chip
              bg={ind <= selected ? "primary.main" : "primary.light"}
              color={ind <= selected ? "white" : "primary.main"}
              // p="0.5rem 1.5rem"
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto",
              }}
              fontSize="20px"
              // fontWeight="600"
              my="4px"
              cursor={step.disabled ? "not-allowed" : "pointer"}
              onClick={handleStepClick(step, ind)}
            >
              <i className={step.icon}></i>
            </Chip>
            <Typography mt="4px" fontWeight="600">
              {step.title}
            </Typography>
          </div>
          {ind < stepperList.length - 1 && (
            <div
              style={{
                width: 80,
              }}
            >
              <img src={Arrow.src} alt="" style={{ width: "100%" }} />
            </div>
          )}
        </StepperItemWrapper>
      ))}
    </FlexBox>
  );
};

Stepper.defaultProps = {
  selectedStep: 1,
};

export default Stepper;
