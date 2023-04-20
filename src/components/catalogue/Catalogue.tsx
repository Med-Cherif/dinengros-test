import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CatalogueIcons from "./CatalogueIcons";
import CatalogueFirstPage from "./CatalogueFirstPage";
import CatalogueGridParent from "./CatalogueGridParent";
import CataloguePage from "./CataloguePage";
import { IZoom } from "interfaces/catalogue";

const StyledFlexBox = styled(FlexBox)`
  color: #fff;
  width: 100%;
  gap: 16px;
  @media (max-width: 575px) {
    gap: 0;
  }
`;

// https://cdn.ipaper.io/iPaper/Papers/865b59f9-6f2a-4566-8993-2ee389e24af6/Pages/1/Zoom.jpg?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9jZG4uaXBhcGVyLmlvL2lQYXBlci9QYXBlcnMvODY1YjU5ZjktNmYyYS00NTY2LTg5OTMtMmVlMzg5ZTI0YWY2L1BhZ2VzLyoiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2ODE5NzU5MDV9fX1dfQ__&Signature=Ks6nHRaxEXE-ytGwHQAW0F-HMtA-2t1~oMcAzHiYZR1Q5XVF7UVa0OVdW6hq6xWO3YUB9ZiHheb80ClwexQsHiajmPqklvSpn~rEYgA6NLhbkFZkWkIKcqIRObwWnFUIPn3Z6XvZyH7LugeGNrxSpNkhsL-TE2kRKqwV5dhFZvU_&Key-Pair-Id=APKAIPGQN6BDBMBZ2LCA

interface IProps {
  children: any;
  activePage: number;
  childrenCount: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
}

const Catalogue = ({
  children,
  activePage,
  childrenCount,
  setActivePage,
}: IProps) => {
  const [zoomData, setZoomData] = useState<IZoom>({
    zoomed: false,
    zoomPosition: {
      x: 0,
      y: 0,
    },
  });
  const onPrevPage = () => {
    setActivePage((current) => Math.max(current - 1, 1));
  };

  const onNextPage = () => {
    setActivePage((current) => Math.min(current + 1, childrenCount));
  };

  return (
    <StyledFlexBox justifyContent="center">
      {activePage <= 1 ? (
        <></>
      ) : (
        <CatalogueIcons
          icon="left"
          onCenterIconClick={onPrevPage}
          onTopIconClick={() => setActivePage(1)}
        />
      )}

      <CatalogueGridParent
        zoomData={zoomData}
        setZoomData={setZoomData}
        activePage={activePage}
        count={childrenCount}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
      >
        {children}
      </CatalogueGridParent>
      {activePage >= childrenCount ? (
        <></>
      ) : (
        <CatalogueIcons
          icon="right"
          onCenterIconClick={onNextPage}
          onTopIconClick={() => setActivePage(childrenCount)}
        />
      )}
    </StyledFlexBox>
  );
};

export default Catalogue;
