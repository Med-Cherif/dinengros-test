import { useEffect } from "react";
import FlexBox from "@component/FlexBox";
import Image from "@component/Image";
import { useAppSelector } from "@hook/useRedux";
import Link from "next/link";
import React from "react";
import Typography from "@component/Typography";
import styled from "styled-components";
import HeaderHoverEffect from "./HeaderHoverEffect";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const StyledPagesControl = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  height: 100%;
  gap: 36px;
  color: #fff;

  @media (max-width: 767px) {
    position: static;
    transform: none;
  }
`;

const CatalogueHeader = ({ activePage, childrenCount }) => {
  const setup = useAppSelector((state) => state.setup);

  const onPdfClick = async () => {
    const pages = document.querySelectorAll(".catalogue-page");

    const pdf = new jsPDF({
      // orientation: "landscape",
      // unit: "px",
      // format: [700, 600],
    });

    const parent = document.querySelector(".slider-container") as HTMLElement;

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i] as any;

      // console.log(page.getBoundingClientRect().width);

      // parent.style.width = `${640}px`;

      console.log(page.getBoundingClientRect().width);

      const canvas = await html2canvas(page, {
        scale: 2,
        useCORS: true,
        logging: false,
        // width: 640,
      });
      const imageData = canvas.toDataURL("image/jpeg", 1.0) as any;

      // console.log(imageData);

      pdf.addImage(imageData, "JPEG", 10, 10, 190, 277);
      if (i < pages.length - 1) {
        pdf.addPage();
      }
    }

    // parent.style.width = "320px";
    pdf.save("catalogue.pdf");
  };

  return (
    <FlexBox
      backgroundColor="#232323"
      paddingX={3}
      zIndex={2}
      height={56}
      alignItems="center"
      position="relative"
      justifyContent="space-between"
    >
      <Link href="/">
        <a>
          {setup.header.logo ? (
            <Image src={setup.header.logo} alt="logo" maxHeight={42} />
          ) : (
            <h1 style={{ color: "crimson", textTransform: "uppercase" }}>
              {setup.website.name}
            </h1>
          )}
        </a>
      </Link>
      <StyledPagesControl>
        <HeaderHoverEffect
          style={{ width: 40, cursor: "pointer" }}
          onClick={onPdfClick}
        >
          <i className="fa-solid fa-file-pdf fa-xl"></i>
        </HeaderHoverEffect>
        <Typography fontWeight={600} color="white">
          {activePage} / {childrenCount}
        </Typography>
      </StyledPagesControl>
    </FlexBox>
  );
};

export default CatalogueHeader;
