import Box from "@component/Box";
import Carousel from "@component/carousel/Carousel";
import ProductCard1 from "@component/product-cards/ProductCard1";
import { useAppDispatch, useAppSelector } from "@hook/useRedux";
import useWindowSize from "@hook/useWindowSize";
import { getFeaturedProductsAction } from "features/actions/productActions";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CategorySectionCreator from "../CategorySectionCreator";

export const BoxStyled = styled(Box)(() => ({
  height: "100%",
}));
// && {
//   height: 100%;
// }
const Featured: React.FC = () => {
  const [visibleSlides, setVisibleSlides] = useState(6);
  const width = useWindowSize();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (width < 370) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(4);
  }, [width]);

  const { featured } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(
      getFeaturedProductsAction({
        is_main_publish: 1,
        page_size: 20,
      })
    );
  }, []);

  return (
    <React.Fragment>
      {featured.length > 0 ? (
        <CategorySectionCreator
          iconName="ranking-1"
          title="Utvalgte"
          seeMoreLink="/categories"
        >
          <Box my="-0.25rem">
            <Carousel visibleSlides={visibleSlides} totalSlides={20}>
              {featured.map((product) => (
                <BoxStyled py="0.25rem" key={product.id}>
                  <ProductCard1 product={product} />
                </BoxStyled>
              ))}
            </Carousel>
          </Box>
        </CategorySectionCreator>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};

export default Featured;
