import Carousel from "@component/carousel/Carousel";
import FlexBox from "@component/FlexBox";
import { useAppSelector } from "@hook/useRedux";
import useWindowSize from "@hook/useWindowSize";
import React, { useEffect, useState } from "react";
import { Card1 } from "../Card1";
import CheckBox from "../CheckBox";
import Box from "@component/Box";
import Typography, { H4, H5 } from "../Typography";
import Card from "@component/Card";
import DeliveryAddressInputs from "@component/address/DeliveryAddressInputs";
import moment from "moment";
import getNextDate from "helpers/getNextDate";
import styled from "styled-components";
import { ErrorFeedback } from "@component/delivery/GetSelf";
import CheckEmptyList from "@component/common/CheckEmptyList";
import noDeliveryImg from "../../../public/assets/images/illustrations/delivery-empty.svg";

const weekDays = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const Div = styled.div`
  margin: -0.25rem 0;
  & .custom-slider {
    min-height: auto;
  }
`;

interface IProps {
  formik: any;
  sameAddress: boolean;
  setSameAddress: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckoutForm = ({ formik, sameAddress, setSameAddress }: IProps) => {
  const [visibleSlides, setVisibleSlides] = useState(6);
  const width = useWindowSize();

  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    if (width < 370) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(4);
    else setVisibleSlides(6);
  }, [width]);

  const { userData } = useAppSelector((state) => state.users);

  const getDeliveryDates = () => {
    const dates =
      userData?.profile?.region?.delivery_days?.map((day) => {
        const deliveryTime = moment(new Date(day.time)).format("HH:MM");

        const today = new Date().getDay();
        const orderDayIndex = weekDays.findIndex((d) => d === day.order_day);

        const deliveryDayIndex = weekDays.findIndex(
          (d) => d === day.delivery_day
        );

        const nextOrderDay = getNextDate({
          day: orderDayIndex,
          hours: +deliveryTime.split(":")[0],
          minutes: +deliveryTime.split(":")[1],
        });

        let nextDeliveryDay = getNextDate({
          date: nextOrderDay,
          day: deliveryDayIndex,
        });

        if (today === orderDayIndex) {
          const timeNow = moment(new Date()).format("HH:MM");
          if (
            moment(timeNow, "HH:MM").isBefore(moment(deliveryTime, "HH:MM"))
          ) {
            nextDeliveryDay = getNextDate({
              day: deliveryDayIndex,
            });
          }
        }

        return {
          id: Math.random(),
          day: weekDays[nextDeliveryDay.getDay()],
          date: moment(nextDeliveryDay).format("YYYY-MM-DD"),
        };
      }) || [];

    setAvailableDates(
      dates.filter((date, index) => {
        return dates.findIndex((d) => d.date === date.date) === index;
      })
    );
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSameAddress(e.target.checked);
  };

  useEffect(() => {
    getDeliveryDates();
  }, []);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Card1 mb="2rem">
        {!userData?.profile?.region ? (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                maxWidth: 300,
                margin: "auto",
                flexDirection: "column",
              }}
            >
              <img
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
                src={noDeliveryImg.src}
                alt="delivery-not-found"
              />
              <H5 mt="12px">You don't have a zone to delivery</H5>
            </div>
          </>
        ) : (
          <>
            <FlexBox alignItems="center" mb="3rem">
              <Typography fontWeight="600" fontSize="22px">
                <i
                  style={{
                    marginRight: 12,
                  }}
                  className="fa-solid fa-map-location fa-2xl"
                ></i>
                Zone Name :{" "}
              </Typography>
              <Typography ml="6px" fontWeight="500" fontSize="18px">
                {` ${userData?.profile?.region?.name || "Not Found"}`}
              </Typography>
            </FlexBox>
            <Typography fontWeight="600" mb="1rem" mt="1rem">
              Delivery Date
            </Typography>
            <CheckEmptyList
              list={availableDates}
              render={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    maxWidth: 220,
                    margin: "auto",
                    flexDirection: "column",
                  }}
                >
                  <img
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                    }}
                    src={noDeliveryImg.src}
                    alt="delivery-not-found"
                  />
                  <H5 textAlign="center">
                    We Don't Support Delivery To This Zone
                  </H5>
                </div>
              }
            >
              <Div>
                <Carousel
                  autoPlay={false}
                  showArrow={availableDates.length > visibleSlides}
                  totalSlides={availableDates.length}
                  interval={10000}
                  visibleSlides={visibleSlides}
                >
                  {availableDates.map((item, ind) => {
                    const borderStyle =
                      formik.values.delivery_date === item.date
                        ? {
                            borderWidth: "2px",
                            borderStyle: "solid",
                            borderColor: "primary.main",
                          }
                        : {};
                    return (
                      <Box
                        py="0.25rem"
                        key={item.id}
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          formik.setFieldValue("delivery_date", item.date);
                        }}
                      >
                        <Card p="1rem" {...borderStyle}>
                          <FlexBox justifyContent="center" mb="20px" mt="6px">
                            <i className="fa-regular fa-calendar fa-2xl"></i>
                          </FlexBox>

                          <H4
                            textAlign="center"
                            fontWeight="600"
                            fontSize="14px"
                            mb="0.25rem"
                            style={{
                              textTransform: "capitalize",
                            }}
                          >
                            {item.day}
                          </H4>

                          <H4
                            fontWeight="600"
                            fontSize="14px"
                            color="primary.main"
                            mr="0.5rem"
                            textAlign="center"
                          >
                            {item.date}
                          </H4>
                        </Card>
                      </Box>
                    );
                  })}
                </Carousel>
              </Div>
            </CheckEmptyList>

            {formik.errors.delivery_date || formik.touched.delivery_date ? (
              <ErrorFeedback
                style={{
                  marginTop: 16,
                }}
              >
                {formik.errors.delivery_date}
              </ErrorFeedback>
            ) : (
              <></>
            )}
            <Typography fontWeight="600" mb="1rem" mt="1rem">
              Delivery Address
            </Typography>
            <CheckBox
              label="Same Delivery Address"
              color="secondary"
              mb={sameAddress ? "" : "1rem"}
              checked={sameAddress}
              onChange={handleCheckboxChange}
            />
            {sameAddress ? <></> : <DeliveryAddressInputs formik={formik} />}
          </>
        )}
      </Card1>
    </form>
  );
};

export default CheckoutForm;
