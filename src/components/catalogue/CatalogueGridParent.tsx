import useWindowSize from "@hook/useWindowSize";
import React, { useState, useEffect } from "react";
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
}>`
  /* width: 100%; */
  overflow-x: hidden;
  -ms-overflow-style: none; // Internet Explorer and Edge
  scrollbar-width: none; // Firefox
  zoom: ${(props) => (props.zoom ? 2 : 1)};
  /* cursor: ${(props) => (props.zoom ? "zoom-out" : "zoom-in")}; */
  width: ${(props) =>
    props.isMedium ? "320px" : props.firstOrLast ? "320px" : "640px"};
  &::-webkit-scrollbar {
    display: none;
  }
`;

interface IProps {
  activePage: number;
  children: JSX.Element[];
}

const CatalogueGridParent = ({ children, activePage }: IProps) => {
  const [zoom, setZoom] = useState(false);
  const width = useWindowSize();
  const isMedium = width < 992;

  return (
    <StyledParent
      firstOrLast={activePage <= 1 || activePage >= children.length}
      zoom={zoom}
      isMedium={isMedium}
      // onClick={() => setZoom((current) => !current)}
    >
      <StyledWrapper
        style={{
          transform: `translateX(${(activePage - 1) * 100 * -1}%)`,
          height: "100%",
        }}
      >
        {React.Children.map(children, (child, index) => {
          // console.log({ index });
          return (
            <div
              key={index}
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
