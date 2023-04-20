import styled from "styled-components";
import Catalogue from "./Catalogue";
import CatalogueFirstPage from "./CatalogueFirstPage";
import CataloguePage from "./CataloguePage";
import React, { useEffect } from "react";
import { catalogueProducts } from "data/catalogue";
import { IProductCatalogue } from "interfaces/catalogue";
import handleProductsCatalogue, {
  sliceCatalogue,
} from "@helpers/handleProductsCatalogue";
import CatalogueProductsSinglePage from "./CatalogueProductsSinglePage";
import useWindowSize from "@hook/useWindowSize";

const Wrapper = styled.div`
  background: linear-gradient(to bottom, #353535 0%, #353535 100%);
  flex: 1;
  padding: 16px;
  display: flex;
  justify-content: center;
  @media (max-width: 575px) {
    padding: 16px 8px;
    justify-content: space-between;
  }
`;

interface IProps {
  activePage: number;
  children: any;
  childrenCount: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
}

const CatalogueContent = ({
  activePage,
  children,
  childrenCount,
  setActivePage,
}: IProps) => {
  return (
    <Wrapper>
      <Catalogue
        activePage={activePage}
        setActivePage={setActivePage}
        childrenCount={childrenCount}
      >
        {children}
      </Catalogue>
    </Wrapper>
  );
};

export default CatalogueContent;
