import styled from "styled-components";
import Catalogue from "./Catalogue";
import CatalogueFirstPage from "./CatalogueFirstPage";
import CataloguePage from "./CataloguePage";
import { useEffect } from "react";
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
`;

const CatalogueContent = () => {
  const catalogue = handleProductsCatalogue(catalogueProducts);
  const pages = sliceCatalogue(catalogue);

  const width = useWindowSize();

  return (
    <Wrapper>
      <Catalogue>
        <CatalogueFirstPage />
        {width
          ? width < 992
            ? Object.entries(catalogue).map(([prop, products], index) => {
                return (
                  <CatalogueProductsSinglePage key={prop} products={products} />
                );
              })
            : pages.map((page, idx) => {
                return (
                  <CataloguePage
                    key={idx}
                    list1={page.list1}
                    list2={page.list2}
                  />
                );
              })
          : null}
        {/* <CataloguePage catalogue={handleProductsCatalogue(catalogueProducts)} /> */}
        <CatalogueFirstPage img="https://cdn.ipaper.io/iPaper/Papers/865b59f9-6f2a-4566-8993-2ee389e24af6/Pages/20/Zoom.jpg?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9jZG4uaXBhcGVyLmlvL2lQYXBlci9QYXBlcnMvODY1YjU5ZjktNmYyYS00NTY2LTg5OTMtMmVlMzg5ZTI0YWY2L1BhZ2VzLyoiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2ODE5OTQ5NjR9fX1dfQ__&Signature=T~-akdIITUHQs9sWC~c98ITvzeDgijF9eKvQFMQV2FaHkOHeKv01awErqh7m-oCXsTpu3nmjgYYiNP2g7Es6vWz9HjvbHH7VI2MTMvcMQ3AUAA8YBM1aZTG5BC6ZF0z4ohTgPALqJcShi~oxa-pQ2uJgXodKo9LLCc0jtZ41FRQ_&Key-Pair-Id=APKAIPGQN6BDBMBZ2LCA" />
      </Catalogue>
    </Wrapper>
  );
};

export default CatalogueContent;
