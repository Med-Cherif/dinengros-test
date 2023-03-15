import Box from "@component/Box";
import Carousel from "@component/carousel/Carousel";
import Grid from "@component/grid/Grid";
import ProductCard1 from "@component/product-cards/ProductCard1";
import { useAppDispatch, useAppSelector } from "@hook/useRedux";
import useWindowSize from "@hook/useWindowSize";
import { getNewArrivalsAction } from "features/actions/productActions";
import React, { useEffect, useState } from "react";
import CategorySectionCreator from "../CategorySectionCreator";
import { BoxStyled } from "./Featured";

const NewArrivals: React.FC = () => {
  const [visibleSlides, setVisibleSlides] = useState(6);
  const width = useWindowSize();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (width < 370) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(4);
    else setVisibleSlides(5);
  }, [width]);

  useEffect(() => {
    dispatch(getNewArrivalsAction());
  }, []);

  const { newArrivals } = useAppSelector((state) => state.products);

  return (
    <React.Fragment>
      {newArrivals.length > 0 ? (
        <CategorySectionCreator
          iconName="Group"
          title="Nyankomne"
          seeMoreLink="/categories"
        >
          <Grid container spacing={4}>
            {newArrivals.map((product) => (
              <Grid item xs={12} md={6} lg={3} key={product.id}>
                <BoxStyled py="0.25rem">
                  <ProductCard1 product={product} />
                </BoxStyled>
              </Grid>
            ))}
          </Grid>
          {/* <Carousel visibleSlides={visibleSlides} totalSlides={10}> */}
          {/* </Carousel> */}
        </CategorySectionCreator>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};

export default NewArrivals;
