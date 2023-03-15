import Button from "@component/buttons/Button";
import { Card1 } from "@component/Card1";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import Typography from "@component/Typography";
import styled from "styled-components";

const FORMAT = "YYYY-MM-DD";

const Div = styled.div`
  margin-bottom: 20px;
  & > * {
    width: 100%;
  }
`;

export const ErrorFeedback = styled.small`
  color: ${({ theme }: any) => theme.colors.primary.main};
  display: block;
`;

interface IProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  error: null | string;
}

const GetSelf = ({ date, error, setDate }: IProps) => {
  return (
    <Card1 mb="2rem">
      <Typography fontWeight="600" mb="1rem">
        Get Self
      </Typography>
      <Div>
        <Calendar
          locale="no"
          tileDisabled={({ activeStartDate, date, view }) => {
            const currentDate = moment(new Date()).format(FORMAT);
            const dates = moment(date).format(FORMAT);
            return date.getDay() === 0 || moment(dates).isBefore(currentDate);
          }}
          onChange={setDate}
          value={date}
        />
      </Div>
      {error ? <ErrorFeedback>{error}</ErrorFeedback> : <></>}
    </Card1>
  );
};

export default GetSelf;
