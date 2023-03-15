import NavLink from "@component/nav-link/NavLink";
import StyledNavLink from "@component/nav-link/NavLinkStyle";
import { ISlider } from "interfaces/slider";
import React from "react";
import Button from "../buttons/Button";
import Typography from "../Typography";
import { StyledCarouselCard1 } from "./CarouselCardStyle";

export interface CarouselCard1Props {
  slider: ISlider;
}

const CarouselCard1: React.FC<CarouselCard1Props> = ({ slider }) => {
  let path: string | null = null;
  let attachement = slider.attachements;
  if (attachement) {
    const fileInfo = attachement[0]?.file_info;
    if (fileInfo) {
      path = `${fileInfo.uri}/${fileInfo.name}`;
    }
  }
  
  return (
    <StyledCarouselCard1>
      <div>
        <h1 className="title">{slider.name}</h1>
        <Typography color="secondary.main" mb="1.35rem">
          {slider?.description ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis."}
        </Typography>

        {slider.btn_name ? <>
          {slider.btn_link_type === "internal" ? (
          <NavLink href={slider.btn_link}>
            <Button
              className="button-link"
              variant="contained"
              color="primary"
              p="1rem 1.5rem"
            >
              {slider?.btn_name || "Visit Collections"}
            </Button>
          </NavLink>
        ) : (
          <a href={slider.btn_link} target="_blank">
            <Button
              className="button-link"
              variant="contained"
              color="primary"
              p="1rem 1.5rem"
            >
              {slider?.btn_name || "Visit Collections"}
            </Button>
          </a>
        )}
        </> : <></>}
      </div>

      <div className="image-holder">
        {path ? (
          <img src={path} alt={slider.name} />
        ) : <></>}
      </div>
    </StyledCarouselCard1>
  );
};

export default CarouselCard1;
