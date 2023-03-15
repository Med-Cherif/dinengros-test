import Card from '@component/Card';
import FlexBox from '@component/FlexBox';
import NavbarLayout from '@component/layout/NavbarLayout';
import ProductCard1List from '@component/products/ProductCard1List';
import { H5, Paragraph } from '@component/Typography';
import { usePagination } from '@hook/usePagination';
import { useAppSelector } from '@hook/useRedux'
import React from 'react'

const MyDiscounts = () => {

  const {currentPage, navigateToPage, pageSize} = usePagination({size: 10});

    const {userDiscounts} = useAppSelector(state => state.products);

    const products = userDiscounts.map(discount => discount.product);

  return (
    <div>
        <FlexBox
            p="1.25rem"
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
            mb="55px"
            elevation={5}
            as={Card}
          >
          <div>
            <H5>Min rabbater</H5>
            <Paragraph color="text.muted">{products?.length || 0} Produkter</Paragraph>
          </div>
        </FlexBox>
        <ProductCard1List 
          products={products}
          currentPage={currentPage}
          navigateToPage={navigateToPage}
          totalProducts={products.length}
          pageSize={pageSize}
        />
    </div>
  )
}

MyDiscounts.layout = NavbarLayout;

export default MyDiscounts