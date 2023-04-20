import FlexBox from "@component/FlexBox";
import React from "react";
import CatalogueHeader from "./CatalogueHeader";
import CatalogueContent from "./CatalogueContent";
import CatalogueFooter from "./CatalogueFooter";

interface IProps {
  children: any;
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
}

const CatalogueWrapper = ({ children, activePage, setActivePage }: IProps) => {
  const childrenCount = React.Children.count(children);
  return (
    <FlexBox minHeight="100vh" flexDirection="column" overflow={"hidden"}>
      <CatalogueHeader childrenCount={childrenCount} activePage={activePage} />
      <CatalogueContent
        activePage={activePage}
        setActivePage={setActivePage}
        childrenCount={childrenCount}
      >
        {children}
      </CatalogueContent>
      <CatalogueFooter />
    </FlexBox>
  );
};

export default CatalogueWrapper;
