import useWindowSize from "@hook/useWindowSize";
import { IZoom } from "interfaces/catalogue";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  transition: transform 0.5s;

  & > * {
    grid-column: 1/2;
    grid-row: 1/2;
  }
`;

const StyledParent = styled.div<{
  firstOrLast: boolean;
  zoom: boolean;
  isMedium: boolean;
  originX?: number;
  originY?: number;
}>`
  /* width: 100%; */
  overflow-x: hidden;
  -ms-overflow-style: none; // Internet Explorer and Edge
  scrollbar-width: none; // Firefox
  transform: ${(props) => (props.zoom ? "scale(3.0)" : "scale(1)")};
  /* transform-origin: ${(props) =>
    props.zoom ? `${props.originX}px ${props.originY}px` : "unset"}; */
  cursor: ${(props) => (props.zoom ? "zoom-out" : "zoom-in")};
  width: ${(props) =>
    props.isMedium ? "320px" : props.firstOrLast ? "320px" : "640px"};
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 575px) {
    flex: 1;
    width: 100%;
  }
`;

interface IProps {
  activePage: number;
  count: number;
  children: JSX.Element[];
  zoomData: IZoom;
  setZoomData: React.Dispatch<React.SetStateAction<IZoom>>;
  onPrevPage: () => void;
  onNextPage: () => void;
}

const CatalogueGridParent = ({
  children,
  activePage,
  count,
  zoomData,
  setZoomData,
  onPrevPage,
  onNextPage,
}: IProps) => {
  const width = useWindowSize();
  const isMedium = width < 992;

  const swiperRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const startX = useRef(null);
  const distance = useRef(null);
  const isSwiping = useRef(false);

  const onMouseMove = (e: MouseEvent) => {
    onZoomMove(e.clientX, e.clientY);
  };

  const onZoomMove = (clientX: number, clientY: number) => {
    const parent = parentRef.current;

    const originX = clientX - parent.offsetLeft;
    const originY = clientY - parent.offsetTop;

    parent.style.transformOrigin = `${originX}px ${originY}px`;
  };

  const onSwipMove = (e: TouchEvent) => {
    if (!isSwiping.current) return;
    distance.current = (e.touches[0].clientX - startX.current) / 2;

    swiperRef.current.style.transform = `translateX(calc(${
      (activePage - 1) * 100 * -1
    }% + ${distance.current}px))`;
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isSwiping.current = true;
    startX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e: TouchEvent) => {
    if (zoomData.zoomed) {
      const { clientX, clientY } = e.touches[0];
      onZoomMove(clientX, clientY);
    } else {
      onSwipMove(e);
    }
  };

  const onTouchEnd = () => {
    isSwiping.current = false;
    startX.current = null;
    const distanceValue = distance.current;
    const thresHold = 50;
    if (Math.abs(distanceValue) > thresHold) {
      if (distanceValue > 0) {
        if (activePage === 1) {
          swiperRef.current.style.transform = `translateX(${
            (activePage - 1) * 100 * -1
          }%)`;
        } else {
          onPrevPage();
        }
      } else {
        if (activePage === count) {
          swiperRef.current.style.transform = `translateX(${
            (activePage - 1) * 100 * -1
          }%)`;
        } else {
          onNextPage();
        }
      }
    } else {
      swiperRef.current.style.transform = `translateX(${
        (activePage - 1) * 100 * -1
      }%)`;
    }
    distance.current = null;
  };

  const onParentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX, clientY } = e;
    const parent = parentRef.current;
    const originX = clientX - parent.offsetLeft;
    const originY = clientY - parent.offsetTop;

    parent.style.transformOrigin = `${originX}px ${originY}px`;

    setZoomData((current) => {
      return {
        ...current,
        zoomed: !current.zoomed,
      };
    });
  };

  useEffect(() => {
    if (window) {
      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("touchend", onTouchEnd);
      window.addEventListener("mousemove", onMouseMove);
    }
    return () => {
      if (window) {
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("touchend", onTouchEnd);
        window.removeEventListener("mousemove", onMouseMove);
      }
    };
  }, [activePage, zoomData]);

  return (
    <StyledParent
      ref={parentRef}
      className="slider-container"
      firstOrLast={activePage <= 1}
      zoom={zoomData.zoomed}
      isMedium={isMedium}
      onTouchStart={onTouchStart}
      onClick={onParentClick}
    >
      <StyledWrapper
        ref={swiperRef}
        style={{
          transform: `translateX(${(activePage - 1) * 100 * -1}%)`,
          height: "100%",
        }}
      >
        {React.Children.map(children, (child, index) => {
          return (
            <div
              key={index}
              // className="catalogue-page"
              style={{
                transform: `translateX(${index * 100}%)`,
              }}
            >
              {child}
            </div>
          );
        })}
      </StyledWrapper>
    </StyledParent>
  );
};

export default CatalogueGridParent;
