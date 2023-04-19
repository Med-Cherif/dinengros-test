import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CatalogueIcons from "./CatalogueIcons";
import CatalogueFirstPage from "./CatalogueFirstPage";
import CatalogueGridParent from "./CatalogueGridParent";
import CataloguePage from "./CataloguePage";

// https://cdn.ipaper.io/iPaper/Papers/865b59f9-6f2a-4566-8993-2ee389e24af6/Pages/1/Zoom.jpg?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9jZG4uaXBhcGVyLmlvL2lQYXBlci9QYXBlcnMvODY1YjU5ZjktNmYyYS00NTY2LTg5OTMtMmVlMzg5ZTI0YWY2L1BhZ2VzLyoiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2ODE5NzU5MDV9fX1dfQ__&Signature=Ks6nHRaxEXE-ytGwHQAW0F-HMtA-2t1~oMcAzHiYZR1Q5XVF7UVa0OVdW6hq6xWO3YUB9ZiHheb80ClwexQsHiajmPqklvSpn~rEYgA6NLhbkFZkWkIKcqIRObwWnFUIPn3Z6XvZyH7LugeGNrxSpNkhsL-TE2kRKqwV5dhFZvU_&Key-Pair-Id=APKAIPGQN6BDBMBZ2LCA

interface IProps {
  children: any;
}

const Catalogue = ({ children }: IProps) => {
  useEffect(() => {
    // console.log(children.length);
  }, []);

  const childrenCount = React.Children.count(children);

  const [activePage, setActivePage] = useState(1);

  const onResize = () => {
    // const image = imageRef.current;
    // const rect = image.getBoundingClientRect();
    // console.log(rect.height);
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    // console.log(activePage, children.length);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [activePage]);

  return (
    <FlexBox
      color={"#fff"}
      width={"100%"}
      justifyContent="center"
      style={{ gap: 16 }}
    >
      {activePage <= 1 ? (
        <></>
      ) : (
        <CatalogueIcons
          icon="left"
          onCenterIconClick={() =>
            setActivePage((current) => Math.max(current - 1, 1))
          }
          onTopIconClick={() => setActivePage(1)}
        />
      )}

      <CatalogueGridParent activePage={activePage}>
        {children}
      </CatalogueGridParent>
      {activePage >= childrenCount ? (
        <></>
      ) : (
        <CatalogueIcons
          icon="right"
          onCenterIconClick={() =>
            setActivePage((current) => Math.min(current + 1, childrenCount))
          }
          onTopIconClick={() => setActivePage(childrenCount)}
        />
      )}
    </FlexBox>
  );
};

export default Catalogue;
