import Box from "@component/Box";
import CarouselCard2 from "@component/carousel-cards/CarouseCard2";
import CarouselCard1 from "@component/carousel-cards/CarouselCard1";
import Carousel from "@component/carousel/Carousel";
import Container from "@component/Container";
import Navbar from "@component/navbar/Navbar";
import { getSlidersApi } from "apis/setup/sliderApi";
import { ISlider } from "interfaces/slider";
import React, { Fragment, useMemo } from "react";
import useSWR from "swr";

const Section1: React.FC = () => {
  const { data } = useSWR("/sliders", () => getSlidersApi(), {});

  let sliders = useMemo(() => {
    return data?.data?.data || [];
  }, [data?.data]);

  return (
    <Fragment>
      <Navbar navListOpen={true} />
      <Box bg="gray.white" mb="3.75rem">
        <Carousel
          totalSlides={sliders.length}
          visibleSlides={1}
          infinite={true}
          autoPlay={true}
          interval={5000}
          showArrow={false}
          showDots={false}
          spacing="0px"
          naturalSlideHeight={400}
          alignitems="center"
        >
          {sliders.map((slider: ISlider) => (
            <CarouselCard2 key={slider.id} slider={slider} />
          ))}
        </Carousel>
      </Box>
    </Fragment>
  );
};

export default Section1;
