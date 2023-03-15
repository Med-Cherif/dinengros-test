import { useState, useEffect } from "react";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import { H3, H4, Paragraph, SemiSpan } from "@component/Typography";
import React from "react";
import Image from "@component/Image";
import getTimeDifference from "helpers/getTimeDifference";
import extractImage from "helpers/extractImage";
import Link from "next/link";

interface IProps {
  offer: any;
  hideButton?: boolean;
}

const OfferCard = ({ offer, hideButton = false }: IProps) => {
  const { id, title, start_at, end_at, image } = offer;

  //   const startDate = new Date(start_at);
  //   const endDate = new Date("2023-01-01");

  const imageSrc = extractImage(image);

  //   const image

  const [time, setTime] = useState(() =>
    getTimeDifference(new Date(), new Date(end_at))
  );
  const { days, hours, minutes, seconds } = time;

  useEffect(() => {
    // console.log(offer);
    const interval = setInterval(() => {
      setTime(() => getTimeDifference(new Date(), new Date(end_at)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box py="0.25rem">
      <Card p="1rem" bg="secondary.100" overflow="hidden" position="relative">
        <Grid container alignItems="center" spacing={6}>
          <Grid item md={6} xs={12}>
            {imageSrc && <Image src={imageSrc} mx="auto" maxWidth="100%" />}
          </Grid>
          <Grid item md={6} xs={12}>
            <H3
              // mt="5.25rem"
              mb="1rem"
              fontSize="25px"
              color="primary.main"
              lineHeight="1.3"
            >
              {title}
            </H3>

            {/* <H3 mb="0.5rem" fontSize="25px" lineHeight="1.2">
              
            </H3>*/}
            <Paragraph mb="2rem" color="text.muted" maxWidth="400px">
              Startet: {start_at.slice(0, 10)}
            </Paragraph>

            <H4 mb="0.5rem" lineHeight="1.3" fontWeight="600">
              Tiden går, Kjøp nå!
            </H4>

            <FlexBox flexWrap="wrap" mb="2rem">
              <FlexBox alignItems="flex-end" mr="1.75rem">
                <H3 lineHeight="1.3" mr="0.25rem">
                  {days}
                </H3>
                <SemiSpan fontWeight="600" lineHeight="1.7">
                  DAGER 
                </SemiSpan>
              </FlexBox>

              <FlexBox alignItems="flex-end" mr="1.75rem">
                <H3 lineHeight="1.3" mr="0.25rem">
                  {hours}
                </H3>
                <SemiSpan fontWeight="600" lineHeight="1.7">
                  TIMER 
                </SemiSpan>
              </FlexBox>

              <FlexBox alignItems="flex-end" mr="1.75rem">
                <H3 lineHeight="1.3" mr="0.25rem">
                  {minutes}
                </H3>
                <SemiSpan fontWeight="600" lineHeight="1.7">
                  MINUTTER 
                </SemiSpan>
              </FlexBox>

              <FlexBox alignItems="flex-end">
                <H3 lineHeight="1.3" mr="0.25rem">
                  {seconds}
                </H3>
                <SemiSpan fontWeight="600" lineHeight="1.7">
                  SEKUNDER
                </SemiSpan>
              </FlexBox>
            </FlexBox>

            {hideButton ? (
              <></>
            ) : (
              <FlexBox alignItems="center" mb="3rem">
                <Link href={`/offers/${id}`}>
                  <a>
                    <Button
                      color="primary"
                      variant="contained"
                      borderRadius={8}
                      mr="0.5rem"
                    >
                      Oppdag Nå
                    </Button>
                  </a>
                </Link>
              </FlexBox>
            )}
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default OfferCard;
