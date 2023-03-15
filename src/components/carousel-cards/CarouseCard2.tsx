import NavLink from "@component/nav-link/NavLink";
import { LinkFileType } from "@helpers/linkFileType";
import { ISlider } from "interfaces/slider";
import React from "react";
import Button from "../buttons/Button";
import Typography from "../Typography";
import { StyledCarouselCard2 } from "./CarouselCardStyle";
import styled from "styled-components";

const CarouselCard = styled(StyledCarouselCard2)`
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      1deg,
      rgba(23, 20, 18, 0.8) 0.77%,
      rgba(23, 20, 18, 0.09) 88.31%
    );
    text-shadow: 0 0 6px rgb(0 0 0 / 50%);
  }
`;

export interface CarouselCard1Props {
  slider: ISlider;
}

const CarouselCard2: React.FC<CarouselCard1Props> = ({ slider }) => {
  let path: string | null = null;
  let attachement = slider.attachements;
  if (attachement) {
    const fileInfo = attachement[0]?.file_info;
    if (fileInfo) {
      path = `${fileInfo.uri}/${fileInfo.name}`;
    }
  }

  const type = LinkFileType({ linkPath: path });

  return (
    <CarouselCard>
      <div className="carousel-background">
        {type === "video" ? (
          <video autoPlay loop muted>
            <source src={path} type="video/mp4" />
          </video>
        ) : type === "image" ? (
          <img src={path} alt={slider.name} />
        ) : (
          <></>
        )}
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 10,
        }}
        className="card-info-holder"
      >
        {slider?.name ? (
          <h2
            className="title"
            style={{
              ...(slider.name_color
                ? { color: slider.name_color }
                : { color: "white" }),
              fontSize: 28,
              fontWeight: 600,
              margin: 0,
              marginBottom: 8,
            }}
          >
            {slider.name}
          </h2>
        ) : (
          <></>
        )}
        {slider?.description ? (
          <Typography
            color="white"
            mb="1rem"
            style={{
              // fontWeight: "bolder",
              ...(slider.description_color
                ? { color: slider.description_color }
                : {}),
              maxWidth: 580,
            }}
          >
            {slider?.description}
          </Typography>
        ) : (
          <></>
        )}

        {slider.btn_name ? (
          <>
            {slider.btn_link_type === "internal" ? (
              <NavLink href={slider.btn_link}>
                <Button
                  className="button-link"
                  variant="contained"
                  color="primary"
                  p="0.5rem 1.5rem"
                  style={{
                    ...(slider.btn_bg_color
                      ? { backgroundColor: slider.btn_bg_color }
                      : {}),
                  }}
                >
                  <span
                    style={{
                      ...(slider.btn_name_color
                        ? { color: slider.btn_name_color }
                        : {}),
                    }}
                  >
                    {slider?.btn_name}
                  </span>
                </Button>
              </NavLink>
            ) : (
              <a href={slider.btn_link} target="_blank">
                <Button
                  className="button-link"
                  variant="contained"
                  color="primary"
                  p="0.5rem 1.5rem"
                >
                  {slider?.btn_name}
                </Button>
              </a>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </CarouselCard>
  );
};

export default CarouselCard2;
