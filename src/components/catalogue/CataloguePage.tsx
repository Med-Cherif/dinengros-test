import Grid from "@component/grid/Grid";
import { ICatalogue, IProductCatalogue } from "interfaces/catalogue";
import CataloguePageProducts from "./CataloguePageProducts";
import { IObject } from "interfaces/object";
import styled from "styled-components";

const MidLine = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1px;
  height: 100%;
  background-color: gray;
`;

interface IProps {
  list1: IProductCatalogue[];
  list2: IProductCatalogue[];
}

const CataloguePage = ({ list1, list2 }: IProps) => {
  return (
    <Grid container style={{ height: "100%", position: "relative" }}>
      <CataloguePageProducts products={list1} />
      <CataloguePageProducts products={list2} />
      <MidLine />
    </Grid>
  );
};

export default CataloguePage;
