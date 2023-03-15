import { useState } from 'react';
import { extractProductImages } from 'helpers/extractProductImages';
import { IObject } from 'interfaces/object';
import { getProductInfo } from 'helpers/getProductInfo';
import { IProduct } from 'interfaces/product';
import { addItemToCartAction } from 'features/actions/cartActions';
import { useAppDispatch } from '@hook/useRedux';
import { useRouter } from 'next/router';
import { useAppSelector } from '@hook/useRedux';
import NoImage from "../../public/assets/images/products/no-image.jpg";

interface IArgs {
    product: IProduct
    productInfoArgs?: IObject
}

import useLoading from './useLoading';
export default function useProduct({product, productInfoArgs = {}}: IArgs) {

    const { isLoading, load, stopLoad } = useLoading()
    const { push } = useRouter()

    const [selectedUnit, setSelectedUnit] = useState(
      product?.units?.find((unit) => unit?.name === "Eske" || unit?.id === 3) ||
        product?.units[0]
    );

    const images = extractProductImages(product);

    const { noProductImage } = useAppSelector((state) => state.setup.images);

    const { accessToken, userData } = useAppSelector(state => state.users);
    const { userDiscounts } = useAppSelector((state) => state.products);
    const { cart } = useAppSelector((state) => state.cart);
    const {
      productPrice,
      discountedPrice,
      totalStock,
      offerPercentage,
      personalDiscount,
    } = getProductInfo({
      product,
      unit: selectedUnit?.id as number,
      groupId: (userData?.profile?.user_group?.id as number) || 1,
      personalDiscounts: userDiscounts,
      ...productInfoArgs
    });

    const dispatch = useAppDispatch();

    const cartItem: any = cart.find(
      (item) =>
        item.product.id === product.id && selectedUnit?.id === item.unit.id
    );

    const addProductToCart = (onSuccess?: () => void) => {
        if (!accessToken) {
          push("/login");
          return;
        }
        load()
        const tax = product.taxes.at(0)?.id || null;
        const requestBody: any = {
          product_id: product.id,
          product_unit_id: selectedUnit?.id,
          qty: 1,
          price: productPrice,
        };
        if (tax) {
          requestBody.tax = tax;
        }
        dispatch(
          addItemToCartAction(
            {
              onError(error) {},
              onFinally() {
                stopLoad()
              },
              onSuccess() {
                if(onSuccess) {
                  onSuccess()
                }
              },
            },
            requestBody
          )
        );
      };

      const handleUnitChange = (unit: any) => {
        setSelectedUnit(unit);
      };

    return {
        isLoading,
        cartItem,
        productPrice,
        discountedPrice,
        totalStock,
        offerPercentage,
        personalDiscount,
        selectedUnit,
        image: images[0] || noProductImage || NoImage.src,
        handleUnitChange,
        addProductToCart,
        setSelectedUnit,
    }
}